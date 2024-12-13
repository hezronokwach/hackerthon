// controllers/donors.go
package controllers

import (
	"fmt"
	"net/http"
	"time"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

// donorform
func DonateBlood(c *gin.Context) {
	var donorInput struct {
		UserID       string `json:"userID"`
		DonationDate string `json:"donationDate" `
		BloodType    string `json:"bloodType"`
		Status       string `json:"status"`
		SatelliteID  string `json:"satelliteId"`
	}

	if err := c.ShouldBindJSON(&donorInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	donor := models.Donation{
		SerialID:     time.Now().Format("20060102150405"),
		UserID:       donorInput.UserID,
		DonationDate: donorInput.DonationDate,
		BloodType:    donorInput.BloodType,
		Status:       "Donated",
		SatelliteID:  donorInput.SatelliteID,
		CurrentStage: "Satellite",
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

// UpdateDonorStatus updates the donor dashboard with screening and current stage
func UpdateDonorStatus(c *gin.Context) {
	var input struct {
		SerialID string `json:"serialID"`
		Status   string `json:"status"` // Valid or Invalid
	}
	if err := c.ShouldBind(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var donation models.Donation
	if err := initializers.DB.Where("serial_id=?", input.SerialID).First(&donation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Donation not found"})
		return
	}

	donation.Status = input.Status
	if input.Status == "Valid" {
		donation.CurrentStage = "Regional"
	} else {
		donation.CurrentStage = "Invalid"
	}

	if err := initializers.DB.Save(&donation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update donation"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donor dashboard updated successfully"})
}

// NotifyDonor sends a thank-you message to the donor after their blood is used.
func NotifyDonor(c *gin.Context) {
	var input struct {
		SerialID string `json:"serialID"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var donation models.Donation
	if err := initializers.DB.Preload("User").Where("serial_id = ?", input.SerialID).First(&donation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Donation not found"})
		return
	}

	// Verify the donation is at the "Used" stage
	if donation.CurrentStage != "Used" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Donation has not been used yet"})
		return
	}

	// Send a thank-you message
	thankYouMessage := fmt.Sprintf("Thank you, %s %s, for saving a life!", donation.User.FirstName, donation.User.LastName)
	c.JSON(http.StatusOK, gin.H{"message": thankYouMessage})
}

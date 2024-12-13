package controllers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

// HospitalRequest handles the blood request from a hospital
func HospitalRequest(c *gin.Context) {
	var input struct {
		HospitalID string `json:"hospitalID"`
		BloodType  string `json:"bloodType"`
		// UnitsNeeded int    `json:"unitsNeeded"`
		RequestedBy string `json:"requestedBy"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Create the request in the database
	request := models.HospitalRequest{
		HospitalID: input.HospitalID,
		BloodType:  input.BloodType,
		// UnitsNeeded: input.UnitsNeeded,
		RequestedBy: input.RequestedBy,
		Status:      "Pending",
		CreatedAt:   time.Now(),
	}

	if err := initializers.DB.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	// Notify regional admin (placeholder for actual notification logic)

	c.JSON(http.StatusOK, gin.H{"message": "Blood request submitted successfully", "requestID": request.ID})
}

// RecordRecipient records the recipient ID for a donation and notifies the donor.
func RecordRecipient(c *gin.Context) {
	var input struct {
		SerialID    string `json:"serialID"`
		RecipientID string `json:"recipientID"`
	}

	// Bind JSON input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Find the donation by SerialID
	var donation models.Donation
	if err := initializers.DB.Where("serial_id = ?", input.SerialID).First(&donation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Donation not found"})
		return
	}

	// Update donation with the recipient ID and change the stage to "Used"
	donation.RecipientID = input.RecipientID
	donation.CurrentStage = "Used"
	if err := initializers.DB.Save(&donation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update donation"})
		return
	}

	// Notify the donor
	go sendDonorNotification(donation.UserID, input.RecipientID) // Async notification

	c.JSON(http.StatusOK, gin.H{"message": "Recipient recorded and donor notified successfully"})
}

// sendDonorNotification sends a notification to the donor after their blood is used and updates the donor's dashboard status.
func sendDonorNotification(userID string, recipientID string) {
	var user models.User
	// Fetch the user from the database
	if err := initializers.DB.Where("id = ?", userID).First(&user).Error; err != nil {
		log.Printf("Error fetching user with ID %s: %v", userID, err)
		return
	}

	// Update the donor's DashboardStatus with a thank-you message or any related info
	user.DashboardStatus = fmt.Sprintf("Thank you for your donation! Your blood has saved a life. Recipient ID: %s", recipientID)

	// Save the updated dashboard status for the user
	if err := initializers.DB.Save(&user).Error; err != nil {
		log.Printf("Error updating dashboard status for user %s: %v", userID, err)
		return
	}

	// Optionally, log success
	log.Printf("Notification successfully created for user %s and dashboard updated", userID)
}

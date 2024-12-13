// controllers/donors.go
package controllers

import (
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

// donorform
func DonateBlood(c *gin.Context) {
	var donorInput struct {
		UserID       string `json:"userID"`
		DonationDate string `json:"donationDate"`
		BloodType    string `json:"bloodType"`
		Status       string `json:"status"`
		SatelliteID  string `json:"satelliteId"`
		SourceType   string `json:"sourceType"` // New field
	}

	if err := c.ShouldBindJSON(&donorInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	donor := models.Donor{
		UserID:       donorInput.UserID,
		DonationDate: donorInput.DonationDate,
		BloodType:    donorInput.BloodType,
		Status:       donorInput.Status,
		SatelliteID:  donorInput.SatelliteID,
		SourceType:   donorInput.SourceType, // Set the source type
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

func RegionBlood(c *gin.Context) {
	var donorInput struct {
		SerialId     string `json:"userID"`
		RegionalID   string `json:"regionalID"`
		DonationDate string `json:"date"`
		Status       string `json:"status"`
		SourceType   string `json:"sourceType"` // New field
	}

	if err := c.ShouldBindJSON(&donorInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	donor := models.Donor{
		UserID:       donorInput.SerialId,
		DonationDate: donorInput.DonationDate,
		// BloodType:    donorInput.BloodType,
		RegionalID: donorInput.RegionalID,
		Status: donorInput.Status,
		// SatelliteID:  donorInput.SatelliteID,
		SourceType: donorInput.SourceType, // Set the source type
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

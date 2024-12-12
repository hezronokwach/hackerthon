// controllers/donors.go
package controllers

import (
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)
//donorform
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

	donor := models.Donor{
		UserID:       donorInput.UserID,
		DonationDate: donorInput.DonationDate,
		BloodType:    donorInput.BloodType,
		Status:       donorInput.Status,
		SatelliteID:  donorInput.SatelliteID,
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

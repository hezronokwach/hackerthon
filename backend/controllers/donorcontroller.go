// controllers/donors.go
package controllers

import (
	"net/http"
	"authorization/backend/initializers"
	"authorization/backend/models"
	"authorization/backend/utils"
	"github.com/gin-gonic/gin"
)

// donorform
func SatelitteBlood(c *gin.Context) {
	var donorInput struct {
		UserID       string `json:"userID"`
		//DonationDate string `json:"donationDate"`
		// BloodType    string `json:"bloodType"`
		Status      string `json:"status"`
		SatelliteID string `json:"satelliteId"`
		SourceType  string `json:"sourceType"` // New field
	}

	if err := c.ShouldBindJSON(&donorInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}
	formattedTime := utils.GetCurrentTimeInNairobi() // Format as YYYY-MM-DD HH:MM:SS


	donor := models.DonorBlood{
		UserID:       donorInput.UserID,
		DonationDate: formattedTime,
		// BloodType:    donorInput.BloodType,
		Status:      donorInput.Status,
		SatelliteID: donorInput.SatelliteID,
		SourceType:  donorInput.SourceType, // Set the source type
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

func RegionBlood(c *gin.Context) {
	var donorInput struct {
		SerialId   string `json:"bloodID"`
		RegionalID string `json:"regionalID"`
		Status     string `json:"status"`
		SourceType string `json:"sourceType"` // New field
	}

	if err := c.ShouldBindJSON(&donorInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	// Query the satellite record to find the UserID associated with the BloodID
	var satelliteRecord models.DonorBlood
	if err := initializers.DB.Where("blood_id = ? AND source_type = ?", donorInput.SerialId, "satellite").First(&satelliteRecord).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not find satellite record"})
		return
	}
	formattedTime := utils.GetCurrentTimeInNairobi() // Format as YYYY-MM-DD HH:MM:SS

	// Create the DonorBlood record for the regional process
	donor := models.DonorBlood{
		BloodID:      donorInput.SerialId,
		UserID:       satelliteRecord.UserID, // Set the UserID from the satellite record
		DonationDate: formattedTime,          // Set the auto-generated date and time
		RegionalID:   donorInput.RegionalID,
		Status:       donorInput.Status,
		SourceType:   donorInput.SourceType, // Set the source type
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

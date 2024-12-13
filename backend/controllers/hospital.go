package controllers

import (
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

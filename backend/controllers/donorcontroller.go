// controllers/donors.go
package controllers

import (
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

func DonateBlood(c *gin.Context) {
	var donorInput struct {
		FirstName   string `json:"firstName" binding:"required"`
		LastName    string `json:"lastName" binding:"required"`
		Email       string `json:"email" binding:"required,email"`
		PhoneNumber string `json:"phoneNumber"`
		SatelliteID uint   `json:"satelliteId" binding:"required"`
	}

	if err := c.ShouldBindJSON(&donorInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	donor := models.Donor{
		FirstName:   donorInput.FirstName,
		LastName:    donorInput.LastName,
		Email:       donorInput.Email,
		PhoneNumber: donorInput.PhoneNumber,
		SatelliteID: donorInput.SatelliteID,
	}

	if err := initializers.DB.Create(&donor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create donor record"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Donation request submitted successfully"})
}

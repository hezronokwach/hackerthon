package controllers

import (
	"fmt"
	"net/http"
	"time"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

// GetRegionalDonations retrieves all donations for a regional center.
func GetRegionalDonations(c *gin.Context) {
	regionalID := c.Param("regionalID")

	var donations []models.Donation
	if err := initializers.DB.Where("current_stage=? AND status=? AND regional_id=?", "Regional", "Valid", regionalID).Find(&donations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve donations"})
		return
	}
	c.JSON(http.StatusOK, donations)
}

func ProcessBloodScreeningForm(c *gin.Context) {
	// Define a struct to bind the incoming JSON request body (blood type, serial ID, contact person details)
	var input struct {
		SerialID      string `json:"serialID"`
		BloodType     string `json:"bloodType"`
		Status        string `json:"status"`
		ContactPerson string `json:"contactPerson"`
		ContactEmail  string `json:"contactEmail"`
	}

	// Bind the incoming JSON to the struct
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Retrieve the donation by its SerialID from the database
	var donation models.Donation
	if err := initializers.DB.Where("serial_id = ?", input.SerialID).First(&donation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Donation not found"})
		return
	}

	// Update the donation details with the provided information
	donation.BloodType = input.BloodType
	donation.Status = input.Status
	donation.CurrentStage = "Regional" // Assuming the screening happens at the Regional stage
	donation.UpdatedAt = time.Now().Format(time.RFC3339)

	// Save the updated donation information
	if err := initializers.DB.Save(&donation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update donation"})
		return
	}

	// Retrieve the User (Donor) associated with the donation
	var user models.User
	if err := initializers.DB.Where("user_id = ?", donation.UserID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Update the User's DashboardStatus
	user.DashboardStatus = fmt.Sprintf(
		"Your donation (ID: %s) has been processed. Blood Type: %s, Status: %s, Current Stage: %s",
		donation.SerialID, donation.BloodType, donation.Status, donation.CurrentStage,
	)

	// Save the updated User record
	if err := initializers.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user dashboard status"})
		return
	}

	// Respond with a success message
	c.JSON(http.StatusOK, gin.H{
		"message": "Donation processed and user dashboard updated successfully",
		"donation": donation,
	})
}

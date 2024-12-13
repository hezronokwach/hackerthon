package controllers

import (
	"authorization/backend/initializers"
	"authorization/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetRegionalDonations retrieves all donations for a regional center.
func GetRegionalDonations(c *gin.Context){
	regionalID :=c.Param("regionalID")

	var donations []models.Donation
	if err := initializers.DB.Where("current_stage=? AND status=? AND regional_id=?","Regional","Valid",regionalID).Find(&donations).Error; err !=nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to retrieve donations"})
		return
	}
	c.JSON(http.StatusOK,donations)
}

// ProcessBloodScreeningForm receives the blood screening results from the regional center and updates the donation status.
func ProcessBloodScreeningForm(c *gin.Context) {
	// Define a struct to bind the incoming JSON request body (blood type, serial ID, contact person details)
	var input struct {
		SerialID     string `json:"serialID"`      // Unique ID for the donation
		BloodType    string `json:"bloodType"`     // Blood type of the donor
		Status       string `json:"status"`        // Result of the screening (Valid/Invalid)
		ContactPerson string `json:"contactPerson"` // Contact person from the regional center
		ContactEmail  string `json:"contactEmail"`  // Contact email from the regional center
	}

	// Bind the incoming JSON to the struct
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Retrieve the donation by its serial ID from the database
	var donation models.Donation
	if err := initializers.DB.Where("serial_id = ?", input.SerialID).First(&donation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Donation not found"})
		return
	}

	// Update the donation details with the provided information
	donation.BloodType = input.BloodType          // Update blood type
	donation.Status = input.Status                // Update status (Valid/Invalid)
	donation.CurrentStage = "Regional"            // Update current stage to Regional after screening
	donation.UpdatedAt = time.Now().Format(time.RFC3339) // Set updated timestamp

	// Optionally, you can also update the contact person info in the Regional table (if needed)
	var regional models.Regional
	if err := initializers.DB.Where("regional_id = ?", donation.SatelliteID).First(&regional).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Regional center not found"})
		return
	}
	regional.ContactPerson = input.ContactPerson
	regional.ContactEmail = input.ContactEmail

	// Save updated donation and regional center info
	if err := initializers.DB.Save(&donation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update donation"})
		return
	}

	if err := initializers.DB.Save(&regional).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update regional center info"})
		return
	}

	// Respond with success message
	c.JSON(http.StatusOK, gin.H{
		"message": "Donation successfully processed and updated",
		"serialID": donation.SerialID,
		"bloodType": donation.BloodType,
		"status": donation.Status,
		"contactPerson": regional.ContactPerson,
		"contactEmail": regional.ContactEmail,
	})
}

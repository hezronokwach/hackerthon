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

//Process blood screening form
func ProcessBloodScreeningForm(c *gin.Context) {
	var input struct {
		SerialID      string `json:"serialID"`
		BloodType     string `json:"bloodType"`
		Status        string `json:"status"`
		ContactPerson string `json:"contactPerson"`
		ContactEmail  string `json:"contactEmail"`
	}

	
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var donation models.Donation
	if err := initializers.DB.Where("serial_id = ?", input.SerialID).First(&donation).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Donation not found"})
		return
	}

	donation.BloodType = input.BloodType
	donation.Status = input.Status
	donation.CurrentStage = "Regional"
	donation.UpdatedAt = time.Now().Format(time.RFC3339)

	if err := initializers.DB.Save(&donation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update donation"})
		return
	}

	var user models.User
	if err := initializers.DB.Where("user_id = ?", donation.UserID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	user.DashboardStatus = fmt.Sprintf(
		"Your donation (ID: %s) has been processed. Blood Type: %s, Status: %s, Current Stage: %s",
		donation.SerialID, donation.BloodType, donation.Status, donation.CurrentStage,
	)

	if err := initializers.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user dashboard status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":  "Donation processed and user dashboard updated successfully",
		"donation": donation,
	})
}

// ApproveRequest allows the regional admin to approve a blood request
func ApproveRequest(c *gin.Context) {
	var input struct {
		RequestID  uint   `json:"requestID"`
		ApproverID string `json:"approverID"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var request models.HospitalRequest
	if err := initializers.DB.First(&request, input.RequestID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
		return
	}

	request.Status = "Approved"
	request.ApproverID = input.ApproverID
	request.ApprovedAt = time.Now()

	if err := initializers.DB.Save(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Request approved successfully", "requestID": request.ID})
}

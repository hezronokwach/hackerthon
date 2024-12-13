package controllers

import (
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

// GetHospitalRequests retrieves blood requests made by a hospital.
func GetHospitalRequests(c *gin.Context) {
	hospitalID := c.Param("hospitalID")

	var requestsCount int64
	if err := initializers.DB.Model(&models.Donation).Where("current_stage = ? AND facility_name = ?", "Hospital", hospitalID).Count(&requestsCount).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve requests"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"totalRequests": requestsCount})
}

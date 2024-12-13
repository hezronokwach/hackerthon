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
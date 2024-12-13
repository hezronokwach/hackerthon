package controllers

import (
	"authorization/backend/initializers"
	"authorization/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetSatelliteDonations retrieves all donations handled by a satellite
func GetSatelliteDonations(c *gin.Context){
	sateliteID:=c.Param("satelliteID")

	var donation []models.Donation
	if err :=initializers.DB.Where("satellite_id=?", sateliteID).Find(&donation).Error; err !=nil{
		c.JSON(http.StatusInternalServerError,gin.H{"error":"Failed to retrieve donations"})
		return
	}
	c.JSON(http.StatusOK,donation)

}
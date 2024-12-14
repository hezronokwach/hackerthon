package controllers

import (
	"fmt"
	"log"
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context) {
	var SignupInput struct {
		// UserID      string `json:"userID"`
		Email       string `json:"email" binding:"required"`
		Password    string `json:"password" binding:"required"`
		PhoneNumber string `json:"phoneNumber"`
		FirstName   string `json:"firstName"`
		LastName    string `json:"lastName"`
	}

	if err := c.ShouldBindJSON(&SignupInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	user := models.User{
		// UserID:      SignupInput.UserID,
		Email:       SignupInput.Email,
		Password:    SignupInput.Password,
		PhoneNumber: SignupInput.PhoneNumber,
		FirstName:   SignupInput.FirstName,
		LastName:    SignupInput.LastName,
	}

	if err := initializers.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

// user login
func Login(c *gin.Context) {
	var user models.User
	var LoginInput struct {
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	if err := c.ShouldBindJSON(&LoginInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}
	if err := initializers.DB.Where("email = ?", LoginInput.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		return
	}
	if user.Password != LoginInput.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"userID":  user.UserID,
	})
}

func Satelitte(c *gin.Context) {
	var satellite struct {
		// ID                string `json:"satelliteID"`
		SatelitteName     string `json:"satelliteName"`
		SatelitteLocation string `json:"satelliteLocation"`
		ContactPerson     string `json:"contactPerson"`
		ContactEmail      string `json:"contactEmail"  binding:"required"`
		ContactPassword   string `json:"contactPassword" binding:"required"`
	}
	if err := c.ShouldBindJSON(&satellite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	satellite1 := models.Satelitte{
		// SatelitteID:       satellite.ID,
		SatelitteName:     satellite.SatelitteName,
		SatelitteLocation: satellite.SatelitteLocation,
		ContactPerson:     satellite.ContactPerson,
		ContactEmail:      satellite.ContactEmail,
		ContactPassword:   satellite.ContactPassword,
	}
	// fmt.Println("satelitte id", satellite.ID)
	if err := initializers.DB.Create(&satellite1).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func SatelitteLogin(c *gin.Context) {
	var user models.Satelitte
	var SatelitteInput struct {
		ID       string `json:"satelitteID"`
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	// fmt.Println("id", SatelitteInput.ID)
	if err := c.ShouldBindJSON(&SatelitteInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}
	fmt.Println(SatelitteInput.ID)
	if err := initializers.DB.Where("satelitte_id = ? AND contact_email = ?", SatelitteInput.ID, SatelitteInput.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid id"})
		return
	}
	if user.ContactPassword != SatelitteInput.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successfully"})
}

func Region(c *gin.Context) {
	regional := models.Regional{
		RegionName:      "Mombasa Safe",
		RegionLocation:  "Mombasa",
		ContactPerson:   "Brian",
		ContactEmail:    "brian@gmail.com",
		ContactPassword: "12",
	}

	if err := initializers.DB.Create(&regional).Error; err != nil {
		log.Printf("Error creating regional record: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Region center created successfully"})
}

func Hospital(c *gin.Context) {
	hospital := models.Hospital{
		HospitalName:     "Mombasa Provisional",
		HospitalLocation: "Mombasa",
		ContactPerson:    "Dan",
		ContactEmail:     "Dan@gmail.com",
		ContactPassword:  "12",
	}
	if err := initializers.DB.Create(&hospital).Error; err != nil {
		log.Printf("Error creating regional record: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Hospital created successfully"})
}

func GetUserDonations(c *gin.Context) {
	userID := c.Param("userID")

	// Get user details
	var user models.User
	if err := initializers.DB.Where("user_id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
		return
	}

	var donations []models.DonorBlood

	// Check for hospital donations first
	if err := initializers.DB.Where("user_id = ? AND source_type = ?", userID, "hospital").Find(&donations).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch donations"})
		return
	}

	// If no hospital donations, check for regional donations
	if len(donations) == 0 {
		if err := initializers.DB.Where("user_id = ? AND source_type = ?", userID, "regional").Find(&donations).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch donations"})
			return
		}
	}

	// If no regional donations, check for satellite donations
	if len(donations) == 0 {
		if err := initializers.DB.Where("user_id = ? AND source_type = ?", userID, "satellite").Find(&donations).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch donations"})
			return
		}
	}

	var enrichedDonations []gin.H

	for _, donation := range donations {
		var facilityName string
		if donation.SourceType == "regional" {
			var regionals []models.Regional
			if err := initializers.DB.Where("region_id = ?", donation.RegionalID).Find(&regionals).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch regional information"})
				return
			}
			if len(regionals) > 0 {
				facilityName = regionals[0].RegionName
			}

			// Check if the status is "discarded"
			if donation.Status == "discarded" {
				donation.Feedback = "Please visit the next health center for consultation."
			}
			if donation.Status == "Compatible" {
				donation.Feedback = "You have saved a life."
			}
		} else if donation.SourceType == "satellite" {
			var satellites []models.Satelitte
			if err := initializers.DB.Where("satelitte_id = ?", donation.SatelliteID).Find(&satellites).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch satellite information"})
				return
			}
			if len(satellites) > 0 {
				facilityName = satellites[0].SatelitteName
			}
		} else if donation.SourceType == "hospital" {
			var hospital []models.Hospital
			if err := initializers.DB.Where("hospital_id = ?", donation.HospitalID).Find(&hospital).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch hospital information"})
				return
			}
			if len(hospital) > 0 {
				facilityName = hospital[0].HospitalName
			}
		}

		enrichedDonations = append(enrichedDonations, gin.H{
			"DonationDate":  donation.DonationDate,
			"BloodType":     donation.BloodType,
			"Status":        donation.Status,
			"PatientUserID": donation.PatientUserID,
			"PatientNumber": donation.PatientNumber,
			"FacilityName":  facilityName,
			"Feedback":      donation.Feedback,
		})
	}

	// Check for emergencies and add emergency details if any
	var emergencyDetails []gin.H
	// Example logic to fetch emergency details
	var emergencies []models.Emergency
	if err := initializers.DB.Find(&emergencies).Error; err == nil && len(emergencies) > 0 {
		for _, emergency := range emergencies {
			emergencyDetails = append(emergencyDetails, gin.H{
				"BloodType":     emergency.BloodType,
				"RegionLocation": emergency.RegionLocation,
				"Message":       "Please donate blood at the nearest regional center.",
			})
		}
	}

	response := gin.H{
		"user": gin.H{
			"firstName": user.FirstName,
			"lastName":  user.LastName,
			"email":     user.Email,
		},
		"donations": enrichedDonations,
		"emergencies": emergencyDetails, // Include emergency details in the response
	}

	c.JSON(http.StatusOK, response)
}
package controllers

import (
	"fmt"
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context) {
	var SignupInput struct {
		UserID      string `json:"userID"`
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
		UserID:      SignupInput.UserID,
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
//user login
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
        "userID": user.UserID,
    })
}

func Satelitte(c *gin.Context) {
	var satellite struct {
		ID                string `json:"satelliteID"`
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

	satellite1 := models.Satellite{
		SatelliteID:       satellite.ID,
		SatelliteName:     satellite.SatelitteName,
		SatelliteLocation: satellite.SatelitteLocation,
		ContactPerson:     satellite.ContactPerson,
		ContactEmail:      satellite.ContactEmail,
		ContactPassword:   satellite.ContactPassword,
	}
	fmt.Println("satelitte id", satellite.ID)
	if err := initializers.DB.Create(&satellite1).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func SatelitteLogin(c *gin.Context) {
	var user models.Satellite
	var SatelitteInput struct {
		ID       string `json:"satelitteID"`
		Email    string `json:"email" binding:"required"`
		Password string `json:"password" binding:"required"`
	}
	fmt.Println("id", SatelitteInput.ID)
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


func GetUserDonations(c *gin.Context) {
    userID := c.Param("userID")
    var user models.User
    if err := initializers.DB.Where("user_id = ?", userID).First(&user).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user"})
        return
    }
    
    // Get user's donations
    var donations []models.Donation
    if err := initializers.DB.Where("user_id = ?", userID).Find(&donations).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch donations"})
        return
    }
    
    // Return both user and donations data
    c.JSON(http.StatusOK, gin.H{
        "user": gin.H{
            "firstName": user.FirstName,
            "lastName": user.LastName,
            "email": user.Email,
        },
        "donations": donations,
    })
}

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
package controllers

import (
	"net/http"

	"authorization/backend/initializers"
	"authorization/backend/models"

	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context) {
	var SignupInput struct {
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

	c.JSON(http.StatusOK, gin.H{"message": "Login successfully"})
}

func Satelitte(c *gin.Context) {
	var satellite struct {
		SatelitteName       string `json:"satelliteName"`
		SatelitteLocation   string `json:"satelliteLocation"`
		ContactPerson string `json:"contactPerson"`
		ContactEmail  string `json:"contactEmail"  binding:"required"`
		ContactPassword   string `json:"contactPassword" binding:"required"`
	}
	if err := c.ShouldBindJSON(&satellite); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid input"})
		return
	}

	satellite1 := models.Satelitte{
		SatelitteName:       satellite.SatelitteName,
		SatelitteLocation:    satellite.SatelitteLocation, 
		ContactPerson: satellite.ContactPerson,
		ContactEmail:   satellite.ContactEmail,
		ContactPassword:    satellite.ContactPassword,
	}

	if err := initializers.DB.Create(&satellite1).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create user"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}
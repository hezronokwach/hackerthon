package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email       string `gorm:"uniqueIndex;not null"`
	Password    string `gorm:"not null"`
	PhoneNumber string
	FirstName   string
	LastName    string
}

type Satelitte struct {
	gorm.Model
	SatelitteID string
	SatelitteName string
	SatelitteLocation string
	ContactPerson     string
	ContactEmail      string
	ContactPassword   string
}
type Donor struct {
	ID          uint   `gorm:"primaryKey"`
	FirstName   string `json:"firstName"`
	LastName    string `json:"lastName"`
	Email       string `json:"email" binding:"required"`
	PhoneNumber string `json:"phoneNumber"`
	SatelliteID uint   `json:"satelliteId" binding:"required"`
}

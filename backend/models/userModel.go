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

type Satelitte struct{
	gorm.Model
	SatelitteID string
	SatelitteName string
	SatelitteLocation string
	ContactPerson string
	ContactEmail string
	ContactPassword string	
}
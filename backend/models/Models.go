package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserID          string
	Email           string `gorm:"uniqueIndex;not null"`
	Password        string `gorm:"not null"`
	PhoneNumber     string
	FirstName       string
	LastName        string
	DashboardStatus string
	Donations       []Donation
}

type Satellite struct {
	gorm.Model
	SatelliteID       string `gorm:"uniqueIndex"`
	SatelliteName     string
	SatelliteLocation string
	ContactPerson     string
	ContactEmail      string     `gorm:"uniqueIndex;not null"`
	ContactPassword   string     `gorm:"not null"`
	Donations         []Donation `gorm:"foreignKey:SatelliteID"`
}

// Represents a blood donation event
type Donation struct {
	gorm.Model
	SerialID     string `gorm:"uniqueIndex"`
	UserID       string
	User         User
	DonationDate string
	SatelliteID  string
	Satellite    Satellite
	Status       string
	CurrentStage string // Satellite, Regional, or Hospital
	BloodType    string
	FacilityName string
	UpdatedAt    string
	RecipientID string
}

// Represents regional centers for blood screening
type Regional struct {
	gorm.Model
	RegionalID         string `gorm:"uniqueIndex"`
	RegionalLocation   string
	ContactPerson      string
	ContactEmail       string     `gorm:"uniqueIndex;not null"`
	ContactPassword    string     `gorm:"not null"`
	ProcessedDonations []Donation `gorm:"foreignKey:RegionalID"`
}

// Hospital represents hospitals requesting blood.
type HospitalRequest struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	HospitalID  string    `json:"hospitalID"`
	BloodType   string    `json:"bloodType"`
	// UnitsNeeded int       `json:"unitsNeeded"`
	RequestedBy string    `json:"requestedBy"`
	Status      string    `json:"status"`
	ApproverID  string    `json:"approverID,omitempty"`
	CreatedAt   time.Time `json:"createdAt"`
	ApprovedAt  time.Time `json:"approvedAt,omitempty"`
}

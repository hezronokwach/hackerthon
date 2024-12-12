package initializers

import (
	"log"

	"authorization/backend/models"
)

// initializers/syncDb.go
func SyncDb() {
	log.Println("Starting database migration...")
	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	log.Println("Database migration completed successfully")
}


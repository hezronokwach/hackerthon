package main

import (
	"log"

	"authorization/backend/controllers"
	"authorization/backend/initializers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	log.Println("Initializing database connection...")
	initializers.ConnectToDb()
	log.Println("Running database migrations...")
	initializers.SyncDb()
}

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3001"}, // Adjust this to your frontend's origin
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// Routes for user actions
	router.POST("/signup", controllers.SignUp)     // User signup
	router.POST("/login", controllers.Login)       // User login

	// Routes for donor actions
	router.POST("/donate", controllers.DonateBlood)        // Donor donates blood
	router.PUT("/donor-status", controllers.UpdateDonorStatus) // Update donor status
	router.POST("/donor-notify", controllers.NotifyDonor)      // Notify donor after donation

	// Routes for hospital requests
	router.POST("/hospital-request", controllers.HospitalRequest)  // Hospital blood request
	router.PUT("/record-recipient", controllers.RecordRecipient)  // Record recipient for blood donation
	router.PUT("/approve-request", controllers.ApproveRequest)    // Approve blood request

	// Routes for regional center actions
	router.GET("/regional-donations/:regionalID", controllers.GetRegionalDonations) // Get donations for a regional center
	router.POST("/blood-screening", controllers.ProcessBloodScreeningForm) // Process blood screening form

	// Routes for satellite actions
	router.POST("/satellite", controllers.Satelitte) // Satellite-related actions (example)

	// Start the server
	router.Run(":3000")

}



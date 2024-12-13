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
		AllowOrigins:     []string{"http://localhost:3001"}, 
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	// Define the /signin route
	router.POST("/signup", controllers.SignUp)	
	router.POST("/login", controllers.Login)
	router.POST("/satelliteSignup", controllers.Satelitte)
	router.POST("/satelitteLogin", controllers.SatelitteLogin)
	router.POST("/satelitteDashboard/add", controllers.SatelitteBlood)
	router.GET("/region", controllers.Region)
	router.GET("/donorPage/:userID", controllers.GetUserDonations)
	router.POST("/regional/add", controllers.RegionBlood)
	router.POST("/regional/update", controllers.RegionUpdate)
	router.GET("/hospital", controllers.Hospital)

	// Run the server on port 3000
	router.Run(":3000")
}

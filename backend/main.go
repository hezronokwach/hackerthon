package main

import (
	"flag"
	"log"
	"net/http"
	"os"

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

//Create struct to enable easy injection of our dependencies 
//to the handlers

type application struct{
	errorLog *log.Logger
	infoLog *log.Logger
}

func main() {
	//Pass address as a commandline flag to manage configurations
	addr:=flag.String("addr",":3000","HTTP network address")
	flag.Parse()
	//enable leveled logging to differentiate error messages and info msgs
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Ltime|log.Llongfile)
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3001"}, // Adjust this to your frontend's origin
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	//Initialize a new http.Server struct
	server:=&http.Server{
		Addr: *addr,
		ErrorLog: errorLog,
		Handler: router,
	}


	// Define the /signin route
	router.POST("/signup", controllers.SignUp)
	infoLog.Printf("starting server on %s", *addr)

	// Run the server on port 3000
	router.Run()
}

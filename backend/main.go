package main

import "net/http"

func main() {
	http.Handle("/signin", withCORS(http.HandlerFunc(SignupHandler)))
	http.ListenAndServe(":3000",nil)
}
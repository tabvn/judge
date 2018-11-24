package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"ued/ued"
	"errors"
	"github.com/rs/cors"
	"fmt"
)

func beforeRun() {

	_, err := ued.InitDatabase("root:@tcp(127.0.0.1:3306)/ued?charset=utf8mb4&collation=utf8mb4_unicode_ci")
	if err != nil {
		panic(errors.New("can not connect to database"))
	}
}
func main() {

	beforeRun()

	router := mux.NewRouter()
	ued.AppRouters(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "GET", "OPTIONS"},
		AllowedHeaders: []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization",
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Origin",
			"Origin",
			"Access-Control-Request-Headers",
			"Access-Control-Request-Method",
			"Connection",
		},
		// Enable Debugging for testing, consider disabling in production
		Debug: false,
	})

	router.Use(ued.Middleware)
	handler := c.Handler(router)

	fmt.Println("Server running: http://127.0.0.1:8000")
	log.Fatal(http.ListenAndServe(":8000", handler))

}

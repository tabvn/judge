package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"ued/ued"
	"errors"
	"github.com/rs/cors"
	"fmt"
	"os"
	"io/ioutil"
	"encoding/json"
)

func configuration() {
	configFile, err := os.Open("config.json")
	if err != nil {
		panic(err)
		return
	}

	defer configFile.Close()
	byteValue, _ := ioutil.ReadAll(configFile)

	e := json.Unmarshal([]byte(byteValue), &ued.Config)
	if e != nil {
		panic(e)
	}

}
func beforeRun() {

	configuration()
	_, err := ued.InitDatabase(ued.Config.DatabaseConnectURL)
	if err != nil {
		panic(errors.New("can not connect to database"))
	}
}
func main() {

	beforeRun()

	router := mux.NewRouter()
	ued.AppRouters(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001"},
		AllowCredentials: true,
		AllowedMethods:   []string{"POST", "GET", "OPTIONS","PUT", "DELETE"},
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

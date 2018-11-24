package ued

import "github.com/gorilla/mux"

func AppRouters(router *mux.Router) {

	router.HandleFunc("/api", HandleApp).Methods("GET")
	router.HandleFunc("/api/register", CreateUser).Methods("POST")
	router.HandleFunc("/api/login", HandleLogin).Methods("POST")
	router.HandleFunc("/api/logout", HandleSignOut).Methods("POST")
	router.HandleFunc("/api/users/{id:[0-9]+}", UpdateUser).Methods("PUT")
	router.HandleFunc("/api/problems", CreateProblem).Methods("POST")
}

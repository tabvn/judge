package ued

import "github.com/gorilla/mux"

func AppRouters(router *mux.Router) {

	router.HandleFunc("/api", HandleApp).Methods("GET")
	router.HandleFunc("/api/register", CreateUser).Methods("POST")
	router.HandleFunc("/api/login", HandleLogin).Methods("POST")
	router.HandleFunc("/api/logout", HandleSignOut).Methods("POST")
	router.HandleFunc("/api/users/{id:[0-9]+}", UpdateUser).Methods("PUT")
	router.HandleFunc("/api/problems", CreateProblem).Methods("POST")
	router.HandleFunc("/api/problems/{id:[0-9]+}", HandleGetProblem).Methods("GET")
	router.HandleFunc("/api/problems/{id:[0-9]+}", HandleUpdateProblem).Methods("PUT")
	router.HandleFunc("/api/problems/{id:[0-9]+}", HandleDeleteProblem).Methods("DELETE")
	router.HandleFunc("/api/files", HandleUpload).Methods("POST")
	router.HandleFunc("/api/files/{id:[0-9]+}", HandleDeleteFile).Methods("DELETE")

}

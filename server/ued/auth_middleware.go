package ued

import (
	"net/http"
	"fmt"
	"context"
	"github.com/gorilla/mux"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.RequestURI == "/api/register" || r.RequestURI == "/api/login" {
			next.ServeHTTP(w, r)
			return
		}

		auth := r.Header.Get("authorization")

		if len(auth) == 0 {
			http.Error(w, "access denied", http.StatusForbidden)
			return
		}

		token := GetToken(auth)

		if token == nil {
			http.Error(w, "access denied", http.StatusForbidden)
			return
		} else {
			ctx := context.WithValue(r.Context(), "user_id", token.UserID)
			next.ServeHTTP(w, r.WithContext(ctx))
		}

	})
}

func auth(name string, r *http.Request) (bool) {

	userId := getUserIdFromRequest(r)
	if userId == 0 {
		return false
	}
	role := GetUserRole(userId)
	fmt.Println("role", role)

	// we may need implement permission via permissions table in db however time is limited
	switch name {

	case "delete_file":
		// file we only allow admin role
		return role == "admin"
	case "update_user":
		// allow admin or owner can update user info
		params := mux.Vars(r)
		return role == "admin" || userId == GetId(params["id"])

	default:
		return true
	}

	return true

}

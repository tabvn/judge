package ued

import (
	"net/http"
	"fmt"
	"context"
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

	return true

}

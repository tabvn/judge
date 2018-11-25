package ued

import (
	"crypto/rand"
	"strconv"
	"net/http"
	"time"
	"fmt"
)

func GetId(s string) (int64) {

	id, _ := strconv.ParseInt(s, 10, 64)
	return id
}

func getUserIdFromRequest(r *http.Request) (int64) {

	contextUserId := r.Context().Value("user_id")
	if contextUserId != nil && contextUserId != "" {
		return contextUserId.(int64)
	}
	return 0

}

func RequestTime() (int64) {
	return time.Now().Unix()

}

func randToken(len int) string {
	b := make([]byte, len)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}

package ued

import (
	"strconv"
	"net/http"
	"time"
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

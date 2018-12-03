package ued

import (
	"crypto/rand"
	"strconv"
	"net/http"
	"time"
	"fmt"
	"encoding/json"
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

func GetFilterFromRequest(r *http.Request) (*Filter) {

	filterQuery := r.URL.Query().Get("filter")
	var filter Filter

	filter.Limit = 50
	filter.Offset = 0
	filter.Search = ""

	if filterQuery != "" {
		err := json.Unmarshal([]byte(filterQuery), &filter)
		if err != nil {
			return nil
		}

	}

	return &filter
}

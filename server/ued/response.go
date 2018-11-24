package ued

import (
	"net/http"
)

type ErrorResponse struct {
	code  int
	error string
}

func HandleErrorResponse(w http.ResponseWriter, e ErrorResponse) {
	http.Error(w, e.error, e.code)

}

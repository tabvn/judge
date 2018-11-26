package ued

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	} else {
		err := user.Create()
		if err != nil {
			HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}

}

func UpdateUser(w http.ResponseWriter, r *http.Request) {

	if !auth("update_user", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusForbidden})
		return
	}

	var user User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	} else {

		params := mux.Vars(r)

		user.ID = GetId(params["id"])
		err := user.Save()
		if err != nil {
			HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}

}

/*
* Handle user login
 */
func HandleLogin(w http.ResponseWriter, r *http.Request) {

	var login Login
	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	}

	token, e := login.Auth()
	if e != nil {
		HandleErrorResponse(w, ErrorResponse{error: e.Error(), code: http.StatusBadRequest})
		return
	}
	if token == nil {
		HandleErrorResponse(w, ErrorResponse{error: "Login failed", code: http.StatusBadRequest})
		return
	}

	SetCookie(w, "auth", token.Token)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(token)

}

/*
* Handle user login
 */
func HandleSignOut(w http.ResponseWriter, r *http.Request) {

	var logoutData LogoutData
	err := json.NewDecoder(r.Body).Decode(&logoutData)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	}

	e := logoutData.logout()

	if e != nil {
		HandleErrorResponse(w, ErrorResponse{error: e.Error(), code: http.StatusBadRequest})
		return
	}

	SetCookie(w, "auth", "")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(LogoutResponse{Success: true})

}

func HandleApp(w http.ResponseWriter, r *http.Request) {

	var data AppData
	userId := getUserIdFromRequest(r)
	data.Me = GetUser(userId)
	data.Role = GetUserRole(userId)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)

}

func CreateProblem(w http.ResponseWriter, r *http.Request) {
	if !auth("create_problem", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusForbidden})
		return

	}
	var problem Problem
	err := json.NewDecoder(r.Body).Decode(&problem)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	}
	problem.UserID = getUserIdFromRequest(r)

	e := problem.Create()
	if e != nil {
		HandleErrorResponse(w, ErrorResponse{error: "An error", code: http.StatusBadRequest})
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(problem)

}

func HandleGetProblem(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	problemId := GetId(params["id"])

	problem := GetProblem(problemId)
	if problem != nil {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(problem)

		return
	}
	HandleErrorResponse(w, ErrorResponse{error: "Not found", code: http.StatusNotFound})

}

func HandleUpdateProblem(w http.ResponseWriter, r *http.Request) {

	if !auth("update_problem", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusForbidden})
		return
	}

	params := mux.Vars(r)
	problemId := GetId(params["id"])

	var problem Problem
	err := json.NewDecoder(r.Body).Decode(&problem)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	}
	problem.ID = problemId

	if problem.Save() != nil {
		HandleErrorResponse(w, ErrorResponse{error: "an error saving problem", code: http.StatusBadRequest})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(problem)

}

func HandleDeleteProblem(w http.ResponseWriter, r *http.Request) {

	if !auth("delete_problem", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusForbidden})
		return
	}

	params := mux.Vars(r)
	problemId := GetId(params["id"])

	err := DeleteProblem(problemId)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
	}

	w.Header().Set("Content-Type", "application/json")
	res := []byte("{\"success\": \"true\"}")
	w.Write(res)

}

func HandleUpload(w http.ResponseWriter, r *http.Request) {

	userId := getUserIdFromRequest(r)

	Upload(userId, w, r)
}

func HandleDeleteFile(w http.ResponseWriter, r *http.Request) {
	if !auth("delete_file", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})
		return
	}
	params := mux.Vars(r)
	fileId := GetId(params["id"])

	err := DeleteFile(fileId)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	}
	w.Header().Set("Content-Type", "application/json")
	res := []byte("{\"success\": \"true\"}")
	w.Write(res)

}

func HandleCreateTestCase(w http.ResponseWriter, r *http.Request) {

	params := mux.Vars(r)
	problemId := GetId(params["id"])

	var t TestCase

	e := json.NewDecoder(r.Body).Decode(&t)
	if e != nil {
		HandleErrorResponse(w, ErrorResponse{error: e.Error(), code: http.StatusBadRequest})
		return
	}

	t.ProblemID = problemId

	err := t.Create()

	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})

		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(t)

}

func HandleGetProblemTestCases(w http.ResponseWriter, r *http.Request) {

	if !auth("test_cases", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})
		return
	}

	params := mux.Vars(r)
	problemId := GetId(params["id"])

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(TestCases(problemId))

}

func HandleViewTestCaseInputFile(w http.ResponseWriter, r *http.Request) {

	if !auth("view_test_case_file", r) {

		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})
		return
	}

	params := mux.Vars(r)
	id := GetId(params["id"])

	t := GetTestCase(id, false)

	data, err := GetTestCaseFile(t.ProblemID, id, true)

	if err != nil {
		Logger(err.Error(), "load_input_file")
		HandleErrorResponse(w, ErrorResponse{error: "can not load input file", code: http.StatusBadRequest})
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.Write(data)

}

func HandleViewTestCaseOutFile(w http.ResponseWriter, r *http.Request) {

	if !auth("view_test_case_file", r) {

		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})
		return
	}

	params := mux.Vars(r)
	id := GetId(params["id"])

	t := GetTestCase(id, false)
	data, err := GetTestCaseFile(t.ProblemID, id, false)

	if err != nil {
		Logger(err.Error(), "load_output_file")
		HandleErrorResponse(w, ErrorResponse{error: "can not load output file", code: http.StatusBadRequest})
		return
	}
	w.Header().Set("Content-Type", "text/plain")
	w.Write(data)

}

func HandleDeleteTestCase(w http.ResponseWriter, r *http.Request) {
	if !auth("delete_test_case", r) {

		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})

		return
	}

	params := mux.Vars(r)
	id := GetId(params["id"])

	err := DeleteTestCase(id)

	if err != nil {

		Logger(err.Error(), "delete_test")
		HandleErrorResponse(w, ErrorResponse{error: "error deleting test case", code: http.StatusBadRequest})

		return
	}

	w.Header().Set("Content-Type", "application/json")
	res := []byte("{\"success\": \"true\"}")
	w.Write(res)

}

func HandleGetTestCase(w http.ResponseWriter, r *http.Request) {
	if !auth("get_test_case", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})

		return
	}

	params := mux.Vars(r)
	id := GetId(params["id"])

	t := GetTestCase(id, true)
	if t == nil {
		HandleErrorResponse(w, ErrorResponse{error: "not found", code: http.StatusBadRequest})

		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(t)

}

func HandleUpdateTestCase(w http.ResponseWriter, r *http.Request) {
	if !auth("update_test_case", r) {
		HandleErrorResponse(w, ErrorResponse{error: "access denied", code: http.StatusUnauthorized})

		return
	}

	params := mux.Vars(r)
	id := GetId(params["id"])

	var t TestCase
	t.ID = id

	e := json.NewDecoder(r.Body).Decode(&t)
	if e != nil {
		HandleErrorResponse(w, ErrorResponse{error: e.Error(), code: http.StatusBadRequest})
		return
	}

	err := t.Update()
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: err.Error(), code: http.StatusBadRequest})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(t)

}

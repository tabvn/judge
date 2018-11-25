package ued

import (
	"net/http"
	"io/ioutil"
	"path/filepath"
	"os"
	"encoding/json"
	"messenger/sanitize"
	"database/sql"
)

type File struct {
	ID           int64  `json:"id"`
	UserID       int64  `json:"user_id"`
	Name         string `json:"name"`
	OriginalName string `json:"original_name"`
	Type         string `json:"type"`
	Size         int64  `json:"size"`
	Created      int64  `json:"created"`
}

func (f *File) Create() (error) {

	query := "INSERT INTO files (user_id, name, original_name, size, type, created) VALUES (?,?,?,?,?,?)"

	id, err := DB.Insert(query, f.UserID, f.Name, f.OriginalName, f.Size, f.Type, f.Created)

	if err != nil {
		return err
	}
	f.ID = id
	return nil
}

func Upload(userId int64, w http.ResponseWriter, r *http.Request) () {

	const maxUploadSize = 1024 * 1024
	r.Body = http.MaxBytesReader(w, r.Body, maxUploadSize)
	if err := r.ParseMultipartForm(32 << 20); err != nil {

		HandleErrorResponse(w, ErrorResponse{error: "file upload error", code: http.StatusBadRequest})
		return
	}

	// parse and validate file and post parameters
	file, handler, err := r.FormFile("file")
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: "invalid file", code: http.StatusBadRequest})
		return
	}
	defer file.Close()
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: "invalid file", code: http.StatusBadRequest})
		return
	}

	fileType := http.DetectContentType(fileBytes)

	randName := randToken(12)
	name := randName + "_" + sanitize.Name(handler.Filename)
	if err != nil {
		HandleErrorResponse(w, ErrorResponse{error: "can not read file type", code: http.StatusBadRequest})
		return
	}
	newPath := filepath.Join(Config.FileUploadDir, name)

	// write file
	newFile, err := os.Create(newPath)
	if err != nil {

		HandleErrorResponse(w, ErrorResponse{error: "can not write file", code: http.StatusBadRequest})
		return
	}
	defer newFile.Close() // idempotent, okay to call twice

	if _, err := newFile.Write(fileBytes); err != nil || newFile.Close() != nil {
		HandleErrorResponse(w, ErrorResponse{error: "can not write file", code: http.StatusBadRequest})
		return
	}

	var fileModel File
	fileModel.Name = name
	fileModel.UserID = userId
	fileModel.OriginalName = handler.Filename
	fileModel.Type = fileType
	fileModel.Size = handler.Size
	fileModel.Created = RequestTime()

	e := fileModel.Create()
	if e != nil {

		HandleErrorResponse(w, ErrorResponse{error: "can not save file", code: http.StatusBadRequest})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(fileModel)

	return

}

func DeleteFile(fileId int64) (error) {

	var name sql.NullString

	e := DB.QueryRow("SELECT name FROM files WHERE id=?", fileId).Scan(&name)

	if e == nil && name.String != "" {
		_, err := DB.Delete("DELETE FROM files WHERE id=?", fileId)
		if err != nil {
			return err
		}
		path := Config.FileUploadDir + "/" + name.String
		defer os.Remove(path)
	}
	// we are not return error here because someone can debug our files system. so meaning we return success = true
	return nil
}

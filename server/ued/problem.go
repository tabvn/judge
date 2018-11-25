package ued

import (
	"encoding/json"
	"fmt"
	"database/sql"
)

func UnmarshalProblem(data []byte) (Problem, error) {
	var r Problem
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Problem) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Problem struct {
	ID          int64  `json:"id"`
	UserID      int64  `json:"user_id"`
	FileID      int64  `json:"file_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Input       string `json:"input"`
	Output      string `json:"output"`
	Created     int64  `json:"created"`
	File        *File  `json:"file"`
}

func (p *Problem) Create() (error) {

	p.Created = RequestTime()
	id, err := DB.Insert("INSERT INTO problems (user_id, file_id, title, description, input, output, created) VALUES (?, ?, ?, ?, ?, ?, ?)", p.UserID, p.FileID, p.Title, p.Description, p.Input, p.Output, p.Created)
	if err != nil {
		return err
	}
	p.ID = id

	return nil
}

func (p *Problem) Save() (error) {
	_, err := DB.Update("UPDATE problems SET file_id =?, title=?, description=?, input=?, output=? WHERE id=?", p.FileID, p.Title, p.Description, p.Input, p.Output, p.ID)
	return err
}

func GetProblem(problemId int64) (*Problem) {

	var title sql.NullString
	var description sql.NullString
	var input sql.NullString
	var output sql.NullString
	var userId sql.NullInt64

	var fileId sql.NullInt64
	var fileName sql.NullString
	var fileOriginalName sql.NullString
	var fileType sql.NullString
	var fileSize sql.NullInt64
	var fileCreated sql.NullInt64

	query := "SELECT p.id, p.user_id, p.file_id, p.title, p.description, p.input, p.output, p.created, f.name, f.original_name, f.type, f.size, f.created FROM problems as p LEFT JOIN files as f ON f.id = p.file_id  WHERE p.id=?"

	var problem Problem

	err := DB.QueryRow(query, problemId).Scan(&problem.ID, &userId, &fileId, &title, &description, &input, &output, &problem.Created, &fileName, &fileOriginalName, &fileType, &fileSize, &fileCreated)

	if err != nil {
		fmt.Println("err", err)
		return nil
	}

	problem.UserID = userId.Int64
	problem.Title = title.String
	problem.Description = description.String
	problem.Input = input.String
	problem.Output = output.String
	problem.FileID = fileId.Int64

	if problem.FileID > 0 {
		var file File

		file.ID = fileId.Int64
		file.Name = fileName.String
		file.OriginalName = fileOriginalName.String
		file.Type = fileType.String
		file.Size = fileSize.Int64
		file.Created = fileCreated.Int64

		problem.File = &file
	}

	return &problem

}

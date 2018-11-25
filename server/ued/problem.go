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
	Title       string `json:"title"`
	Description string `json:"description"`
	Input       string `json:"input"`
	Output      string `json:"output"`
	Created     int64  `json:"created"`
}

func (p *Problem) Create() (error) {

	p.Created = RequestTime()
	id, err := DB.Insert("INSERT INTO problems (user_id, title, description, input, output, created) VALUES (?, ?, ?, ?, ?, ?)", p.UserID, p.Title, p.Description, p.Input, p.Output, p.Created)
	fmt.Println("e", err)
	if err != nil {
		return err
	}
	fmt.Println("id", id)
	p.ID = id

	return nil
}

func GetProblem(problemId int64) (*Problem) {

	var title sql.NullString
	var description sql.NullString
	var input sql.NullString
	var output sql.NullString
	var userId sql.NullInt64

	query := "SELECT id, user_id, title, description, input, output, created FROM problems WHERE id=?"

	var problem Problem

	err := DB.QueryRow(query, problemId).Scan(&problem.ID, &userId, &title, &description, &input, &output, &problem.Created)

	if err != nil {
		return nil
	}

	problem.UserID = userId.Int64
	problem.Title = title.String
	problem.Description = description.String
	problem.Input = input.String
	problem.Output = output.String


	return &problem

}

package ued

import (
	"encoding/json"
	"fmt"
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

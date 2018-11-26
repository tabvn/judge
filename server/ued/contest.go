package ued

import (
	"encoding/json"
	"errors"
)

func UnmarshalContest(data []byte) (Contest, error) {
	var r Contest
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Contest) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Contest struct {
	ID         int64  `json:"id"`
	Name       string `json:"name,omitempty"`
	Start      int64  `json:"start"`
	End        int64  `json:"end"`
	Scoreboard bool   `json:"scoreboard"`
	Created    int64  `json:"created"`
}

func (contest *Contest) Create() (error) {

	if contest.Name == "" {
		return errors.New("name is required")
	}

	if contest.Start > 0 && contest.End > 0 && contest.End < contest.Start{
		return errors.New("wrong end time")
	}
	sql := "INSERT INTO contests (name, start, end, scoreboard, created) VALUES (?,?,?,?,?)"

	contest.Created = RequestTime()

	id, err := DB.Insert(sql, contest.Name, contest.Start, contest.End, contest.Scoreboard, contest.Created)

	if err != nil {
		Logger(err.Error(), "create_contest")
		return err
	}

	contest.ID = id

	return nil
}

func (c *Contest) Update() (error) {

	sql := "UPDATE contests SET name=?, start=?, end=?, scoreboard=?"
	_, err := DB.Update(sql, c.Name, c.Start, c.End, c.Scoreboard)

	if err != nil {
		return err
	}

	return nil
}

func DeleteContest(id int64) (error) {

	sql := "DELETE FROM contests WHERE id=?"

	_, err := DB.Delete(sql, id)

	return err
}

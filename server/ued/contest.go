package ued

import (
	"encoding/json"
	"errors"
	"database/sql"
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

func GetContest(id int64) (*Contest) {

	var c Contest

	q := "SELECT id, name, start, end, scoreboard, created FROM contests WHERE id = ?"

	err := DB.QueryRow(q, id).Scan(&c.ID, &c.Name, &c.Start, &c.End, &c.Scoreboard, &c.Created)


	if err != nil {
		Logger(err.Error(), "get_contest")
		return nil
	}

	return &c
}

func (contest *Contest) Create() (error) {

	if contest.Name == "" {
		return errors.New("name is required")
	}

	if contest.Start > 0 && contest.End > 0 && contest.End < contest.Start {
		return errors.New("wrong end time")
	}
	query := "INSERT INTO contests (name, start, end, scoreboard, created) VALUES (?,?,?,?,?)"

	contest.Created = RequestTime()

	id, err := DB.Insert(query, contest.Name, contest.Start, contest.End, contest.Scoreboard, contest.Created)

	if err != nil {
		Logger(err.Error(), "create_contest")
		return err
	}

	contest.ID = id

	return nil
}

func (c *Contest) Update() (error) {

	query := "UPDATE contests SET name=?, start=?, end=?, scoreboard=? WHERE id=?"
	_, err := DB.Update(query, c.Name, c.Start, c.End, c.Scoreboard, c.ID)

	if err != nil {
		return err
	}

	return nil
}

func DeleteContest(id int64) (error) {

	q := "DELETE FROM contests WHERE id=?"

	_, err := DB.Delete(q, id)

	return err
}

func FindContests(search string, limit int64, offset int64) ([]*Contest) {

	var rows *sql.Rows
	var err error

	var list [] *Contest
	like := "%" + search + "%"

	if search == "" {
		query := "SELECT id, name, start, end, scoreboard, created FROM contests ORDER BY created DESC LIMIT ? OFFSET ?"
		rows, err = DB.List(query, limit, offset)
	}

	if search != "" {
		query := "SELECT id, name, start, end, scoreboard, created FROM contests WHERE name like ? ORDER BY created DESC LIMIT ? OFFSET ?"
		rows, err = DB.List(query, like, limit, offset)
	}

	if err != nil {

		return nil
	}

	defer rows.Close()

	for rows.Next() {
		var c Contest
		e := rows.Scan(&c.ID, &c.Name, &c.Start, &c.End, &c.Scoreboard, &c.Created)
		if e == nil {
			list = append(list, &c)
		}
	}

	return list

}

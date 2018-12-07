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
	Published  bool   `json:"published"`
	Created    int64  `json:"created"`
}

type ContestProblem struct {
	ID        int64    `json:"id"`
	ContestID int64    `json:"contest_id"`
	ProblemID int64    `json:"problem_id"`
	MaxScore  int64    `json:"max_score"`
	Problem   *Problem `json:"problem"`
}

type ContestDetails struct {
	Contest         *Contest          `json:"contest"`
	ContestProblems []*ContestProblem `json:"contest_problems"`
}

type ContestProblemDetails struct {
	Contest         *Contest          `json:"contest"`
	ContestProblems []*ContestProblem `json:"contest_problems"`
	Problem         *Problem          `json:"problem"`
}

func GetContestProblemDetails(contestId, problemId int64) (*ContestProblemDetails) {

	var c ContestProblemDetails

	q := "SELECT COUNT(*) FROM contest_problem AS cp INNER JOIN problems AS p ON p.id = cp.problem_id INNER JOIN contests AS c ON c.id = cp.contest_id AND c.published = 1 WHERE cp.contest_id = ? AND cp.problem_id=?"

	count, err := DB.Count(q, contestId, problemId)

	if err != nil || count <= 0 {
		return nil
	}
	c.Contest = GetContest(contestId)
	c.ContestProblems = GetContestProblems(contestId)
	c.Problem = GetProblem(problemId)

	return &c

}
func (cp *ContestProblem) Create() (error) {

	id, err := DB.Insert("INSERT INTO contest_problem (contest_id, problem_id, max_score) VALUES (?, ?, ?)", cp.ContestID, cp.ProblemID, cp.MaxScore)

	if err != nil {
		Logger(err.Error(), "create_contest_problem")

		return err
	}
	cp.ID = id
	problem := GetProblem(cp.ProblemID)
	cp.Problem = problem

	return nil
}

func (cp *ContestProblem) Update() (error) {

	_, err := DB.Update("UPDATE contest_problem SET max_score =? WHERE id =?", cp.MaxScore, cp.ID)

	if err != nil {
		Logger(err.Error(), "update_contest_problem")
	}
	return err
}

func DeleteContestProblem(id int64) (error) {

	_, err := DB.Delete("DELETE FROM contest_problem WHERE id=?", id)

	return err
}

func GetContest(id int64) (*Contest) {

	var c Contest

	q := "SELECT id, name, start, end, scoreboard, published, created FROM contests WHERE id = ?"

	err := DB.QueryRow(q, id).Scan(&c.ID, &c.Name, &c.Start, &c.End, &c.Scoreboard, &c.Published, &c.Created)

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
	query := "INSERT INTO contests (name, start, end, scoreboard, published, created) VALUES (?,?,?,?,?)"

	contest.Created = RequestTime()

	id, err := DB.Insert(query, contest.Name, contest.Start, contest.End, contest.Scoreboard, contest.Published, contest.Created)

	if err != nil {
		Logger(err.Error(), "create_contest")
		return err
	}

	contest.ID = id

	return nil
}

func (c *Contest) Update() (error) {

	query := "UPDATE contests SET name=?, start=?, end=?, scoreboard=?, published=? WHERE id=?"
	_, err := DB.Update(query, c.Name, c.Start, c.End, c.Scoreboard, c.Published, c.ID)

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
		query := "SELECT id, name, start, end, scoreboard, published, created FROM contests ORDER BY end DESC LIMIT ? OFFSET ?"
		rows, err = DB.List(query, limit, offset)
	}

	if search != "" {
		query := "SELECT id, name, start, end, scoreboard, published, created FROM contests WHERE name like ? ORDER BY end DESC LIMIT ? OFFSET ?"
		rows, err = DB.List(query, like, limit, offset)
	}

	if err != nil {

		return nil
	}

	defer rows.Close()

	for rows.Next() {
		var c Contest
		e := rows.Scan(&c.ID, &c.Name, &c.Start, &c.End, &c.Scoreboard, &c.Published, &c.Created)
		if e == nil {
			list = append(list, &c)
		}
	}

	return list

}

func GetContestProblems(contestId int64) ([]*ContestProblem) {

	var items []*ContestProblem
	query := "SELECT cp.id, cp.max_score, p.id, p.title, p.description, p.user_id, p.input,p.output,p.created FROM problems as p INNER JOIN contest_problem as cp ON cp.problem_id = p.id WHERE cp.contest_id = ?"

	rows, err := DB.List(query, contestId)

	if err != nil {
		Logger(err.Error(), "get_contest_problems")
		return nil
	}

	defer rows.Close()

	var title sql.NullString
	var description sql.NullString
	var input sql.NullString
	var output sql.NullString
	var userId sql.NullInt64

	for rows.Next() {

		var p Problem
		var cp ContestProblem

		cp.ContestID = contestId

		scanErr := rows.Scan(&cp.ID, &cp.MaxScore, &p.ID, &title, &description, &userId, &input, &output, &p.Created)

		if scanErr != nil {
			Logger(scanErr.Error(), "scan_contest_problem_err")

		} else {

			p.Title = title.String
			p.Description = description.String
			p.UserID = userId.Int64
			p.Input = input.String
			p.Output = output.String
			cp.Problem = &p
			cp.ProblemID = p.ID
			items = append(items, &cp)
		}

	}

	return items
}

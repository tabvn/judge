package ued

import (
	"encoding/json"
	"os"
	"io"
	"strings"
	"strconv"
	"database/sql"
	"io/ioutil"
	"errors"
)

func UnmarshalTestCase(data []byte) (TestCase, error) {
	var r TestCase
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *TestCase) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type TestCase struct {
	ID        int64  `json:"id"`
	ProblemID int64  `json:"problem_id"`
	Strength  int64  `json:"strength,omitempty"`
	Sample    bool   `json:"sample"`
	Active    bool   `json:"active"`
	Input     string `json:"input"`
	Output    string `json:"output"`
	Created   int64  `json:"created"`
}

func WriteStringToFile(filePath, s string) error {

	fo, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer fo.Close()

	_, err = io.Copy(fo, strings.NewReader(s))
	if err != nil {
		return err
	}

	return nil
}

func (t *TestCase) Create() (error) {

	t.Created = RequestTime()
	problemDir := GetProblemDir(t.ProblemID)
	query := "INSERT INTO tests (problem_id, strength, sample, active,created) VALUES (?,?,?,?,?)"
	id, err := DB.Insert(query, t.ProblemID, t.Strength, t.Sample, t.Active, t.Created)
	if err != nil {
		return err
	}

	defer func() {

		stringId := strconv.Itoa(int(id))
		WriteStringToFile(problemDir+"/input/input_"+stringId+".txt", t.Input)
		WriteStringToFile(problemDir+"/output/output_"+stringId+".txt", t.Output)
	}()

	t.ID = id

	return nil
}

func (t *TestCase) Update() (error) {

	t.Created = RequestTime()
	problemDir := GetProblemDir(t.ProblemID)
	query := "UPDATE tests SET strength=?, sample=?, active=?"
	_, err := DB.Update(query, t.Strength, t.Sample, t.Active)

	if err != nil {
		return err
	}

	defer func() {
		stringId := strconv.Itoa(int(t.ID))
		WriteStringToFile(problemDir+"/input/input_"+stringId+".txt", t.Input)
		WriteStringToFile(problemDir+"/output/output_"+stringId+".txt", t.Output)
	}()

	return nil
}

func TestCases(problemId int64) ([] *TestCase) {

	var items [] *TestCase

	query := "SELECT id, strength, active, sample, created FROM tests WHERE problem_id=?"

	rows, err := DB.Query(query, problemId)

	if err != nil {

		Logger(err.Error(), "mysql_query")

		return nil
	}

	var id sql.NullInt64
	var strength sql.NullInt64
	var active sql.NullBool
	var sample sql.NullBool
	var created sql.NullInt64

	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&id, &strength, &active, &sample, &created)
		if err == nil {
			t := &TestCase{ID: id.Int64, ProblemID: problemId, Strength: strength.Int64, Active: active.Bool, Sample: sample.Bool, Created: created.Int64}
			items = append(items, t)

		} else {
			Logger(err.Error(), "test_scan_error")
		}
	}

	return items
}

func GetTestCase(id int64, loadFile bool) (*TestCase) {

	var problemId sql.NullInt64
	var strength sql.NullInt64
	var active sql.NullBool
	var sample sql.NullBool
	var created sql.NullInt64

	err := DB.QueryRow("SELECT problem_id, strength, active, sample, created FROM tests WHERE id=?", id).Scan(&problemId, &strength, &active, &sample, &created)
	if err != nil {
		Logger(err.Error(), "mysql_query_get_test_case")

		return nil
	}

	t := TestCase{ID: id, ProblemID: problemId.Int64, Strength: strength.Int64, Sample: sample.Bool, Active: active.Bool, Created: created.Int64}
	if loadFile {
		// handle load input output
		input, e := GetTestCaseFile(t.ProblemID, id, true)

		if e != nil {
			Logger(e.Error(), "load_test_case_input")

		} else {
			t.Input = string(input[:])
		}

		output, e := GetTestCaseFile(t.ProblemID, id, false)
		if e != nil {
			Logger(e.Error(), "load_test_case_output")
		} else {
			t.Output = string(output[:])
		}

	}
	return &t

}

func GetTestCaseFile(problemId int64, id int64, isInput bool) ([]byte, error) {

	idString := strconv.Itoa(int(id))
	dir := GetProblemDir(problemId)

	path := dir + "/output/output_" + idString + ".txt"

	if isInput {
		path = dir + "/input/input_" + idString + ".txt"
	}

	inputFile, err := os.Open(path)

	defer inputFile.Close()

	if err != nil {
		return nil, err
	}

	byteValue, e := ioutil.ReadAll(inputFile)
	return byteValue, e

}

func DeleteTestCase(id int64) (error) {

	t := GetTestCase(id, false)

	deleteId, err := DB.Delete("DELETE FROM tests WHERE id=?", id)
	if err != nil {
		return err
	}

	if deleteId > 0 {
		defer func() {
			idString := strconv.Itoa(int(id))
			dir := GetProblemDir(t.ProblemID)
			os.RemoveAll(dir + "/output/output_" + idString + ".txt")
			os.RemoveAll(dir + "/input/input_" + idString + ".txt")

		}()

		return nil
	}

	return errors.New("not found")
}

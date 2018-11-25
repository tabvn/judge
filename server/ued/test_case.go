package ued

import (
	"encoding/json"
	"os"
	"io"
	"strings"
	"strconv"
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
	Strength  int64  `json:"strength"`
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
		count, _ := DB.Count("SELECT COUNT(*) FROM tests WHERE problem_id=?", t.ProblemID)
		stringId := strconv.Itoa(count)
		WriteStringToFile(problemDir+"/input/input_"+stringId+".txt", t.Input)
		WriteStringToFile(problemDir+"/output/output_"+stringId+".txt", t.Output)
	}()

	t.ID = id

	return nil
}

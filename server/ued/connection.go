package ued

import "encoding/json"

func UnmarshalConnection(data []byte) (Connection, error) {
	var r Connection
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Connection) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Connection struct {
	ID      string `json:"id"`
	Sid     string `json:"sid"`
	UserID  int64  `json:"user_id"`
	Created int64  `json:"created"`
}

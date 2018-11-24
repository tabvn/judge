package ued

import (
	"encoding/json"
	"time"
	"github.com/satori/go.uuid"
)

func UnmarshalToken(data []byte) (Token, error) {
	var r Token
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Token) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Token struct {
	ID      int64  `json:"id"`
	UserID  int64  `json:"user_id"`
	Token   string `json:"token"`
	Created int64  `json:"created,omitempty"`
	Expired int64  `json:"expired"`
	Role    string `json:"role"`
}

func GetToken(s string) (*Token) {

	var token Token

	err := DB.QueryRow("SELECT id, user_id, token, created, expired FROM tokens WHERE token=?", s).Scan(&token.ID, &token.UserID, &token.Token, &token.Created, &token.Expired)

	if err != nil {

		return nil
	}
	return &token
}

func CreateToken(userId int64) (*Token) {

	created := time.Now().Unix()
	expired := created + (24 * 3600) // 1 day
	token := Token{UserID: userId, Created: created, Expired: expired, Token: uuid.Must(uuid.NewV4()).String()}

	query := "INSERT INTO tokens (user_id, token, expired, created) VALUES (?,?,?,?)"
	id, err := DB.Insert(query, token.UserID, token.Token, token.Expired, token.Created)
	if err != nil {
		return nil
	}
	token.ID = id
	token.Role = GetUserRole(userId)
	return &token
}

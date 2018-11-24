package ued

import (
	"encoding/json"
	"database/sql"
	"errors"
)

func (r *Login) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Username string `json:"username"`
}

func (l *Login) Auth() (*Token, error) {

	var password sql.NullString
	var userId sql.NullInt64

	if l.Email != "" {

		err := DB.QueryRow("SELECT password, id FROM users WHERE email=?", l.Email).Scan(&password, &userId)

		if err != nil {
			return nil, errors.New("user not found")
		}

		if !CheckPasswordHash(l.Password, password.String) {
			return nil, errors.New("password does not match")
		}

		return CreateToken(userId.Int64), err
	} else {
		err := DB.QueryRow("SELECT password, id FROM users WHERE username=?", l.Username).Scan(&password, &userId)

		if err != nil {
			return nil, errors.New("user not found")
		}
		if !CheckPasswordHash(l.Password, password.String) {
			return nil, errors.New("password does not match")
		}

		return CreateToken(userId.Int64), err
	}

}

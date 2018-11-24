package ued

import (
	"encoding/json"
	"time"
	"database/sql"
	"strings"
)

func UnmarshalUser(data []byte) (User, error) {
	var r User
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *User) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type User struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	Class    string `json:"class"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
	Created  int64  `json:"created"`
}

func (user *User) Create() (error) {
	currentTime := time.Now()
	user.Email = strings.TrimSpace(user.Email)
	user.Username = strings.TrimSpace(user.Username)
	user.Created = currentTime.Unix()
	password, e := HashPassword(user.Password)
	if e != nil {
		return e
	}
	user.Password = ""
	query := "INSERT INTO users (name, class, email, username, password, created) VALUES(?, ?, ? , ? , ?, ?)"
	id, err := DB.Insert(query, user.Name, user.Class, user.Email, user.Username, password, user.Created)
	user.ID = id
	return err
}

func (user *User) Save() (error) {

	user.Email = strings.TrimSpace(user.Email)
	user.Username = strings.TrimSpace(user.Username)

	if user.Password != "" {

		query := "UPDATE users SET name=?, class=?, email =?, username=?, password=? WHERE id=?"
		password, e := HashPassword(user.Password)
		if e != nil {
			return e
		}
		_, err := DB.Update(query, user.Name, user.Class, user.Email, user.Username, password, user.ID)
		return err
	}

	query := "UPDATE users SET name=?, class=?, email =?, username=? WHERE id=?"
	_, err := DB.Update(query, user.Name, user.Class, user.Email, user.Username, user.ID)
	return err

}

func GetUserRole(userId int64) (string) {

	var role sql.NullString
	err := DB.QueryRow("SELECT name FROM user_role as user_role INNER JOIN roles as role on role.id = user_role.role_id WHERE user_id=?", userId).Scan(&role)
	if err != nil {
		return ""
	}

	return role.String
}

func GetUser(userId int64) (*User) {
	var user User

	err := DB.QueryRow("SELECT id, name, username, email, class, created FROM users WHERE id=?", userId).Scan(&user.ID, &user.Name, &user.Username, &user.Email, &user.Class, &user.Created)
	if err != nil {
		return nil
	}

	return &user
}

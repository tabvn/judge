package ued

import (
	"errors"
)

type LogoutData struct {
	Token string `json:"token"`
}
type LogoutResponse struct {
	Success bool `json:"success"`
}

func (l *LogoutData) logout() (error) {
	id, err := DB.Delete("DELETE FROM tokens where token=?", l.Token)
	if err != nil {
		return err
	}
	if id == 0 {
		return errors.New("access denied")
	}

	return err
}

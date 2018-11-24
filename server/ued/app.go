package ued

type AppData struct {
	Me   *User  `json:"me"`
	Role string `json:"role"`
}

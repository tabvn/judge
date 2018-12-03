package ued

type Filter struct {
	Search string `json:"search"`
	Limit  int64  `json:"limit"`
	Offset int64  `json:"offset"`
}

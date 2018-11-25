package ued

import "encoding/json"

func UnmarshalConfiguration(data []byte) (Configuration, error) {
	var r Configuration
	err := json.Unmarshal(data, &r)
	return r, err
}

func (r *Configuration) Marshal() ([]byte, error) {
	return json.Marshal(r)
}

type Configuration struct {
	Port               int64  `json:"port"`
	FileUploadDir      string `json:"file_upload_dir"`
	DatabaseConnectURL string `json:"database_connect_url"`
}

var Config Configuration

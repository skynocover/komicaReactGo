package config

import (
	"github.com/BurntSushi/toml"
)

var Config struct {
	Database struct {
		Host     string `toml:"host"`
		Port     string `toml:"port"`
		Name     string `toml:"name"`
		User     string `toml:"user"`
		Password string `toml:"password"`
	} `toml:"database"`
	Server struct {
		Listen string
	} `toml:"server"`
}

func InitConfig() {
	filePath := "./setting.toml"
	if _, err := toml.DecodeFile(filePath, &Config); err != nil {
		panic(err)
	}
}

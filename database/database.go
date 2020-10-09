package database

import (
	"database/sql"
	"fmt"
	"komicaRG/config"

	_ "github.com/go-sql-driver/mysql"
)

// DB the global database
var DB *sql.DB

// DBconn for global
func DBconn() (err error) {
	mysql := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", config.Config.Database.User, config.Config.Database.Password, config.Config.Database.Host, config.Config.Database.Port, config.Config.Database.Name)
	DB, err = sql.Open("mysql",
		mysql)
	// DB.SetMaxpenConns(50)
	// DB.SetMaxIdleConns(50)
	return
}

// Thread 討論串
type Thread struct {
	ID       string `json:"id"`
	PosterID string `json:"poster_id"`
	Title    string `json:"title"`
	Name     string `json:"name"`
	Content  string `json:"content"`
	Image    string `json:"image" db:"imageurl"`
	WithImg  bool   `json:"with_img" db:"withimg"`
	Time  string  `json:"time"`
	Reply []Reply `json:"reply"`
}

// Reply 討論串回應
type Reply struct {
	Name       string `json:"name"`
	PosterID   string `json:"poster_id"`
	Image      string `json:"image"`
	Time       string `json:"time"`
	ID         string `json:"id"`
	Content    string `json:"content"`
	Sage       bool   `json"sage"`
	WithImg    bool   `json:"with_img" db:"withimg"`
	ParentPost string `json:"parent_post"`
}

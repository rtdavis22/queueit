package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Database struct {
	conn *gorm.DB
}

func NewDatabase() (*Database, error) {
	conn, err := gorm.Open(mysql.Open("root:password@tcp(127.0.0.1:3306)/"))
	if err != nil {
		return nil, err
	}
	return &Database{
		conn: conn,
	}, nil
}

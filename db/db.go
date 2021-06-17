package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Database struct {
	conn *gorm.DB
}

func NewDatabase() (*Database, error) {
	conn, err := gorm.Open(mysql.Open("root:password@tcp(127.0.0.1:3306)/queueit"))
	if err != nil {
		return nil, err
	}

	db := &Database{
		conn: conn,
	}
	db.Init()
	return db, nil
}

func (d *Database) Init() {
	initFns := []func(){
		d.InitQueueConfigTable,
	}

	for _, fn := range initFns {
		fn()
	}
}

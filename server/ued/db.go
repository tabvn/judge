package ued

import (
	_ "github.com/go-sql-driver/mysql"
	"database/sql"
	"fmt"
)

type Database struct {
	conn *sql.DB
}

var DB = &Database{
}

type RowScanner interface {
	Scan(dest ...interface{}) error
}


func newDatabase(url string) (*Database, error) {

	conn, err := sql.Open("mysql", url)

	if err != nil {
		return nil, err
	}

	if err := conn.Ping(); err != nil {
		conn.Close()
		return nil, err
	}

	db := &Database{
		conn: conn,
	}

	DB = db
	return db, err
}

func InitDatabase(url string) (*Database, error) {

	DB, err := newDatabase(url)

	if err != nil {
		return nil, err
	}

	return DB, err
}

func (db *Database) List(query string, args ...interface{}) (*sql.Rows, error) {

	rows, err := DB.conn.Query(query, args...)
	return rows, err

}

func (db *Database) Query(query string, args interface{}) (*sql.Rows, error) {
	return DB.conn.Query(query, args)
}
func (db *Database) QueryRow(query string, args ...interface{}) (*sql.Row) {

	return DB.conn.QueryRow(query, args...)
}

func (db *Database) Insert(query string, args ...interface{}) (int64, error) {

	r, err := DB.conn.Exec(query, args...)

	if err != nil {
		return 0, fmt.Errorf("%v", err)
	}
	rowsAffected, err := r.RowsAffected()

	if err != nil {
		return 0, fmt.Errorf("could not get rows affected: %v", err)
	} else if rowsAffected != 1 {
		return 0, fmt.Errorf("expected 1 row affected, got %d", rowsAffected)
	}

	lastInsertID, err := r.LastInsertId()

	if err != nil {
		return 0, fmt.Errorf("mysql: could not get last insert ID: %v", err)
	}
	return lastInsertID, nil

}

func (db *Database) Update(query string, args ...interface{}) (int64, error) {
	r, err := DB.conn.Exec(query, args...)

	if err != nil {
		return 0, fmt.Errorf("%v", err)
	}
	rowsAffected, err := r.RowsAffected()
	return rowsAffected, err

}

func (db *Database) Count(query string, args ...interface{}) (int, error) {

	var count int

	row := DB.conn.QueryRow(query, args...)

	err := row.Scan(&count)

	if err != nil {
		return 0, err
	}

	return count, nil
}

func (db *Database) Delete(query string, args ...interface{}) (int64, error) {

	r, err := DB.conn.Exec(query, args...)

	if err != nil {
		return 0, fmt.Errorf("could not execute statement: %v", err)
	}
	return r.RowsAffected()

}

func (db *Database) Close() {
	DB.conn.Close()
}

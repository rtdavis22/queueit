package db

import (
	"testing"
)

func TestNewDatabase(t *testing.T) {
	_, err := NewDatabase()
	if err != nil {
		t.Errorf("%v", err)
	}
}

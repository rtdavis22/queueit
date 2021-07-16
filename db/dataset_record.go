package db

import (
	"encoding/json"
)

type DatasetRecord struct {
	ID   string
	Data string
}

func (d *Database) InitDatasetRecordTable() {
	d.conn.AutoMigrate(&DatasetRecord{})
}

func (d *Database) CreateDatasetRecord(datasetID string, data map[string]string) error {
	json, err := json.Marshal(data)
	if err != nil {
		return nil
	}

	record := &DatasetRecord{
		ID:   datasetID,
		Data: string(json),
	}
	return d.conn.Create(record).Error
}

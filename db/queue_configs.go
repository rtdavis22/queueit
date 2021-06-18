package db

import (
	"github.com/rtdavis22/queueit/gen/idl"
)

type QueueConfig struct {
	ID     uint64
	Domain string `gorm:"index"`
	Name   string
}

func (d *Database) InitQueueConfigTable() {
	d.conn.AutoMigrate(&QueueConfig{})
}

func (d *Database) CreateQueue(domain string, name string) error {
	config := &QueueConfig{
		Domain: domain,
		Name:   name,
	}
	if err := d.conn.Create(config).Error; err != nil {
		return err
	}
	return nil
}

func (d *Database) GetQueueConfigsByDomain(domain string) ([]*idl.QueueConfig, error) {
	var queueConfigs []QueueConfig
	if err := d.conn.Where("domain = ?", domain).Find(&queueConfigs).Error; err != nil {
		return nil, err
	}

	var configs []*idl.QueueConfig
	for _, config := range queueConfigs {
		configs = append(configs, &idl.QueueConfig{
			Id:   config.ID,
			Name: config.Name,
		})
	}
	return configs, nil
}

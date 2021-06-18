package db

import (
	"github.com/rtdavis22/queueit/gen/idl"
)

type TweetQueueItem struct {
	ID       uint64
	QueueID  uint64
	TweetUrl string
}

func (d *Database) InitTweetQueueItemTable() {
	d.conn.AutoMigrate(&TweetQueueItem{})
}

func (d *Database) CreateTweetQueueItem(queueID uint64, tweetUrl string) error {
	item := &TweetQueueItem{
		QueueID:  queueID,
		TweetUrl: tweetUrl,
	}
	return d.conn.Create(item).Error
}

func (d *Database) GetTweetQueueItems(queueID uint64) ([]*idl.TweetQueueItem, error) {
	var tweetQueueItems []TweetQueueItem
	if err := d.conn.Where("queue_id = ?", queueID).Find(&tweetQueueItems).Error; err != nil {
		return nil, err
	}

	var items []*idl.TweetQueueItem
	for _, item := range tweetQueueItems {
		items = append(items, &idl.TweetQueueItem{
			Id:       item.ID,
			TweetUrl: item.TweetUrl,
		})
	}
	return items, nil
}

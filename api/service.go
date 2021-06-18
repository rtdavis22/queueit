package api

import (
	"context"
	"fmt"

	"github.com/rtdavis22/queueit/db"
	"github.com/rtdavis22/queueit/gen/idl"
)

func NewService(db *db.Database) *service {
	return &service{
		db: db,
	}
}

type service struct {
	idl.UnimplementedQueueItServer
	db *db.Database
}

func (s *service) GetQueueConfigs(
	ctx context.Context,
	request *idl.GetQueueConfigsRequest,
) (*idl.GetQueueConfigsResponse, error) {
	fmt.Println("GetQueueConfigs")

	queueConfigs, err := s.db.GetQueueConfigsByDomain(request.GetDomain())
	if err != nil {
		return nil, err
	}

	return &idl.GetQueueConfigsResponse{
		Configs: queueConfigs,
	}, nil
}

func (s *service) CreateTweetQueueItem(
	ctx context.Context,
	request *idl.CreateTweetQueueItemRequest,
) (*idl.CreateTweetQueueItemResponse, error) {
	fmt.Println("CreateTweetQueueItem")

	err := s.db.CreateTweetQueueItem(request.GetQueueId(), request.GetTweetUrl())
	if err != nil {
		return nil, err
	}

	return &idl.CreateTweetQueueItemResponse{}, nil
}

func (s *service) GetTweetQueueItems(
	ctx context.Context,
	request *idl.GetTweetQueueItemsRequest,
) (*idl.GetTweetQueueItemsResponse, error) {
	fmt.Println("GetTweetQueueItems")

	items, err := s.db.GetTweetQueueItems(request.GetQueueId())
	if err != nil {
		return nil, err
	}

	return &idl.GetTweetQueueItemsResponse{
		Items: items,
	}, nil
}

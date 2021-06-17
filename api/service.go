package api

import (
	"context"

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
	in *idl.QueueConfigRequest,
) (*idl.QueueConfigResponse, error) {
	return &idl.QueueConfigResponse{}, nil
}

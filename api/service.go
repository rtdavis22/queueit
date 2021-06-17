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
	request *idl.QueueConfigRequest,
) (*idl.QueueConfigResponse, error) {
	queueConfigs, err := s.db.GetQueueConfigsByDomain(request.GetDomain())
	if err != nil {
		return nil, err
	}

	return &idl.QueueConfigResponse{
		Configs: queueConfigs,
	}, nil
}

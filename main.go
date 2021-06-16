package main

import (
	"context"
	"log"
	"net"

	"github.com/rtdavis22/queueit/gen/idl"
	"google.golang.org/grpc"
)

const (
	port = ":9090"
)

type server struct {
	idl.UnimplementedQueueItServer
}

func (s *server) GetQueueConfigs(ctx context.Context, in *idl.QueueConfigRequest) (*idl.QueueConfigResponse, error) {
	return &idl.QueueConfigResponse{}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	idl.RegisterQueueItServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

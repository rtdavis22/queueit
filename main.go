package main

import (
	"context"
	"log"
	"net"

	"github.com/rtdavis22/queueit/gen/idl"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

type server struct {
	idl.UnimplementedEchoServer
}

func (s *server) Echo(ctx context.Context, in *idl.EchoRequest) (*idl.EchoResponse, error) {
	log.Printf("Received: %v", in.GetMessage())
	return &idl.EchoResponse{Message: "Hello " + in.GetMessage()}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	idl.RegisterEchoServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

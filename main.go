package main

import (
	"log"
	"net"

	"google.golang.org/grpc"

	"github.com/rtdavis22/queueit/api"
	"github.com/rtdavis22/queueit/db"
	"github.com/rtdavis22/queueit/gen/idl"
)

const (
	port = ":9090"
)

func main() {
	db, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("failed to create db: %v", err)
	}

	listener, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	server := grpc.NewServer()
	idl.RegisterQueueItServer(server, api.NewService(db))
	if err := server.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

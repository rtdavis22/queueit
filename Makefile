.PHONY: idl

run:
	go run main.go

test:
	go test ./...

lint:
	staticcheck ./...

idl: idl/queueit.proto
	protoc \
	  --go_out=gen \
	  --go_opt=paths=source_relative \
	  --go-grpc_out=gen \
	  --go-grpc_opt=paths=source_relative \
	  --js_out=import_style=commonjs:ui/src/gen \
	  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:ui/src/gen \
	  idl/queueit.proto

idl-clean:
	rm -rf gen/idl ui/src/gen/idl

devenv-up:
	docker-compose -f dev/docker-compose.yaml up -d

devenv-down:
	docker-compose -f dev/docker-compose.yaml down

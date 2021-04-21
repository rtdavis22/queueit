.PHONY: idl

run:
	go run main.go

idl: idl/echo.proto
	protoc --go_out=gen --go_opt=paths=source_relative --go-grpc_out=gen --go-grpc_opt=paths=source_relative --js_out=import_style=commonjs:ui/src/gen --grpc-web_out=import_style=commonjs,mode=grpcwebtext:ui/src/gen idl/echo.proto

idl-clean:
	rm -rf gen/idl ui/src/gen/idl

# use docker-compose?
envoy:
	 docker run -d -v "$(shell pwd)"/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.17.0

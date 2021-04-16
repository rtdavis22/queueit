.PHONY: idl

run:
	go run main.go

idl: idl/echo.proto
	protoc --go_out=gen --go_opt=paths=source_relative --go-grpc_out=gen --go-grpc_opt=paths=source_relative --js_out=import_style=commonjs:ui/src/gen idl/echo.proto

idl-clean:
	rm -rf gen/idl ui/src/gen/idl

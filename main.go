package main

import (
	"embed"
	"log"
	"runtime/pprof"

	"github.com/gofiber/fiber/v2"
)

var FS embed.FS

func main() {
	app := fiber.New()

	app.Static("/", "./nextjs/out")

	app.Get("/api", func(c *fiber.Ctx) error {
		profile := pprof.Lookup("allocs")
		return profile.WriteTo(c, 1)
	})
	

	log.Println("Starting HTTP server at port 8080")
	log.Fatal(app.Listen(":8080"))
}
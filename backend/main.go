package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/docker/docker/client"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Response struct {
	Message string `json:"message"`
}

type Container struct {
	ID      string   `json:"id"`
	Name    string   `json:"name"`
	Image   string   `json:"image"`
	Status  string   `json:"status"`
	Command string   `json:"command"`
	Ports   []string `json:"ports"`
}

var dockerClient *client.Client

func init() {
	var err error
	dockerClient, err = client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Printf("Warning: Could not connect to Docker: %v", err)
	}
}

func main() {
	r := mux.NewRouter()

	// Routes
	r.HandleFunc("/api/health", healthCheckHandler).Methods("GET")
	r.HandleFunc("/api/containers", getContainersHandler).Methods("GET")

	// CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	})

	// Start server
	handler := c.Handler(r)
	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	response := Response{Message: "Backend is healthy"}
	json.NewEncoder(w).Encode(response)
}

func getContainersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if dockerClient == nil {
		json.NewEncoder(w).Encode([]Container{})
		return
	}

	containers, err := dockerClient.ContainerList(context.Background(), client.ContainerListOptions{})
	if err != nil {
		log.Printf("Error listing containers: %v", err)
		http.Error(w, "Failed to list containers", http.StatusInternalServerError)
		return
	}

	var result []Container
	for _, c := range containers {
		var ports []string
		for _, p := range c.Ports {
			ports = append(ports, p.String())
		}

		result = append(result, Container{
			ID:      c.ID[:12],
			Name:    c.Names[0],
			Image:   c.Image,
			Status:  c.Status,
			Command: c.Command,
			Ports:   ports,
		})
	}

	json.NewEncoder(w).Encode(result)
}
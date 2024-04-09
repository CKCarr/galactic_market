# Description: Makefile for the docker-compose package
# This Makefile is used to manage Docker Compose services for development and testing.
# This Makefile is used to
# build, start, run, exec, stop, clean, and deep-clean the Docker Compose services.
# Created by: CKCarr
# Created on: 04/05/2024

##############################################################################
# Color definitions
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

##############################################################################
# Default action if no target is specified
.DEFAULT_GOAL := up

.PHONY: build up status run it-backend it-frontend exec stop config clean deep-clean

##############################################################################

log:
	@echo "`date +'%Y-%m-%d %H:%M:%S'` - Running command" | tee -a make.log

##############################################################################

# Display the status of Docker Compose services
status: log
	@echo "${YELLOW}Checking the status of Docker Compose services...${NC}"
	@docker-compose ps

##############################################################################

# Build the Docker Compose images
build: log
	@echo "${GREEN}Building the Docker Compose services...${NC}"
	@docker-compose build || { echo "${RED}Build failed${NC}"; exit 1; }

# Start Docker Compose services
up: build
	@echo "${GREEN}Starting the Docker Compose services in detached mode...${NC}"
	@docker-compose up -d >> make.log 2>&1 || { echo "${RED}Start failed${NC}"; exit 1; }

##############################################################################

# Run the Docker Compose services in interactive mode
run: down build
	@echo "${GREEN}Running the Docker Compose services in detached mode...${NC}"
	@docker-compose up -d >> make.log 2>&1 || { echo "${RED}Run failed${NC}"; exit 1; }

##############################################################################
# Define default values for service and cmd
service ?= galactic_destinations_backend_1
cmd ?= /bin/bash

# Define container names and commands for backend and frontend
backend_container_name ?= galactic_destinations_backend_1

frontend_container_name ?= galactic_destinations_frontend_1

it-backend:
	@echo "${YELLOW}Executing command - starting interactive backend terminal...${NC}"
	@docker exec -it ${backend_container_name} ${cmd} >> make.log 2>&1 || { echo "${RED}Command execution failed${NC}"; exit 1; }
	@echo "${GREEN}Backend terminal session started successfully.${NC}"

it-frontend:
	@echo "${YELLOW}Executing command - starting interactive frontend terminal...${NC}"
	@docker exec -it ${frontend_container_name} ${cmd} >> make.log 2>&1 || { echo "${RED}Command execution failed${NC}"; exit 1; }
	@echo "${GREEN}Frontend terminal session started successfully.${NC}"

exec:
	@echo "${YELLOW}Executing command in the Docker Compose service...${NC}"
	@docker exec -it ${service} ${cmd} >> make.log 2>&1 || { echo "${RED}Command execution failed${NC}"; exit 1; }
	@echo "${GREEN}Command executed successfully.${NC}"

##############################################################################

# Stop Docker Compose services SIGTERM and then SIGKILL after a grace period
stop: log
	@echo "${RED}Stopping the Docker Compose services...${NC}"
	@docker-compose stop >> make.log 2>&1 || { echo "${RED}Stop failed${NC}"; exit 1; }

# Stop Docker Compose services and remove containers and networks created by up
down:
	@echo "${RED}Stopping the Docker Compose services...${NC}"
	@docker-compose down >> make.log 2>&1 || { echo "${RED}Stop failed${NC}"; exit 1; }

##############################################################################

# Remove Docker Compose containers and images removes containers, networks, and images created by up but not volumes, 
clean: log
	@echo "${RED}Cleaning up Docker Compose services...${NC}"
	@docker-compose down --rmi all --volumes >> make.log 2>&1 || { echo "${RED}Clean failed${NC}"; exit 1; }

# Remove Docker Compose containers, images, and volumes (deep clean)
deep-clean: log
	@echo "${RED}Deep cleaning Docker Compose services, including volumes...${NC}"
	@docker-compose down --rmi all -v >> make.log 2>&1 || { echo "${RED}Deep clean failed${NC}"; exit 1; }

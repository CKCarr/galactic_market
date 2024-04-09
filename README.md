# galactic_destinations

## Project Overview: Galactic Enterprise Cruises API

### Introduction

"Galactic Enterprise Cruises" is a futuristic space tourism API designed to offer tiered travel packages to various galactic destinations. This API serves as a gateway to explore the universe, offering tailored travel experiences for different classes of space adventurers. Whether it's a budget-friendly journey to nearby stars or a luxurious voyage to distant galaxies, our API connects users with the wonders of space travel.

### Project Structure

The project is divided into two main components:

- Backend:

    Built with Node.js, Express, MySQL, Redis, and Swagger, the backend serves as the core of our application, managing data related to travel packages, bookings, and user interactions.

- Frontend:

    Developed using Astro, the front end provides an interactive user interface where customers can browse travel packages, make bookings, and experience the allure of space tourism.

### Features

- Tiered Travel Packages:

    Offers travel options to six different galactic destinations, with access varying by travel class – mainstream, premium, and luxury.

- Astro Frontend:

    A sleek, modern web interface that allows users to explore and book travel packages, providing a seamless user experience.

- Docker Integration:

    Ensures easy setup and deployment, encapsulating the application environment for consistent performance across different systems.

### Technical Stack

- Backend: Node.js, Express, MySQL, Redis, Swagger
- Frontend: Astro
- Containerization: Docker with Docker-Compose

### Installation and Setup

Detailed setup instructions are provided to get the application running locally using Docker, facilitating a straightforward installation process.

## Step 1: Create Environmental Variable files for Backend Environment

___
env/ folder -- with environment variables
env/.env.app and env/.env.db

username, password, and database name will be identical in each file
___

### Node Application Environment Variables (.env.app)

| Variable | Value                   |
|----------|-------------------------|
| HOST     | "0.0.0.0"   |
| DB_NAME  | value matches (.app .db) |
| DB_USER  | value matches (.app .db) |
| DB_PASS  | value matches (.app .db) |
| PORT     | 3000                    |

### Redis Environment Variables

| Variable   | Value  |
|------------|--------|
| REDIS_PORT | 6379   |
| REDIS_HOST | redis |
| REDIS_PASSWORD | secret value |

### MySQL Database Environment Variables (.env.db)

| Variable              | Value          |
|-----------------------|----------------|
| MYSQL_ROOT_PASSWORD   | secret value |
| MYSQL_DATABASE        | value matches (.app .db)  |
| MYSQL_USER            | value matches (.app .db)  |
| MYSQL_PASSWORD        | value matches (.app .db)  |
| MYSQL_HOST            | mysql  |
| MYSQL_PORT            | 3306   |

## Step 2: Run Docker with the following command

to run the docker-compose with makefile
use the command below

``` bash
make up # first time building and starting
make run # after changes to image or build
```

## Command to run backend terminal interactively

Connect to express API server and routes.

``` bash
docker exec -it galactic_destinations_backend_1 /bin/bash
npm run dev # this was launched on container start so it should already be available
```
the server will listen on port 0.0.0.0
to see the output of the API routes
Run the server and use 127.0.0.1:3000 in the browser

## Command to run frontend terminal interactively

Connect to express API server and routes.
run mysql and Redis

``` bash
docker exec -it galactic_destinations_frontend_1 /bin/bash
npm run dev # this was launched on container start so it should already be available
```
the server will listen on port 0.0.0.0
to see the output of the API routes
Run the server and use `127.0.0.1:4321` in the browser


## Command to log the MySQL database

Run on cli

``` bash
docker exec -it galactic_destinations_mysql_1 /bin/bash
mysql -u username -p
```

### Command to log into the Redis database

``` bash
docker exec -it galactic_destinations_redis_1 /bin/bash
redis-cli
```

## Command to run Unittest for the backend

cd into the backend folder and run the test suite

``` bash
npm run test
```

Usage
Users can interact with the API through the frontend interface or directly via API endpoints, allowing for flexible integration with other applications or services.

Purpose
This project aims to showcase the potential of modern web technologies in creating scalable and interactive applications, providing a glimpse into the future of space tourism.

### Makefile Command Documentation to run Docker-Compose

| Command         | Description                                                   |
|-----------------|---------------------------------------------------------------|
| `make` or `make up`      | Builds and starts the Docker Compose services.                |
| `make status`   | Displays the status of Docker Compose services.                |
| `make build`    | Builds the Docker Compose services.                            |
| `make run`      | Runs the Docker Compose services in interactive mode.          |
| `make it-backend` | Starts an interactive terminal in the backend service.         |
| `make it-frontend` | Starts an interactive terminal in the frontend service.       |
| `make exec`     | Executes a command in the Docker Compose service.              |
| `make stop`     | Stops the Docker Compose services.                             |
| `make clean`    | Removes Docker Compose containers and images.                   |
| `make deep-clean` | Removes Docker Compose containers, images, and volumes.       |

### Astro Frontend Application Command Documentation

| Command           | Description                                       |
|-------------------|---------------------------------------------------|
| `npm install`     | Installs dependencies for the Astro frontend.     |
| `npm run dev`     | Starts the development server for Astro.          |
| `npm run build`   | Builds the production-ready files for Astro.      |
| `npm run start`   | Starts the production server for Astro.           |
| `npm run lint`    | Runs linting checks on the Astro codebase.       |
| `npm test`        | Runs tests for the Astro frontend application.   |

### Node Backend Application Command Documentation

| Command           | Description                                       |
|-------------------|---------------------------------------------------|
| `npm install`     | Installs dependencies for the Node.js backend.    |
| `npm run dev`     | Starts the development server for the backend.   |
| `npm run start`   | Starts the production server for the backend.     |
| `npm run lint`    | Runs linting checks on the backend codebase.     |
| `npm test`        | Runs tests for the Node.js backend application.  |

### Swagger Documentation

#### View Documentation:
 - Start your Node.js server and navigate to http://localhost:3000/api-docs in your browser. You should see the Swagger UI interface with your API documentation.

## Directory File Tree

```bash

```

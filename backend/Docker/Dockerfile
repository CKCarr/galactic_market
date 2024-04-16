# Backend Dockerfile
FROM node:18

# Set noninteractive to avoid tzdata hanging
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=America/Los_Angeles

# Install essential tools and dependencies
RUN apt-get update && apt-get install -y \
    lsof \
    curl \
    wget \
    git \
    vim \
    emacs \
    locales \
    build-essential \
    gcc

# Install locales and generate en_US.UTF-8 locale
RUN locale-gen en_US.UTF-8

# Set environment variables
ENV LANGUAGE en_US:en
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Clean up APT when done
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy .env file into the container
COPY env/.env*.* env/.env*.*

# Load environment variables from .env file
ENV $(cat env/.env*.* | grep -v '#' | xargs)

WORKDIR /galactic_destinations/backend

COPY package*.json ./

RUN npm install

COPY . .

# Make the start script executable
RUN chmod +x ./start.sh

# Change ownership of the application directory
RUN useradd -m backend_test_user && \
    chown -R backend_test_user:backend_test_user /galactic_destinations/backend

# Use the non-root user to run the application
USER backend_test_user

EXPOSE 3000 9229

CMD ["./start.sh"]

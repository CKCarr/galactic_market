# Frontend Dockerfile
# Start with a base Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /galactic_destinations/frontend

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your project into the container
COPY . .

# Make your start script executable
RUN chmod +x ./start.sh

# Expose the port your frontend server uses
EXPOSE 4321

# Command to run your application
CMD ["npm", "run", "dev", "--host", "0.0.0.0"]

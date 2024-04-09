#!/bin/bash

# start.sh - frontend/start.sh

# Set a colorful PS1 prompt directly in your Dockerfile or startup script
echo 'export PS1="\[\e[92m\]\u@\h:\[\e[36m\]\w\[\e[00m\]\$ "' >> ~/.bashrc

# Apply changes without needing to re-login
source ~/.bashrc

# run the command to start the frontend
npm run dev

# Path: frontend/Dockerfile

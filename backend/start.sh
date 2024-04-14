#!/bin/bash

# start.sh - /backend/start.sh

# Set a colorful PS1 prompt directly in your Dockerfile or startup script
echo 'export PS1="\[\e[92m\]\u@\h:\[\e[36m\]\w\[\e[00m\]\$ "' >> ~/.bashrc

# Apply changes without needing to re-login
source ~/.bashrc

# Check if the command argument is provided
if [ -z "$1" ]; then
    # If no command is provided, use `tail -f /dev/null` to keep the container running
    tail -f /dev/null &
else
    # If a command is provided (e.g., when using `docker exec`, 'exec-cmd'), execute it
    exec "$@"
fi

# Run database setup script
# docker exec -i galactic_destinations_mysql_1 mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < ./backend/config/mysql/init.sql &

# Start the backend with inspect mode
npm run dev

# Path: backend/Dockerfile

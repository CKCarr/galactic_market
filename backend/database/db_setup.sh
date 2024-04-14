#!/bin/bash
# db_setup.sh - /backend/database/db_setup.sh

# Load MySQL environment variables from the specified .env file
set -a  # automatically export all variables
source ./env/.env.redis
source ./env/.env.app
source ./env/.env.db
set +a

# Execute SQL commands to create database and configure privileges
mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD -e "
CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE;
GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'%';
FLUSH PRIVILEGES;
"

# Function to run SQL files with MySQL
run_sql_file() {
    local file_path=$1
    echo "Executing SQL file: $file_path"
    mysql -h $MYSQL_HOST -P $MYSQL_PORT -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE < $file_path
    if [ $? -eq 0 ]; then
        echo "SQL file executed successfully: $file_path"
    else
        echo "Error executing SQL file: $file_path"
        exit 1  # Exit the script if an error occurs
    fi
}

run_sql_file ./config/mysql/init.sql

node CSV_to_SQL.js

echo "Database setup completed successfully."

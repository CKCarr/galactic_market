#!/bin/bash

# Load environment variables from the .env file
set -o allexport
source /env/.env.app
set +o allexport

# Function to run SQL files
run_sql_file() {
    local file_path=$1
    echo "Executing SQL file: $file_path"
    psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -f $file_path
    if [ $? -eq 0 ]; then
        echo "SQL file executed successfully: $file_path"
    else
        echo "Error executing SQL file: $file_path"
        exit 1  # Exit the script if an error occurs
    fi
}

# Run jop_schema.sql to create tables
run_sql_file "./database/galactic_market_schema.sql"

echo "Tables created successfully."

# If tables are already created

echo "All SQL files executed successfully."

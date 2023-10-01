# Dockerized React App
A basic dockerized react app that has register, login, and logout functionality. Uses express for the server, PostgresSQL for the database, and nginx as a proxy server.

## Startup  
  * Set up all you session variables in the docker compose folder located in the root directory.
  * Run "docker compose up --build" to build all the containers.
  * If everything works you will be able to access the client at "localhost:3050" and the database portal at "localhost:8000"

## Functionality
  * Basic register, login, and logout functionality. Uses session variable, not sure if it is fully implemented.
  * Basic routing using react router between different pages
  * Google maps api used to display a map

# SWAPI Planets API

A simple RESTful API for managing Star Wars planets data, built with Node.js, Express, and MongoDB.

## Description

This application retrieves planet data from the SWAPI (Star Wars API), stores it in a local MongoDB database, and provides a RESTful API for CRUD operations on this data.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure
```
swapi-planets-api/
├── app.js                 # Express application configuration
├── server.js              # Entry point to start the server
├── models/
│   └── planet.js          # Mongoose model for planets
├── controllers/
│   └── planet.js          # Business logic for planet management
└── routes/
    └── planets.js         # API route definitions
```
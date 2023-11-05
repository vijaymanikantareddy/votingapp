# votingapp

Voting Application for Project Expo

## Description

This is a web application built with the MERN (MongoDB, Express, React, Node.js) stack. It's designed to facilitate voting for projects in a Project Expo or similar event. Users can create events, submit projects, and vote for their favorite projects.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- User authentication and Voting
- Project submission and management
- Voting system
- Real-time updates and download the voter list
- Admin features for managing events and projects
- Responsive design

## Screenshots

![Screenshot (410)](https://github.com/vijaymanikantareddy/votingapp/assets/83952736/c76c2dba-8d1e-42de-b091-2337987cbd53)
![Screenshot (412)](https://github.com/vijaymanikantareddy/votingapp/assets/83952736/8e3154ab-5c6a-4785-ba9d-1f1431be46a2)
![Screenshot (411)](https://github.com/vijaymanikantareddy/votingapp/assets/83952736/fc195410-ae05-40e2-8e63-8e4f84b715c5)
![Screenshot (414)](https://github.com/vijaymanikantareddy/votingapp/assets/83952736/98956ce2-98c9-4f62-a9a2-0e87d6d91fe7)
![Screenshot (413)](https://github.com/vijaymanikantareddy/votingapp/assets/83952736/0ee8cbe5-3ab2-4cfa-a92f-fa84bc9c8046)
![Screenshot (415)](https://github.com/vijaymanikantareddy/votingapp/assets/83952736/55bcb55e-49bf-4f9e-9d50-dcd1e4d04668)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:


2. Navigate to the project folder:

cd votingapp


3. Install dependencies for the client and server:

cd client
npm install
cd ../server
npm install



4. Configure environment variables:

Create a `.env` file in the `server` folder and add your MongoDB URI and other necessary environment variables.

5. Start the client and server:

In the `client` folder:

npm start


In the `server` folder:

npm start


6. Your application should now be running. Visit `http://localhost:3000` in your browser to access the client and `http://localhost:5000` for the server.

## Usage

**User:**

1. Authenticate with your email to access the application.
2. Select your favorite team or project to vote for.
3. Confirm your vote.

**Admin:**

1. Log in as an admin with appropriate credentials.
2. Add new projects to the portal for users to vote on.
3. View the list of voters who have cast their votes for each project.


## Technologies Used

- MongoDB
- Express.js
- React
- Node.js




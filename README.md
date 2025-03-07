# Smart Parking Lot System
Overview
The Smart Parking Lot System is a backend service designed to manage vehicle entry and exit, allocate parking spots, and calculate parking fees in real time. It supports multiple vehicle types (motorcycles, cars, buses) and handles concurrency for an efficient parking management experience.

# Features
 Vehicle Entry and Exit Management
 Real-Time Parking Spot Allocation
 Parking Fee Calculation (based on duration and vehicle type)
 Real-Time Availability Update
 Scalable MongoDB Database Design

# Installation and Setup

Clone the Repository git clone https://github.com/yourusername/smart-parking-system.git
cd smart-parking-system

Install Dependencies

npm install
Start MongoDB (Make sure MongoDB is running locally or use a cloud instance)

Set Up Environment Variables
Create a .env file in the root directory and add:

env

MONGO_URI=mongodb://localhost:27017/smart-parking-lot
PORT=3000
Run the Server

npm start
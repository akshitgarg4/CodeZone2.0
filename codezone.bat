@echo off
title CODEZONE2.0
echo Starting MongoDB
net start mongoDB
echo Starting frontend Server
cd frontend
start npm start
cd ..
cd backend
echo Starting backend Server
nodemon index.js
pause
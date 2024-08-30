#!/bin/bash
docker build -t mysql2-db ./;
docker run -d -p 23306:3306 --name mysql2-db mysql2-db;

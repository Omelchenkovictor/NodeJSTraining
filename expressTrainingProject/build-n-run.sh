#!/bin/bash
docker build -t mysql-db ./;
docker run -d -p 13306:3306 --name mysql-db mysql-db;

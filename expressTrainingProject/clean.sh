#!/bin/bash
docker stop mysql-db;
docker rm mysql-db;
docker rmi mysql-db:latest;
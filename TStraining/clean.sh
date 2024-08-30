#!/bin/bash
docker stop mysql2-db;
docker rm mysql2-db;
docker rmi mysql2-db:latest;
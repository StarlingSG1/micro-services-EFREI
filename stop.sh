#!/bin/sh

# Stop processes running on ports 5001, 4001, and 3001
lsof -ti :5001 | xargs kill
lsof -ti :4001 | xargs kill
lsof -ti :3001 | xargs kill

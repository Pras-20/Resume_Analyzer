#!/bin/bash

echo "==== Starting Full Project Setup ===="

# FRONTEND SETUP
echo
echo "==== Installing Frontend Dependencies ===="
cd frontend
npm install || { echo "Frontend install failed"; exit 1; }

cd ..

# BACKEND SETUP
echo
echo "==== Setting up Python Virtual Environment ===="
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate

echo
echo "==== Installing Backend Dependencies ===="
pip install -r requirements.txt || { echo "Backend install failed"; exit 1; }

echo
echo "==== Setup Complete ===="

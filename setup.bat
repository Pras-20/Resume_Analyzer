@echo off
echo ==== Starting Full Project Setup ====

REM FRONTEND SETUP
echo.
echo ==== Installing Frontend Dependencies ====
cd frontend
call npm install

cd ..

REM BACKEND SETUP
echo.
echo ==== Setting up Python Virtual Environment ====
cd backend

IF NOT EXIST "venv" (
    python -m venv venv
)

call venv\Scripts\activate.bat

echo.
echo ==== Installing Backend Dependencies ====
pip install -r requirements.txt

echo.
echo ==== Setup Complete ====
pause

Write-Host "==== Starting Full Project Setup ===="

# FRONTEND SETUP
Write-Host "`n==== Installing Frontend Dependencies ===="
Set-Location ./frontend
npm install

Set-Location ..

# BACKEND SETUP
Write-Host "`n==== Setting up Python Virtual Environment ===="
Set-Location ./backend

if (!(Test-Path "venv")) {
    python -m venv venv
}

# Activate and install dependencies
& .\venv\Scripts\Activate.ps1
pip install -r requirements.txt

Write-Host "`n==== Setup Complete ===="
Pause

# TFT Assistant

A web-based assistant for Teamfight Tactics (TFT) that helps you build optimal team compositions and item builds.

## Features

- Browse TFT champions with images and descriptions
- Calculate team synergies
- Get recommended items based on team composition
- Modern, responsive interface using Material-UI

## Setup

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r backend/requirements.txt
```

2. Run the backend server:
```bash
python backend/app.py
```

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
tft_assistant_web/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── data/
│       └── champions.json
└── frontend/
    ├── package.json
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        └── App.js
```

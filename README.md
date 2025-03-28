# OpenManus Web Interface

A React/TypeScript interface for the OpenManus AI agent framework.

## Overview

This project provides a web-based user interface for interacting with OpenManus, an open-source framework for building general AI agents. The interface allows users to:

- Send queries to the OpenManus agent
- View real-time tool execution
- See the results of agent actions
- Execute direct commands

## Project Structure

```
openmanus-interface/
├── public/                  # Static assets
├── src/                     # Frontend React application
│   ├── components/          # Reusable UI components
│   │   └── ui/              # Basic UI elements (Button, Card, etc.)
│   ├── context/             # React context for state management
│   ├── screens/             # UI components organized by screen
│   │   └── Frame/           # Main application frame
│   │       └── sections/    # Sections of the main frame
│   ├── services/            # API services for backend communication
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   └── styles.css           # Global styles and Tailwind imports
├── .gitignore               # Git ignore file
├── index.html               # HTML entry point
├── package.json             # NPM package configuration
├── postcss.config.js        # PostCSS configuration
├── README.md                # Project documentation
├── server.py                # Python FastAPI backend
├── start.js                 # Script to start both servers
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.ts           # Vite configuration
```

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Python 3.8+
- FastAPI and Uvicorn

## Installation

```bash
# Install dependencies
npm install

# Install Python dependencies
pip install fastapi uvicorn pydantic
```

## Usage

### Option 1: Start both servers with a single command

```bash
# Start both frontend and backend servers
npm start
```

### Option 2: Start servers separately

```bash
# Start the frontend development server
npm run frontend

# In a separate terminal, start the backend server
npm run server
```

Once the servers are running:
1. Open your browser to http://localhost:3000
2. Interact with the OpenManus agent through the chat interface
3. View tool execution and outputs in the right sidebar

## Features

- **Chat Interface**: Send natural language queries to the OpenManus agent
- **Tool Visualization**: See which tools the agent is using in real-time
- **Terminal Integration**: View and execute terminal commands
- **Browser Tool**: Watch as the agent browses the web
- **Code Execution**: See code being written and executed
- **File Management**: View and edit files

## Integration with OpenManus

This interface connects to OpenManus through a FastAPI server that:

1. Receives queries from the frontend
2. Passes them to the OpenManus agent
3. Streams back real-time updates on tool usage and execution
4. Returns the final results

## Development

To modify the UI:
- Edit components in the `src/screens` directory
- Update the context in `src/context/ConversationContext.tsx`
- Modify API services in `src/services/openManus.ts`

To modify the backend:
- Edit `server.py` to change the API endpoints or agent behavior
- In a production environment, replace the mock agent with the actual OpenManus implementation

## License

[MIT License](LICENSE)
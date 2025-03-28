const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Determine the correct command based on the OS
const isWindows = os.platform() === 'win32';
const pythonCommand = isWindows ? 'python' : 'python3';

console.log('Starting OpenManus Web Interface...');

// Start the backend server
console.log('\n🚀 Starting Python FastAPI backend server...');
const backendProcess = spawn(pythonCommand, ['server.py'], {
  stdio: 'inherit',
  shell: true
});

backendProcess.on('error', (error) => {
  console.error(`Failed to start backend server: ${error.message}`);
});

// Start the frontend development server
console.log('\n🚀 Starting frontend development server...');
const frontendProcess = spawn(isWindows ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

frontendProcess.on('error', (error) => {
  console.error(`Failed to start frontend server: ${error.message}`);
});

// Handle process termination
const cleanup = () => {
  console.log('\n🛑 Shutting down servers...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
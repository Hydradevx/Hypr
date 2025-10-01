const { spawn } = require('child_process');
const path = require('path');

// Use system electron
spawn('electron', [path.join(__dirname, '.')], { 
  stdio: 'inherit',
  shell: true 
});
import { spawn } from 'child_process';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

spawn('electron', [path.join(__dirname, 'main.js')], { 
  stdio: 'inherit',
  shell: true 
});
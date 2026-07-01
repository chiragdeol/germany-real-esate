import fs from 'fs';
import path from 'path';

const clientDir = path.resolve('dist/client');
const filesToFix = ['index.html', '_shell.html'];

filesToFix.forEach(fileName => {
  const filePath = path.join(clientDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace absolute/nested relative patterns with standard relative assets path
  // Fixes `/./assets/` -> `assets/`
  content = content.replace(/\/?\.\/assets\//g, 'assets/');
  
  // Fixes `/assets/` -> `assets/` (if any are left)
  content = content.replace(/href="\/assets\//g, 'href="assets/');
  content = content.replace(/src="\/assets\//g, 'src="assets/');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully fixed asset paths in ${fileName}`);
});

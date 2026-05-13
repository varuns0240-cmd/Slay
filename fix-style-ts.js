const fs = require('fs');

const components = [
  'Preloader', 'GlobalStyles', 'ModalContact', 'Navbar', 'Hero', 'Intro', 
  'Expertises', 'SelectedWork', 'Clients', 'Footer', 'BodyScripts'
];

components.forEach(comp => {
  const file = `./components/${comp}.tsx`;
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix custom CSS properties TypeScript error
    content = content.replace(/style=\{\{\s*'--([a-zA-Z0-9_-]+)'\s*:\s*([^}]+)\s*\}\}/g, "style={{ '--$1': $2 } as React.CSSProperties}");
    
    fs.writeFileSync(file, content);
  }
});

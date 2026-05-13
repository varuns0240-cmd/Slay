const fs = require('fs');

const components = [
  'Preloader', 'GlobalStyles', 'ModalContact', 'Navbar', 'Hero', 'Intro', 
  'Expertises', 'SelectedWork', 'Clients', 'Footer', 'BodyScripts'
];

components.forEach(comp => {
  const file = `./components/${comp}.tsx`;
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix boolean video attributes that were strings
    content = content.replace(/autoPlay="(true|false)"/g, 'autoPlay');
    content = content.replace(/playsInline="(true|false)"/g, 'playsInline');
    content = content.replace(/loop="(true|false)"/g, 'loop');
    content = content.replace(/muted="(true|false)"/g, 'muted');
    
    // htmltojsx might have generated playsInline="" or autoPlay=""
    content = content.replace(/autoPlay=""/g, 'autoPlay');
    content = content.replace(/playsInline=""/g, 'playsInline');
    content = content.replace(/loop=""/g, 'loop');
    content = content.replace(/muted=""/g, 'muted');
    
    fs.writeFileSync(file, content);
  }
});

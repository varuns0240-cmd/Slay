const fs = require('fs');

const components = [
  'Preloader', 'GlobalStyles', 'ModalContact', 'Navbar', 'Hero', 'Intro', 
  'Expertises', 'SelectedWork', 'Clients', 'Footer', 'BodyScripts'
];

components.forEach(comp => {
  const file = `./components/${comp}.tsx`;
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix alt without value
    content = content.replace(/\salt(?=[\s/>])/g, ' alt=""');
    
    // Also htmltojsx sometimes outputs `autoplay ` -> `autoPlay={true}` which is fine, but let's check for other common boolean attributes that need to be strings in certain types.
    // Actually, React DOM allows autoPlay={true}, so just alt is the problem.
    
    fs.writeFileSync(file, content);
  }
});

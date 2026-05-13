const fs = require('fs');

const components = [
  'Preloader', 'GlobalStyles', 'ModalContact', 'Navbar', 'Hero', 'Intro', 
  'Expertises', 'SelectedWork', 'Clients', 'Footer', 'BodyScripts'
];

components.forEach(comp => {
  const file = `./components/${comp}.tsx`;
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix custom CSS properties in style attribute
    // Example: style={{ -index: 0 }} -> style={{ '--index': 0 }}
    // The html-to-jsx converts inline styles style="--index: 0" to style={{-index: '0'}}
    // Regex to match {{-something:
    content = content.replace(/\{\s*\{\s*-([a-zA-Z0-9_-]+)\s*:/g, `{{ '--$1':`);
    
    // GlobalStyles or other components with <style> blocks
    // If the component has <style>text</style>, we should convert it to dangerouslySetInnerHTML
    // But since it's already generated, it might be easier to just regex the style tag:
    // htmltojsx might produce: <style>{`...`}</style> or just <style>...</style> (which breaks JSX)
    if (content.includes('<style')) {
        // Let's replace <style>...</style> with <style dangerouslySetInnerHTML={{__html: `...`}} />
        // Wait, htmltojsx output might already be messed up. 
        // Let's check GlobalStyles.tsx first
    }
    
    fs.writeFileSync(file, content);
  }
});

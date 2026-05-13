const fs = require('fs');
const cheerio = require('cheerio');
const HTMLtoJSX = require('htmltojsx');

const converter = new HTMLtoJSX({
  createClass: false,
  outputClassName: 'Component'
});

const html = fs.readFileSync('../www.gethyped.nl/index.html', 'utf8');
const $ = cheerio.load(html);

// Ensure the components directory exists
if (!fs.existsSync('./components')) {
    fs.mkdirSync('./components');
}

function generateComponent(name, element) {
    let htmlContent = $.html(element);
    let jsx = converter.convert(htmlContent);
    // Replace class Component extends React.Component ... with a functional component
    // htmltojsx usually generates a class or function.
    // Let's just extract the return statement.
    const match = jsx.match(/return \(([\s\S]*)\);\s*}/);
    let body = match ? match[1] : jsx;
    
    // Some minor fixes for htmltojsx output
    // It might wrap in div if multiple root elements.
    
    const componentCode = `import React from 'react';

export default function ${name}() {
  return (
    ${body}
  );
}
`;
    fs.writeFileSync(`./components/${name}.tsx`, componentCode);
    console.log(`Generated ${name}.tsx`);
}

// Extract specific sections
generateComponent('Preloader', $('.page-wrapper > .preloader'));
generateComponent('GlobalStyles', $('.page-wrapper > .global-styles'));
generateComponent('ModalContact', $('.page-wrapper > .modal.is-contact'));
generateComponent('Navbar', $('.page-wrapper > .nav'));

generateComponent('Hero', $('.main-wrapper > .section_hero'));
generateComponent('Intro', $('.main-wrapper > .section_intro'));
generateComponent('Expertises', $('.main-wrapper > .section_expertises'));
generateComponent('SelectedWork', $('.main-wrapper > .section_selected-work'));
generateComponent('Clients', $('.main-wrapper > .section_clients'));
generateComponent('Footer', $('.main-wrapper > .footer'));

// Scripts inside the body (excluding the main-wrapper, preloader, etc)
// We will just put them in a BodyScripts component
let scriptsHtml = '';
$('body > script').each((i, el) => {
    scriptsHtml += $.html(el) + '\n';
});
// wait, htmltojsx might fail on scripts without dangerouslySetInnerHTML.
// Let's just create it manually
fs.writeFileSync('./components/BodyScripts.tsx', `import React from 'react';

export default function BodyScripts() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: \`${scriptsHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
    </>
  );
}
`);
console.log('Generated BodyScripts.tsx');

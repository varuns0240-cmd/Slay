const fs = require('fs');
const cheerio = require('cheerio');
const HTMLtoJSX = require('htmltojsx');

const converter = new HTMLtoJSX({
  createClass: false,
  outputClassName: 'Component'
});

const html = fs.readFileSync('../www.gethyped.nl/index.html', 'utf8');
const $ = cheerio.load(html);

// Get html attributes
const htmlAttrs = $('html').attr();
const htmlAttrsJsx = Object.keys(htmlAttrs).map(key => {
    const reactKey = key === 'class' ? 'className' : key; // simplified, we know data-wf-* is fine
    return `${reactKey}="${htmlAttrs[key]}"`;
}).join(' ');

const bodyAttrs = $('body').attr();
const bodyAttrsJsx = Object.keys(bodyAttrs).map(key => {
    const reactKey = key === 'class' ? 'className' : key;
    return `${reactKey}="${bodyAttrs[key]}"`;
}).join(' ');

// Convert head contents
let headHtml = $('head').html();
// htmltojsx might strip some tags if it doesn't understand them. 
// It's safer to just dangerouslySetInnerHTML the whole head to preserve script order perfectly.
// But Next.js requires meta tags to be properly structured or put in a <head> tag.
// Let's use string manipulation to put it in dangerouslySetInnerHTML or just raw html.

// Better to write the layout file:
const layoutContent = `import "./globals.css";

export const metadata = {
  title: "Get Hyped | Social-first content agency voor merken",
  description: "Klaar met content die niets oplevert? Get Hyped helpt merken groeien met slimme content, sterke formats en inzichten uit data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html ${htmlAttrsJsx} suppressHydrationWarning>
      <head dangerouslySetInnerHTML={{ __html: \`${headHtml.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
      <body ${bodyAttrsJsx} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
`;

fs.writeFileSync('./app/layout.tsx', layoutContent);
console.log('Updated app/layout.tsx');

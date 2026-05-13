const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('../www.gethyped.nl/index.html', 'utf8');
const $ = cheerio.load(html);

$('.main-wrapper').children().each((i, el) => {
    let name = el.tagName;
    let className = $(el).attr('class');
    let id = $(el).attr('id');
    console.log(`Child ${i}: <${name} class="${className || ''}" id="${id || ''}">`);
});

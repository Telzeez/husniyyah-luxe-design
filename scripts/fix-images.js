const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('fill') && content.includes('<Image')) {
    // very simplistic regex to add sizes="100vw" next to fill if not already present
    content = content.replace(/(<Image[^>]+)fill(\s*|>)/g, (match, p1, p2) => {
      if (match.includes('sizes=')) return match;
      return `${p1}fill sizes="100vw"${p2}`;
    });
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});

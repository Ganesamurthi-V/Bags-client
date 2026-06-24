const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'pics/enhanced_bags');
const destDir = path.join(__dirname, 'public/images/enhanced_bags');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const categoriesMap = {
  'bottle bags': 'Bottle Bags',
  'fabric tote': 'Fabric Tote',
  'jute tote bag': 'Jute Tote Bag',
  'Mini Jute Bag': 'Mini Jute Bag',
  'potli bags': 'Potli Bags',
  'Sling and Shoulder Bag': 'Sling & Shoulder Bag'
};

let collectionsCode = 'export type Category = "Bottle Bags" | "Fabric Tote" | "Jute Tote Bag" | "Mini Jute Bag" | "Potli Bags" | "Sling & Shoulder Bag";\n\n' +
'export interface Collection {\n' +
'  id: number;\n' +
'  title: string;\n' +
'  material: string;\n' +
'  category: Category;\n' +
'  img: string;\n' +
'}\n\n' +
'export const collections: Collection[] = [\n';

let idCounter = 1;

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(sourceDir, destDir);

const dirs = fs.readdirSync(sourceDir, { withFileTypes: true }).filter(d => d.isDirectory());

for (let dir of dirs) {
  const catName = categoriesMap[dir.name] || dir.name;
  const files = fs.readdirSync(path.join(sourceDir, dir.name)).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  
  files.sort((a, b) => parseInt(a) - parseInt(b));
  
  for (let file of files) {
    const title = catName + ' ' + parseInt(file);
    const material = dir.name.toLowerCase().includes('jute') ? 'Jute' : dir.name.toLowerCase().includes('fabric') ? 'Fabric' : 'Premium';
    const imgPath = '/images/enhanced_bags/' + dir.name + '/' + file;
    
    collectionsCode += '  { id: ' + (idCounter++) + ', title: "' + title + '", material: "' + material + '", category: "' + catName + '", img: "' + imgPath + '" },\n';
  }
}

collectionsCode += '];\n';

fs.writeFileSync(path.join(__dirname, 'src/data/collections.ts'), collectionsCode);
console.log('Done!');

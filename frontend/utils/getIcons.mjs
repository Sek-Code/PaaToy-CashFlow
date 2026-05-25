import fs from "fs";
import path from "path";

const iconDir = path.join(process.cwd(), "public/category-icon");
const outputFile = path.join(process.cwd(), "utils/icon-names.json");
const spriteFile = path.join(process.cwd(), "public/category-sprite.svg");

const files = fs.readdirSync(iconDir).filter((f) => f.endsWith(".svg") && f !== "sprite.svg");

let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';
const iconNames = [];

files.forEach((file) => {
  const name = file.replace(".svg", "");
  iconNames.push(name);

  let content = fs.readFileSync(path.join(iconDir, file), "utf8");
  
  // Extract the inner content of the SVG and its viewBox
  const viewBoxMatch = content.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
  
  // Remove svg tags but keep the inner paths/elements
  const innerContent = content
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "")
    .replace(/fill="[^"]*"/g, 'fill="currentColor"'); // Force currentColor for flexibility

  spriteContent += `  <symbol id="${name}" viewBox="${viewBox}">\n    ${innerContent}\n  </symbol>\n`;
});

spriteContent += "</svg>";

fs.writeFileSync(spriteFile, spriteContent);
fs.writeFileSync(outputFile, JSON.stringify(iconNames));

console.log(`✅ Sprite created at ${spriteFile}`);
console.log(`✅ Icon list updated at ${outputFile}`);

const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public');
const htmlFiles = ['404.html', '500.html', 'cookies.html', 'disclaimer.html', 'privacy.html', 'refunds.html', 'terms.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace Title & Brand mentions
  content = content.replace(/Varanasi Yatra's/g, "Kashi-Vashi's");
  content = content.replace(/Varanasi Yatra/g, "Kashi-Vashi");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${file}`);
});

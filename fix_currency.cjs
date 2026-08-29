const fs = require('fs'); let code = fs.readFileSync('src/pages/CartPage.jsx', 'utf8'); code = code.replace(/\?\?\?/g, '?'); fs.writeFileSync('src/pages/CartPage.jsx', code);

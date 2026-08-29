const fs = require('fs');
const path = require('path');
const pagesDir = path.join(process.cwd(), 'src', 'pages');
const pages = [
  { file: 'Shop.jsx', title: 'Shop Premium Tea', desc: 'Browse our collection of fresh Assam, Darjeeling, and Wellness teas.', kw: 'buy tea online, shop tea, premium indian tea' },
  { file: 'About.jsx', title: 'Our Story', desc: 'Learn about the heritage of Vento Tea and our commitment to local farmers.', kw: 'about vento tea, tea estate history' },
  { file: 'Blogs.jsx', title: 'The Vento Journal', desc: 'Stories, guides, and insights from the world of premium Indian tea.', kw: 'tea blog, brewing guide, health benefits of tea' },
  { file: 'Contact.jsx', title: 'Contact Us', desc: 'Get in touch with the Vento Tea team for support and wholesale inquiries.', kw: 'contact vento tea, customer support' },
  { file: 'CartPage.jsx', title: 'Your Cart', desc: 'Review your selected premium teas before checkout.', kw: 'shopping cart' },
  { file: 'Checkout.jsx', title: 'Checkout', desc: 'Securely checkout your Vento Tea order.', kw: 'checkout' },
  { file: 'Account.jsx', title: 'My Account', desc: 'Manage your Vento Tea orders and account details.', kw: 'my account' }
];

pages.forEach(p => {
  const filePath = path.join(pagesDir, p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('import SEO from')) {
      content = 'import SEO from \'../components/SEO\';\n' + content;
    }
    const returnIndex = content.indexOf('return (');
    if (returnIndex !== -1) {
      const firstDivIndex = content.indexOf('<div', returnIndex);
      if (firstDivIndex !== -1) {
        const insertPos = content.indexOf('>', firstDivIndex) + 1;
        const seoTag = '\n      <SEO title=\"' + p.title + '\" description=\"' + p.desc + '\" keywords=\"' + p.kw + '\" />';
        content = content.slice(0, insertPos) + seoTag + content.slice(insertPos);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + p.file);
      }
    }
  }
});

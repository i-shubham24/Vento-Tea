const fs = require('fs'); 
const html = fs.readFileSync('old_site2.html', 'utf8'); 
const imgRegex = /<img[^>]+src=["']([^"']+)["']/g; 
const videoRegex = /<video[^>]+src=["']([^"']+)["']/g; 
const sourceRegex = /<source[^>]+src=["']([^"']+)["']/g; 

const imgs = [...html.matchAll(imgRegex)].map(m => m[1]); 
const videos = [...html.matchAll(videoRegex)].map(m => m[1]); 
const sources = [...html.matchAll(sourceRegex)].map(m => m[1]); 

console.log('IMAGES:', imgs); 
console.log('VIDEOS/SOURCES:', videos, sources);

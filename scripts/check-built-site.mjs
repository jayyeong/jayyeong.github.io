import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat()}
const files=(await walk(root)).filter(f=>f.endsWith('.html'));
const errors=[];
for(const file of files){
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)){
  const url=match[1];if(/^(?:[a-z]+:|\/\/|#)/i.test(url))continue;
  let pathname=decodeURIComponent(url.split(/[?#]/)[0]);
  if(base&&pathname.startsWith(base+'/'))pathname=pathname.slice(base.length);
  let target=pathname.startsWith('/')?path.join(root,pathname):path.resolve(path.dirname(file),pathname);
  try{if((await stat(target)).isDirectory())await stat(path.join(target,'index.html'))}catch{errors.push(`${path.relative(root,file)}: ${url}`)}
 }
}
if(errors.length){console.error('Broken local links/assets:\n'+errors.join('\n'));process.exit(1)}
console.log(`Checked local links and assets in ${files.length} pages.`);

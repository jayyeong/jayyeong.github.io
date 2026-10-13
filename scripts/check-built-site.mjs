import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const base=(process.env.BASE_PATH||'').replace(/\/$/,'');
async function walk(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat()}
const files=(await walk(root)).filter(f=>f.endsWith('.html'));
const errors=[];
for(const file of files){
 const html=await readFile(file,'utf8');
 const urls=[...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map(m=>m[1]);
 for(const m of html.matchAll(/srcset=["']([^"']+)["']/g))urls.push(...m[1].split(',').map(item=>item.trim().split(/\s+/)[0]));
 for(const url of urls){
  if(/^(?:[a-z]+:|\/\/)/i.test(url))continue;
  let pathname=decodeURIComponent(url.split(/[?#]/)[0]);
  if(base&&pathname.startsWith(base+'/'))pathname=pathname.slice(base.length);
  let target=!pathname?file:pathname.startsWith('/')?path.join(root,pathname):path.resolve(path.dirname(file),pathname);
  try{
   if((await stat(target)).isDirectory())target=path.join(target,'index.html');
   await stat(target);
   const hash=url.includes('#')?decodeURIComponent(url.split('#')[1]):'';
   if(hash&&target.endsWith('.html')){
    const targetHtml=await readFile(target,'utf8');
    const ids=[...targetHtml.matchAll(/id=["']([^"']+)["']/g)].map(m=>m[1]);
    if(!ids.includes(hash))errors.push(`${path.relative(root,file)}: missing anchor ${url}`);
   }
  }catch{errors.push(`${path.relative(root,file)}: ${url}`)}
 }
}
if(errors.length){console.error('Broken local links/assets:\n'+errors.join('\n'));process.exit(1)}
console.log(`Checked local links, fragment anchors, srcset and assets in ${files.length} pages.`);

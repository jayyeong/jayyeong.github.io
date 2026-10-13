from pathlib import Path
import sys
from fontTools import subset
from fontTools.ttLib import TTFont
root=Path(__file__).resolve().parents[1]
text=''.join(p.read_text() for p in (root/'src').rglob('*.astro'))+''.join(chr(i) for i in range(32,127))
f=TTFont(sys.argv[1]);o=subset.Options();o.flavor='woff2';s=subset.Subsetter(options=o);s.populate(text=text);s.subset(f)
for n in f['name'].names:
 if n.nameID in [1,2,3,4,6,16,17]:
  val={1:'Portfolio Sans',2:'Regular',3:'Portfolio Sans Subset 2026',4:'Portfolio Sans',6:'PortfolioSans',16:'Portfolio Sans',17:'Regular'}[n.nameID]
  n.string=val.encode(n.getEncoding())
f.flavor='woff2';f.save(root/'public/fonts/portfolio-sans.woff2')

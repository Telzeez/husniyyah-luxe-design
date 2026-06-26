const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('c:\\Users\\Abdlazeez\\husniyyah\\Husniyyah Luxe Design\\logo.png')
  .pipe(new PNG({
    filterType: 4
  }))
  .on('parsed', function() {
    let colors = {};
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx+1];
        let b = this.data[idx+2];
        let a = this.data[idx+3];
        if (a > 50) { // ignore mostly transparent pixels
            // round to nearest 10 to group similar colors
            r = Math.round(r/10)*10;
            g = Math.round(g/10)*10;
            b = Math.round(b/10)*10;
            let key = `${r},${g},${b}`;
            colors[key] = (colors[key] || 0) + 1;
        }
      }
    }
    
    let sorted = Object.entries(colors).sort((a,b) => b[1] - a[1]);
    console.log("Top colors:", sorted.slice(0, 10));
  });

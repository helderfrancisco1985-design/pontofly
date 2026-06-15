const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "../public/assets/logo.jpeg");
const DST = path.join(__dirname, "../public/assets/logo-transparent.png");

// Brand purple sampled from logo corners: #543286
const BG_R = 84, BG_G = 50, BG_B = 134;
const maxDist = Math.sqrt((255 - BG_R) ** 2 + (255 - BG_G) ** 2 + (255 - BG_B) ** 2);

sharp(SRC)
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const out = Buffer.alloc(width * height * 4);

    for (let i = 0; i < width * height; i++) {
      const r = data[i * channels];
      const g = data[i * channels + 1];
      const b = data[i * channels + 2];
      const dist = Math.sqrt((r - BG_R) ** 2 + (g - BG_G) ** 2 + (b - BG_B) ** 2);
      const alpha = Math.min(255, Math.round(dist / maxDist * 255));
      out[i * 4]     = BG_R;
      out[i * 4 + 1] = BG_G;
      out[i * 4 + 2] = BG_B;
      out[i * 4 + 3] = alpha;
    }

    return sharp(out, { raw: { width, height, channels: 4 } })
      .png()
      .toFile(DST);
  })
  .then(() => console.log("Done: logo-transparent.png"))
  .catch((err) => { console.error(err); process.exit(1); });

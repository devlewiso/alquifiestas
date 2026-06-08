/**
 * ⚠️  Script de desarrollo — NO parte del producto Alquifiestas.
 * Genera assets visuales de seed con fal.ai (flux/schnell).
 * Las imágenes resultantes se copian a apps/web/public/images/ y se
 * versionan como estáticos.  El runtime del producto NO depende de fal.ai.
 *
 * Uso:
 *   export FAL_KEY="<tu-key>"
 *   node scripts/generate-images.mjs
 */
import fs from "fs";
import path from "path";

const FAL_KEY = process.env.FAL_KEY;
const OUT_DIR = path.resolve("apps/web/public/images");

if (!FAL_KEY) {
  console.error("❌ FAL_KEY no está definida. Exportala antes de correr el script:");
  console.error("   export FAL_KEY='<tu-key>'");
  process.exit(1);
}

const images = [
  { file: "silla.jpg", prompt: "elegant white tiffany chairs and round tables setup for a wedding reception, soft warm lighting, professional event photography, clean modern background, 4k quality" },
  { file: "inflable.jpg", prompt: "colorful inflatable bounce house castle for childrens party, bright cheerful colors, blue sky background, professional product photography, clean composition" },
  { file: "dj.jpg", prompt: "professional DJ setup with speakers and colorful LED lights, party atmosphere, dark background with vibrant lighting, high quality event photography" },
  { file: "mesa.jpg", prompt: "elegant white tent marquee canopy for outdoor garden wedding event, professional event photography, soft daylight, clean composition" },
  { file: "catering.jpg", prompt: "elegant buffet catering table with gourmet food display, professional food photography, warm lighting, white tablecloth, clean modern setup" },
  { file: "decoracion.jpg", prompt: "elegant event decoration with balloon arch, flower arrangements and backdrop, wedding setup, soft warm lighting, professional photography" },
  { file: "foto.jpg", prompt: "professional photographer with DSLR camera at a wedding event, photo booth setup with props, warm ambient lighting, candid style photography" },
  { file: "vajilla.jpg", prompt: "elegant white porcelain tableware set with crystal glasses and silver cutlery, fine dining catering display, professional product photography" },
  { file: "avatar1.jpg", prompt: "professional headshot portrait of a Guatemalan businessman in his 40s, warm smile, suit jacket, neutral background, studio lighting, high quality portrait photography" },
  { file: "avatar2.jpg", prompt: "professional headshot portrait of a young Guatemalan woman entrepreneur, friendly smile, casual business attire, neutral background, studio lighting" },
  { file: "avatar3.jpg", prompt: "professional headshot portrait of a Guatemalan DJ man in his 30s, confident expression, stylish look, neutral background, studio lighting" },
  { file: "avatar4.jpg", prompt: "professional headshot portrait of a middle-aged Guatemalan woman event planner, warm smile, elegant attire, neutral background, studio lighting" },
  { file: "avatar5.jpg", prompt: "professional headshot portrait of a Guatemalan chef woman in her 50s, kind expression, white chef coat, neutral background, studio lighting" },
  { file: "avatar6.jpg", prompt: "professional headshot portrait of a young Guatemalan man decorator artist, creative look, casual attire, neutral background, studio lighting" },
  { file: "avatar7.jpg", prompt: "professional headshot portrait of a Guatemalan photographer man in his 30s, camera around neck, friendly smile, neutral background, studio lighting" },
  { file: "avatar8.jpg", prompt: "professional headshot portrait of an elegant Guatemalan woman in her 40s, business owner look, pearl necklace, neutral background, studio lighting" },
  { file: "avatar9.jpg", prompt: "professional headshot portrait of a young Guatemalan man audio technician, headphones around neck, casual look, neutral background, studio lighting" },
  { file: "avatar10.jpg", prompt: "professional headshot portrait of a Guatemalan indigenous woman entrepreneur, traditional woven blouse, warm smile, neutral background, studio lighting" },
  { file: "cover.jpg", prompt: "beautiful outdoor Guatemalan event setup with tables, chairs and decorations at sunset, volcano in background, festive atmosphere, professional event photography, wide shot" },
];

async function generateImage(prompt, outFile) {
  const outPath = path.join(OUT_DIR, outFile);
  if (fs.existsSync(outPath)) {
    console.log(`⏭ Skipping ${outFile} (already exists)`);
    return;
  }

  console.log(`🎨 Generating ${outFile}...`);

  const submitRes = await fetch("https://queue.fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      image_size: "square_hd",
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: true,
    }),
  });

  if (!submitRes.ok) {
    const err = await submitRes.text();
    throw new Error(`Failed to submit ${outFile}: ${err}`);
  }

  const submitData = await submitRes.json();
  console.log(`   Request ID: ${submitData.request_id}`);

  let result = null;
  for (let i = 0; i < 120; i++) {
    await new Promise((r) => setTimeout(r, 1500));
    const statusRes = await fetch(submitData.status_url, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });
    const status = await statusRes.json();
    if (status.status === "COMPLETED") {
      const resultRes = await fetch(submitData.response_url, {
        headers: { Authorization: `Key ${FAL_KEY}` },
      });
      result = await resultRes.json();
      break;
    }
    if (status.status === "FAILED") {
      throw new Error(`Generation failed for ${outFile}: ${JSON.stringify(status)}`);
    }
    process.stdout.write(".");
  }

  if (!result || !result.images || !result.images[0]) {
    throw new Error(`Timeout or no image for ${outFile}`);
  }

  const imageUrl = result.images[0].url;
  console.log(`\n   Downloading...`);

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image for ${outFile}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  console.log(`✅ Saved ${outFile} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log(`Generating ${images.length} images with fal.ai flux/schnell...\n`);

  for (const img of images) {
    try {
      await generateImage(img.prompt, img.file);
    } catch (err) {
      console.error(`\n❌ Error generating ${img.file}:`, err.message);
    }
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n🎉 Done!");
}

main();

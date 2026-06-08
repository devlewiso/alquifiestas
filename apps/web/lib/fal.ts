import { fal } from "@fal-ai/client";

if (typeof window !== "undefined") {
  fal.config({
    proxyUrl: "/api/fal/proxy",
  });
}

export async function generateImage(prompt: string) {
  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt,
      image_size: "square_hd",
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: true,
      seed: Math.floor(Math.random() * 999999),
    },
    pollInterval: 500,
    logs: true,
  });

  return result.data.images?.[0]?.url ?? null;
}

export default fal;

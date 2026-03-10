const API_URL = process.env.API_URL || "https://019cd71d-c03a-7593-90eb-9625aab56786-3000.eur-1.stg.rapu.app";

async function main() {
  const el = document.getElementById("greeting")!;
  try {
    const res = await fetch(API_URL);
    const data: { message: string } = await res.json();
    el.textContent = data.message;
  } catch {
    el.textContent = "Failed to reach backend";
  }
}

main();

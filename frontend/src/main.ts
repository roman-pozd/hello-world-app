const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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

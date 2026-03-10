const API_URL = process.env.API_URL || "https://019cd76d-b0c3-737c-8808-fdfb805e9d0c-3000.eur-1.stg.rapu.app";

interface LogEntry {
  id: number;
  timestamp: string;
  level: string;
  message: string;
}

async function main() {
  const el = document.getElementById("greeting")!;
  try {
    const res = await fetch(API_URL);
    const data: { message: string } = await res.json();
    el.textContent = data.message;
  } catch {
    el.textContent = "Failed to reach backend";
  }

  const logsEl = document.getElementById("logs")!;
  try {
    const res = await fetch(`${API_URL}/logs`);
    const logs: LogEntry[] = await res.json();
    if (logs.length === 0) {
      logsEl.innerHTML = "<p>No logs found.</p>";
      return;
    }
    const rows = logs
      .map(
        (log) =>
          `<tr>
            <td>${new Date(log.timestamp).toLocaleString()}</td>
            <td class="level-${log.level}">${log.level}</td>
            <td>${log.message}</td>
          </tr>`
      )
      .join("");
    logsEl.innerHTML = `
      <h2>Application Logs</h2>
      <table>
        <thead><tr><th>Timestamp</th><th>Level</th><th>Message</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  } catch {
    logsEl.innerHTML = "<p>Failed to load logs.</p>";
  }
}

main();

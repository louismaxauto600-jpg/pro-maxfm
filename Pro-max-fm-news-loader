<script>
const newsGrid = document.getElementById("newsGrid");

if (!newsGrid) {
  console.error("newsGrid not found - ajoute <div id='newsGrid'></div> nan HTML ou");
}

const sources = [
  { id: "rfi", name: "RFI" },
  { id: "cnn", name: "CNN" },
  { id: "miami", name: "MIAMI HERALD" }
];

function cleanText(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || "").replace(/\s+/g, " ").trim();
}

function escapeHTML(text = "") {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function safeURL(value = "") {
  try {
    const u = new URL(value.trim());
    return ["http:", "https:"].includes(u.protocol)? u.href : "#";
  } catch {
    return "#";
  }
}

async function loadSource(source) {
  try {
    const response = await fetch(`/.netlify/functions/news?source=${encodeURIComponent(source.id)}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`${source.name} HTTP ${response.status}`);
    }

    const xmlText = await response.text();

    // Tcheke si se pa HTML error page
    if (xmlText.trim().startsWith("<!DOCTYPE") || xmlText.trim().startsWith("<html")) {
      throw new Error(`${source.name} returned HTML not XML`);
    }

    const xml = new DOMParser().parseFromString(xmlText, "application/xml");

    // Tcheke parser error
    const parserError = xml.querySelector("parsererror");
    if (parserError) {
      throw new Error(`${source.name} XML parse error`);
    }

    const items = [...xml.querySelectorAll("item")].slice(0, 8);

    if (!items.length) {
      throw new Error(`${source.name} no items`);
    }

    items.forEach(item => {
      const title = (item.querySelector("title")?.textContent || "Latest News").trim();
      const link = (item.querySelector("link")?.textContent || "#").trim();
      const description = cleanText(item.querySelector("description")?.textContent || "").slice(0, 220);
      const pubDateRaw = item.querySelector("pubDate")?.textContent || "";

      let dateLabel = "";
      if (pubDateRaw) {
        try {
          dateLabel = new Date(pubDateRaw).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          });
        } catch {
          dateLabel = "";
        }
      }

      const article = document.createElement("article");
      article.className = "news-card";
      article.style.cssText = `
        border:1px solid rgba(255,106,0,.35);
        border-radius:14px;
        background:linear-gradient(145deg,rgba(255,106,0,.08),#000);
        overflow:hidden;
        transition:.25s;
      `;

      article.innerHTML = `
        <div class="news-image" style="height:140px;background:#050200;display:grid;place-items:center;font-size:42px;border-bottom:1px solid rgba(255,106,0,.2)">📰</div>
        <div class="news-content" style="padding:16px">
          <div class="news-meta" style="font-size:11px;color:#ff6a00;font-weight:900;letter-spacing:.5px;margin-bottom:8px">
            ${escapeHTML(source.name)} ${dateLabel? " • " + escapeHTML(dateLabel) : ""}
          </div>
          <h3 style="color:#ff6a00;font-size:16px;line-height:1.3;margin-bottom:8px">${escapeHTML(title)}</h3>
          <p style="color:#ff8c32;font-size:13px;line-height:1.5;opacity:.9;margin-bottom:12px">${escapeHTML(description)}${description.length >= 220? "..." : ""}</p>
          <a href="${safeURL(link)}" target="_blank" rel="noopener noreferrer" class="read-more" style="display:inline-flex;padding:8px 14px;border:1px solid #ff6a00;border-radius:20px;color:#ff6a00!important;font-size:11px;font-weight:900;letter-spacing:.5px">LIRE PLUS</a>
        </div>
      `;

      newsGrid.appendChild(article);
    });

    return true;

  } catch (err) {
    console.warn(`[${source.name}]`, err.message);
    return false;
  }
}

async function loadNews() {
  if (!newsGrid) return;

  newsGrid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#ff6a00;font-weight:900;letter-spacing:1px;border:1px solid rgba(255,106,0,.3);border-radius:14px;background:#000">
      <div style="font-size:32px;margin-bottom:12px">📡</div>
      CHARGEMENT DES DERNIÈRES NOUVELLES...
    </div>
  `;

  const results = await Promise.allSettled(sources.map(loadSource));

  // Si tout echwe
  const hasContent = newsGrid.querySelectorAll(".news-card").length > 0;

  if (!hasContent) {
    newsGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#ff8c32;border:1px solid rgba(255,106,0,.3);border-radius:14px;background:#000">
        <div style="font-size:32px;margin-bottom:12px">⚠️</div>
        <div style="color:#ff6a00;font-weight:900;margin-bottom:8px">LES SOURCES D'ACTUALITÉS SONT TEMPORAIREMENT INDISPONIBLES.</div>
        <div style="font-size:13px;opacity:.8">Veuillez réessayer dans quelques instants.</div>
        <button onclick="loadNews()" style="margin-top:16px;padding:10px 18px;border:1px solid #ff6a00;border-radius:20px;background:#000;color:#ff6a00;font-weight:900;cursor:pointer">RÉESSAYER</button>
      </div>
    `;
  }

  // Log rezilta
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.warn(sources[i].name, "failed:", r.reason);
    }
  });
}

// Lance otomatik
loadNews();

// Auto refresh chak 5 minit
setInterval(loadNews, 5 * 60 * 1000);
</script>

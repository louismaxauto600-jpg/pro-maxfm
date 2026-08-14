<script>
const newsGrid = document.getElementById("newsGrid");

const sources = [
  { id: "rfi", name: "RFI" },
  { id: "cnn", name: "CNN" },
  { id: "miami", name: "MIAMI HERALD" }
];

function cleanText(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHTML(text = "") {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function safeURL(value = "") {
  try {
    const u = new URL(value);
    return ["http:", "https:"].includes(u.protocol)
      ? u.href
      : "#";
  } catch {
    return "#";
  }
}

async function loadSource(source) {
  const response = await fetch(
    `/.netlify/functions/news?source=${source.id}`
  );

  if (!response.ok) {
    throw new Error(`${source.name} unavailable`);
  }

  const xmlText = await response.text();

  const xml = new DOMParser().parseFromString(
    xmlText,
    "application/xml"
  );

  const items = [...xml.querySelectorAll("item")].slice(0, 8);

  items.forEach(item => {
    const title =
      item.querySelector("title")?.textContent || "Latest News";

    const link =
      item.querySelector("link")?.textContent || "#";

    const description =
      cleanText(
        item.querySelector("description")?.textContent || ""
      ).slice(0, 220);

    const pubDate =
      item.querySelector("pubDate")?.textContent || "";

    const article = document.createElement("article");
    article.className = "news-card";

    article.innerHTML = `
      <div class="news-image">📰</div>

      <div class="news-content">
        <div class="news-meta">
          ${escapeHTML(source.name)}
          ${pubDate ? " • " + escapeHTML(new Date(pubDate).toLocaleDateString()) : ""}
        </div>

        <h3>${escapeHTML(title)}</h3>

        <p>${escapeHTML(description)}</p>

        <a
          href="${safeURL(link)}"
          target="_blank"
          rel="noopener noreferrer"
          class="read-more">
          LIRE PLUS
        </a>
      </div>
    `;

    newsGrid.appendChild(article);
  });
}

async function loadNews() {
  newsGrid.innerHTML = `
    <div style="
      grid-column:1/-1;
      text-align:center;
      padding:50px;
      color:#ff6a00;
      font-weight:bold;
    ">
      CHARGEMENT DES DERNIÈRES NOUVELLES...
    </div>
  `;

  newsGrid.innerHTML = "";

  const results = await Promise.allSettled(
    sources.map(loadSource)
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.warn(
        sources[index].name,
        result.reason
      );
    }
  });

  if (!newsGrid.children.length) {
    newsGrid.innerHTML = `
      <div style="
        grid-column:1/-1;
        text-align:center;
        padding:50px;
        color:#ff6a00;
      ">
        LES SOURCES D'ACTUALITÉS SONT TEMPORAIREMENT INDISPONIBLES.
      </div>
    `;
  }
}

loadNews();
</script>

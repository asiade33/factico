document.addEventListener("DOMContentLoaded", function () {
  const baseUrl = "https://factico.eu"; // Deine Basis-URL

  // Definiere die Parteien und statischen Seiten
  const parties = ["spd", "cducsu", "fdp", "gruene", "afd", "bsw", "linke"];
  const staticPages = ["impressum", "datenschutz", "feedback"]; // Statische Seiten

  // Politiker manuell eintragen
  const politicians = {
    spd: ["faeser", "klingbeil", "esken", "scholz"],
    gruene: [
      "baerbock",
      "lang",
      "fester",
      "ganserer",
      "habeck",
      "neubauer",
      "goering-eckardt",
    ],
    afd: ["weidel"],
  };

  // Heutiges Datum für <lastmod>
  const lastModDate = new Date().toISOString().split("T")[0];

  // Sitemap-Header
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Statische Seiten hinzufügen (Verzeichnisstruktur statt .html)
  staticPages.forEach((page) => {
    sitemapContent += `
    <url>
      <loc>${baseUrl}/${page}/</loc> <!-- Hier wird die Ordnerstruktur verwendet -->
      <lastmod>${lastModDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  // Parteien & Politiker hinzufügen
  parties.forEach((party) => {
    sitemapContent += `
      <url>
        <loc>${baseUrl}/${party}/</loc>
        <lastmod>${lastModDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>`;

    if (politicians[party]) {
      politicians[party].forEach((person) => {
        sitemapContent += `
      <url>
        <loc>${baseUrl}/${party}/${person}/</loc>
        <lastmod>${lastModDate}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>`;
      });
    }
  });

  // Sitemap abschließen
  sitemapContent += `\n</urlset>`;

  // Sitemap im HTML anzeigen
  document.getElementById("sitemap-output").textContent = sitemapContent;

  // Download-Funktion für die Sitemap
  document
    .getElementById("download-sitemap")
    .addEventListener("click", function () {
      const blob = new Blob([sitemapContent], { type: "application/xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sitemap.xml";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
  // JavaScript für das Scroll-Verhalten
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");

    // Wenn mehr als 50px gescrollt wurde, Header transparenter machen
    if (window.scrollY > 50) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.6)"; // Mehr Transparenz
      header.style.opacity = "0.9"; // Weniger sichtbar
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // Weniger Transparenz
      header.style.opacity = "1"; // Vollständig sichtbar
    }
  });
}); // End of DOMContentLoaded listener

// STARTSEITE: KARTEN DER PARTEIEN MIT LINKS
const parties = [
  {
    name: "Linke",
    logo: "https://i.imgur.com/zI3vFFd.png",
    link: "/linke/",
  },
  {
    name: "Grüne",
    logo: "https://i.imgur.com/xe72gQi.png",
    link: "/gruene/",
  },
  {
    name: "BSW",
    logo: "https://i.imgur.com/jvq96jt.png",
    link: "/bsw/",
  },
  {
    name: "SPD",
    logo: "https://i.imgur.com/A642CgB.png",
    link: "/spd/",
  },
  {
    name: "CDU/CSU",
    logo: "https://i.imgur.com/pWjyouE.png",
    link: "/cducsu/",
  },
  {
    name: "FDP",
    logo: "https://i.imgur.com/R3MTehN.png",
    link: "/fdp/",
  },
  {
    name: "AfD",
    logo: "https://i.imgur.com/av3Eoww.png",
    link: "/afd/",
  },
];

// Initialize party grid
const partyGrid = document.getElementById("partyGrid");
parties.forEach((party) => {
  const card = document.createElement("div");
  card.className = "party-card";

  // Erstelle den Link innerhalb der Karte
  const link = document.createElement("a");
  link.href = party.link; // Der Link zur jeweiligen Partei-Seite
  link.className = "party-link";

  // Wenn ein Logo vorhanden ist, füge das Logo ein
  const partyLogo = `<img src="${party.logo}" alt="${party.name} Logo" class="party-logo"/>`;

  link.innerHTML = `
    ${partyLogo}
    <div class="party-name">${party.name}</div>
  `;

  // Füge den Link in die Karte ein
  card.appendChild(link);

  // Füge die Karte zum Grid hinzu
  partyGrid.appendChild(card);
});

// -------------------- SUCHE AUF DER STARTSEITE --------------------
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Zuordnung für benutzerdefinierte Suchen
const customSearchResults = {
  spd: "SPD",
  cdu: "CDU/CSU",
  csu: "CDU/CSU",
  cducsu: "CDU/CSU",
  cdu_csu: "CDU/CSU",
  fdp: "FDP",
  gruene: "Bündnis 90/Die Grünen",
  die_gruenen: "Bündnis 90/Die Grünen",
  buendnis_90_die_gruenen: "Bündnis 90/Die Grünen",
  afd: "AfD",
  bsw: "BSW",
  bündnis_sahra_wagenknecht: "BSW", // Ergänzung: Langform mit Unterstrichen (realistisch)
  bündnis_wagenknecht: "BSW", // Ergänzung:  Verkürzte Langform (realistisch)
  buendnis_sahra_wagenknecht: "BSW", // Ergänzung: Langform mit "ue" (realistisch)
  buendnis_wagenknecht: "BSW", // Ergänzung: Verkürzte Langform mit "ue" (realistisch)
  sarah_wagenknecht: "BSW", // Ergänzung:  Name der Parteivorsitzenden (realistisch)
  wagenknecht: "BSW", // Ergänzung:  Nachname der Parteivorsitzenden
  linke: "Die Linke",
  die_linke: "Die Linke",
  olaf_scholz: "Olaf Scholz",
  scholz: "Olaf Scholz",
  alice_weidel: "Alice Weidel",
  weidel: "Alice Weidel",
  katrin_goering_eckardt: "Katrin Göring-Eckardt",
  goering: "Katrin Göring-Eckardt",
  goering_eckardt: "Katrin Göring-Eckardt",
  goering_eckhardt: "Katrin Göring-Eckardt", // Covers possible 'h' misspelling
  göring: "Katrin Göring-Eckardt", // Handles direct umlaut input (normalization converts to 'goering')
  robert_habeck: "Robert Habeck",
  habeck: "Robert Habeck",
  robert: "Robert Habeck",
  habek: "Robert Habeck", // Häufige Verwechslung
  markus_tessa_ganserer: "Tessa Ganserer", // Zuordnung für Tessa Ganserer (ehemals Markus Ganserer)
  ganserer: "Tessa Ganserer",
  tessa_ganserer: "Tessa Ganserer", // Doppelnamen und direkte Bezeichnung
  markus_ganserer: "Tessa Ganserer", // Früherer Name
  emilia_fester: "Emilia Fester", // Zuordnung für Emilia Fester
  fester: "Emilia Fester",
  neubauer: "Luisa Neubauer", // Zuordnung für Luisa Neubauer
  luisa_neubauer: "Luisa Neubauer",
  annalena_baerbock: "Annalena Baerbock",
  baerbock: "Annalena Baerbock",
  annalena_bärbock: "Annalena Baerbock",
  bärbock: "Annalena Baerbock",
  ricarda_lang: "Ricarda Lang",
  lang: "Ricarda Lang",
  lars_klingbeil: "Lars Klingbeil",
  klingbeil: "Lars Klingbeil",
  saskia_esken: "Saskia Esken",
  esken: "Saskia Esken",
  nancy_faeser: "Nancy Faeser",
  faeser: "Nancy Faeser",
  fäser: "Nancy Faeser",
};

// Seiten-Verlinkungen (angepasst, um alle Keys abzudecken)
const pages = {
  spd: "/spd/",
  cdu: "/cducsu/",
  csu: "/cducsu/",
  cducsu: "/cducsu/", // Schlüssel ohne Schrägstrich
  fdp: "/fdp/",
  gruene: "/gruene/",
  die_gruenen: "/gruene/",
  buendnis_90_die_gruenen: "/gruene/",
  afd: "/afd/",
  bündnis_sahra_wagenknecht: "/bsw/", // Ergänzung: Langform mit Unterstrichen (realistisch)
  bündnis_wagenknecht: "/bsw/", // Ergänzung: Verkürzte Langform (realistisch)
  buendnis_sahra_wagenknecht: "/bsw/", // Ergänzung: Langform mit "ue" (realistisch)
  buendnis_wagenknecht: "/bsw/", // Ergänzung: Verkürzte Langform mit "ue" (realistisch)
  sahra_wagenknecht: "/bsw/", // Ergänzung: Name der Parteivorsitzenden (realistisch)
  sarah_wagenknecht: "/bsw/", // Ergänzung: Name der Parteivorsitzenden (realistisch)
  wagenknecht: "/bsw/", // Ergänzung: Nachname der Parteivorsitzenden
  bsw: "/bsw/",
  linke: "/linke/",
  die_linke: "/linke/",
  olaf_scholz: "/scholz/",
  scholz: "/scholz/",
  alice_weidel: "/weidel/",
  weidel: "/weidel/",
  wirecard: "/wirecard/",
  katrin_goering_eckardt: "/goering-eckardt/",
  goering: "/goering-eckardt/",
  goering_eckardt: "/goering-eckardt/",
  goering_eckhardt: "/goering-eckardt/",
  göring: "/goering-eckardt/",
  robert_habeck: "/habeck/", // Robert Habeck
  habeck: "/habeck/", // Habeck
  markus_tessa_ganserer: "/ganserer/", // Tessa Ganserer (früher Markus)
  ganserer: "/ganserer/", // Tessa Ganserer
  tessa_ganserer: "/ganserer/", // Voller Name Tessa Ganserer
  markus_ganserer: "/ganserer/", // Früherer Name
  emilia_fester: "/fester/", // Emilia Fester
  fester: "/fester/", // Emilia Fester
  neubauer: "/neubauer/", // Luisa Neubauer
  luisa_neubauer: "/neubauer/", // Luisa Neubauer
  annalena_baerbock: "/baerbock/", // Baerbock
  baerbock: "/baerbock/", // Baerbock
  ricarda_lang: "/lang/", // Lang
  lang: "/lang/", // Lang
  lars_klingbeil: "/klingbeil/", // Klingbeil
  klingbeil: "/klingbeil/", // Klingbeil
  saskia_esken: "/esken/", // Esken
  esken: "/esken/", // Esken
  nancy_faeser: "/faeser/", // Faeser
  faeser: "/faeser/", // Faeser
};

// Normalisiert die Eingabe umfassend
function normalizeSearchQuery(query) {
  return query
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .replace(/[-\s]/g, "_") // Bindestriche & Leerzeichen zu _
    .replace(/[^a-z0-9_]/gi, "") // Entfernt Sonderzeichen
    .toLowerCase();
}

// In formatName: Akronyme ergänzen
const uppercaseNames = ["spd", "fdp", "cdu/csu", "gruene"];

// Handle Search
const handleSearch = debounce((query) => {
  const normalizedQuery = normalizeSearchQuery(query);
  console.log("Suchbegriff normalisiert:", normalizedQuery); // Hinzugefügt

  if (query.length > 2) {
    const results = Object.keys(pages)
      .filter((name) => {
        const normalizedName = normalizeSearchQuery(name);
        console.log(
          "Schlüssel normalisiert:",
          normalizedName,
          "Suchbegriff normalisiert:",
          normalizedQuery
        ); // Hinzugefügt
        return normalizedName.includes(normalizedQuery);
      })
      .map((name) => ({
        name: formatName(name, query),
        link: pages[name],
      }));

    const customResults = Object.keys(customSearchResults)
      .filter((key) => {
        const normalizedKey = normalizeSearchQuery(key);
        console.log(
          "Custom Schlüssel normalisiert:",
          normalizedKey,
          "Suchbegriff normalisiert:",
          normalizedQuery
        ); // Hinzugefügt
        return normalizedKey.includes(normalizedQuery);
      })
      .map((key) => ({
        name: customSearchResults[key],
        link: pages[key],
      }));

    // Zusammenführen der Ergebnisse und Duplikate filtern
    const allResults = [...results, ...customResults];

    // Filtert doppelte Ergebnisse heraus, falls sie sowohl in den Seiten- als auch benutzerdefinierten Ergebnissen vorhanden sind
    const uniqueResults = allResults.reduce((acc, current) => {
      // Prüfen, ob der Name bereits im Array vorhanden ist
      if (!acc.some((item) => item.name === current.name)) {
        acc.push(current); // Wenn nicht, hinzufügen
      }
      return acc;
    }, []);

    // Anzeige der Ergebnisse
    searchResults.innerHTML = uniqueResults
      .map(
        (item) => ` 
          <div class="search-item" data-link="${item.link}">${item.name}</div> 
        `
      )
      .join("");

    if (uniqueResults.length) {
      searchResults.style.display = "block";
      selectedResultIndex = 0; // Wähle den ersten Eintrag automatisch aus
      updateSelection(); // Markiere den ersten Eintrag visuell
    } else {
      searchResults.style.display = "none";
      selectedResultIndex = -1; // Keine Auswahl
    }
  } else {
    searchResults.style.display = "none";
    selectedResultIndex = -1; // Keine Auswahl
  }
}, 300);

searchInput.addEventListener("input", (e) => {
  handleSearch(e.target.value);
  selectedResultIndex = -1; // Auswahl zurücksetzen bei neuer Eingabe
  updateSelection(); // Auswahl visuell entfernen
});

searchInput.addEventListener("keydown", (e) => {
  if (searchResults.style.display === "block") {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Verhindert das Scrollen der Seite
      if (selectedResultIndex < searchResults.children.length - 1) {
        selectedResultIndex++;
      } else {
        selectedResultIndex = 0; // Zurück zum ersten Element, wenn am Ende
      }
      updateSelection();
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Verhindert das Scrollen der Seite
      if (selectedResultIndex > 0) {
        selectedResultIndex--;
      } else {
        selectedResultIndex = searchResults.children.length - 1; // Zum letzten Element, wenn am Anfang
      }
      updateSelection();
    } else if (e.key === "Enter") {
      e.preventDefault(); // Verhindert Formular-Absendung
      if (
        selectedResultIndex !== -1 &&
        searchResults.children[selectedResultIndex]
      ) {
        const link =
          searchResults.children[selectedResultIndex].getAttribute("data-link");
        window.location.href = link;
      }
    }
  }
});

// Funktion zur Formatierung der Namen
function formatName(name, query) {
  const uppercaseNames = ["spd", "cdu/csu", "fdp"]; // Hier kannst du auch andere Akronyme hinzufügen, die immer in Großbuchstaben bleiben sollen
  if (uppercaseNames.includes(name.toLowerCase())) {
    return name.toUpperCase(); // Gibt den Namen als Großbuchstaben zurück
  }

  // Wenn der Name mit einem benutzerdefinierten Begriff übereinstimmt, gibt es das formatierte Ergebnis zurück
  if (customSearchResults[name.toLowerCase()]) {
    return customSearchResults[name.toLowerCase()]; // Gibt die benutzerdefinierte Formatierung zurück
  }

  return name.charAt(0).toUpperCase() + name.slice(1); // Normalisiert den ersten Buchstaben, wenn es kein Akronym ist
}

// Handle search result clicks (delegation method)
searchResults.addEventListener("click", (e) => {
  // Überprüfen, ob das angeklickte Element ein "search-item" ist
  if (e.target && e.target.classList.contains("search-item")) {
    const pageLink = e.target.getAttribute("data-link");
    window.location.href = pageLink; // Weiterleitung zur gefundenen Seite
  }
});

// Debounce function for search
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function updateSelection() {
  const searchItems = searchResults.children;
  for (let i = 0; i < searchItems.length; i++) {
    const item = searchItems[i];
    if (i === selectedResultIndex) {
      item.classList.add("selected");
      item.setAttribute("aria-selected", "true"); // Für Screenreader-Zugänglichkeit
    } else {
      item.classList.remove("selected");
      item.setAttribute("aria-selected", "false"); // Für Screenreader-Zugänglichkeit
    }
  }
}

// --------------------Funktion zum Umklappen des Textes und Drehen des Pfeils --------------------
function toggleHighlight(button) {
  var content = button.nextElementSibling;
  var arrow = button.querySelector(".arrow");

  if (content.style.display === "block") {
    content.style.display = "none";
    arrow.textContent = "▼";
  } else {
    content.style.display = "block";
    arrow.textContent = "▲";
  }
}

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

// STARTSEITE: KARTEN DER INSTITUTIONEN MIT LINKS
const institutions = [
  {
    name: "ÖRR",
    logo: "https://i.imgur.com/moOJRDv.png",
    link: "/oerr/",
  },
  {
    name: "AAS",
    logo: "https://i.imgur.com/AG3dJrm.png",
  },
  {
    name: "VS",
    logo: "https://i.imgur.com/AMTfatq.png",
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

// Initialize institution grid
const institutionGrid = document.getElementById("institutionGrid");

if (institutionGrid) {
  // Sicherheitsabfrage: Existiert das Element überhaupt?
  institutions.forEach((institution) => {
    const card = document.createElement("div");
    card.className = "party-card";

    // Entscheidung: Link oder nur Div?
    let contentElement;

    if (institution.link) {
      // Es gibt einen Link -> <a> Element erstellen
      contentElement = document.createElement("a");
      contentElement.href = institution.link;
    } else {
      // Kein Link -> <div> Element erstellen
      contentElement = document.createElement("div");
      contentElement.style.cursor = "default"; // Mauszeiger normal lassen
    }

    // WICHTIG: Die Klasse muss bleiben, damit das CSS-Layout stimmt
    contentElement.className = "party-link";

    // Inhalt füllen
    const logoHtml = `<img src="${institution.logo}" alt="${institution.name} Logo" class="party-logo"/>`;

    contentElement.innerHTML = `
      ${logoHtml}
      <div class="party-name">${institution.name}</div>
    `;

    card.appendChild(contentElement);
    institutionGrid.appendChild(card);
  });
}

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
  schwachkopf: "Robert Habeck", // Habeck findet man unter "Schwachkopf"
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
  merz: "Friedrich Merz",
  friedrich_merz: "Friedrich Merz",
  fotzen_fritz: "Friedrich Merz",
  fotzenfritz: "Friedrich Merz",
  musk: "Elon Musk",
  elon_musk: "Elon Musk",
  heidi_reichinnek: "Heidi Reichinnek",
  reichinnek: "Heidi Reichinnek",
  bas: "Bärbel Bas",
  bärbel_bas: "Bärbel Bas",
  baerbel_bas: "Bärbel Bas",
  schlesinger: "Patricia Schlesinger",
  patricia_schlesinger: "Patricia Schlesinger",
  andy_grote: "Andy Grote",
  grote: "Andy Grote",
  pimmel: "Andy Grote", // Grote findet man jetzt auch unter "Pimmel"
  pimmelgate: "Andy Grote",
  oerr: "ÖRR",
  ard: "ÖRR",
  zdf: "ÖRR",
  beitrag: "ÖRR",
  zwangsgebühr: "ÖRR",
};

// Seiten-Verlinkungen (angepasst, um alle Keys abzudecken)
const pages = {
  spd: "/spd/", // Partei SPD
  cdu: "/cducsu/", // Partei CDU
  csu: "/cducsu/", // Partei CSU
  cducsu: "/cducsu/", // Partei CDU/CSU
  fdp: "/fdp/", // Partei FDP
  gruene: "/gruene/", // Partei Grüne
  die_gruenen: "/gruene/", // Partei Grüne (alternative Bezeichnung)
  buendnis_90_die_gruenen: "/gruene/", // Partei Grüne (alternative Bezeichnung)
  afd: "/afd/", // Partei AfD
  bündnis_sahra_wagenknecht: "/bsw/", // Partei BSW (z.B. Sahra Wagenknecht)
  bündnis_wagenknecht: "/bsw/", // Partei BSW (verkürzte Langform)
  buendnis_sahra_wagenknecht: "/bsw/", // Partei BSW (Langform mit "ue")
  buendnis_wagenknecht: "/bsw/", // Partei BSW (verkürzte Langform mit "ue")
  sahra_wagenknecht: "/bsw/", // Sahra Wagenknecht (BSW)
  sarah_wagenknecht: "/bsw/", // Sahra Wagenknecht (BSW)
  wagenknecht: "/bsw/", // Nachname der Parteivorsitzenden Wagenknecht
  bsw: "/bsw/", // Partei BSW
  linke: "/linke/", // Partei Die Linke
  die_linke: "/linke/", // Partei Die Linke
  olaf_scholz: "/spd/scholz/", // Politiker Olaf Scholz (SPD)
  scholz: "/spd/scholz/", // Olaf Scholz (SPD)
  lars_klingbeil: "/spd/klingbeil/", // Lars Klingbeil (SPD)
  klingbeil: "/spd/klingbeil/", // Lars Klingbeil (SPD)
  saskia_esken: "/spd/esken/", // Saskia Esken (SPD)
  esken: "/spd/esken/", // Saskia Esken (SPD)
  nancy_faeser: "/spd/faeser/", // Nancy Faeser (SPD)
  nancy_fäser: "/spd/faeser/", // Nancy Faeser (SPD)
  faeser: "/spd/faeser/", // Nancy Faeser (SPD)
  alice_weidel: "/afd/weidel/", // Politiker Alice Weidel (AfD)
  weidel: "/afd/weidel/", // Alice Weidel (AfD)
  katrin_goering_eckardt: "/gruene/goering-eckardt/", // Politiker Katrin Göring-Eckardt (Grüne)
  goering: "/gruene/goering-eckardt/", // Katrin Göring-Eckardt (Grüne)
  goering_eckardt: "/gruene/goering-eckardt/", // Katrin Göring-Eckardt (Grüne)
  goering_eckhardt: "/gruene/goering-eckardt/", // Alternative Schreibweise für Katrin Göring-Eckardt
  göring: "/gruene/goering-eckardt/", // Katrin Göring-Eckardt (Grüne)
  robert_habeck: "/gruene/habeck/", // Robert Habeck (Grüne)
  habeck: "/gruene/habeck/", // Robert Habeck (Grüne)
  schwachkopf: "/gruene/habeck/",
  habek: "/gruene/habeck/", // WICHTIG: Damit der Tippfehler auch verlinkt
  robert: "/gruene/habeck/",
  markus_tessa_ganserer: "/gruene/ganserer/", // Tessa Ganserer (Grüne, früher Markus)
  ganserer: "/gruene/ganserer/", // Tessa Ganserer (Grüne)
  tessa_ganserer: "/gruene/ganserer/", // Tessa Ganserer (Grüne)
  markus_ganserer: "/gruene/ganserer/", // Früherer Name von Tessa Ganserer
  emilia_fester: "/gruene/fester/", // Emilia Fester (Grüne)
  fester: "/gruene/fester/", // Emilia Fester (Grüne)
  neubauer: "/gruene/neubauer/", // Luisa Neubauer (Grüne)
  luisa_neubauer: "/gruene/neubauer/", // Luisa Neubauer (Grüne)
  annalena_baerbock: "/gruene/baerbock/", // Annalena Baerbock (Grüne)
  baerbock: "/gruene/baerbock/", // Annalena Baerbock (Grüne)
  ricarda_lang: "/gruene/lang/", // Ricarda Lang (Grüne)
  lang: "/gruene/lang/", // Ricarda Lang (Grüne)
  merz: "/cducsu/merz/",
  friedrich_merz: "/cducsu/merz/",
  fotzenfritz: "/cducsu/merz/",
  fotzen_fritz: "/cducsu/merz/",
  heidi_reichinnek: "/linke/reichinnek/",
  reichinnek: "/linke/reichinnek/",
  baerbel_bas: "/spd/bas/",
  bärbel_bas: "/spd/bas/",
  bas: "/spd/bas/", // Nancy Faeser (SPD)
  musk: "/usa/musk/",
  elon_musk: "/usa/musk/",
  patricia_schlesinger: "/oerr/schlesinger/",
  schlesinger: "/oerr/schlesinger/",
  andy_grote: "/spd/grote/",
  grote: "/spd/grote/",
  pimmel: "/spd/grote/",
  pimmelgate: "/spd/grote/",
  oerr: "/oerr/",
  ard: "/oerr/",
  zdf: "/oerr/",
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
      // selectedResultIndex = 0; // Commented out to prevent automatic selection
      // updateSelection(); // Commented out to prevent visual update
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
  handleSearch(e.target.value); // Your search logic
  selectedResultIndex = -1; // Reset selection
  updateSelection(); // Clear the selected class
});

searchInput.addEventListener("keydown", (e) => {
  if (searchResults.style.display === "block") {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevents page scrolling
      if (selectedResultIndex < searchResults.children.length - 1) {
        selectedResultIndex++;
      } else {
        selectedResultIndex = 0; // Loops back to the first item
      }
      updateSelection();
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevents page scrolling
      if (selectedResultIndex > 0) {
        selectedResultIndex--;
      } else {
        selectedResultIndex = searchResults.children.length - 1; // Loops to the last item
      }
      updateSelection();
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevents form submission
      if (
        selectedResultIndex !== -1 &&
        searchResults.children[selectedResultIndex]
      ) {
        const link =
          searchResults.children[selectedResultIndex].getAttribute("data-link");
        window.location.href = link; // Navigates to the selected link
      }
    }
  }
});

// Format names
function formatName(name, query) {
  const uppercaseNames = [
    "spd",
    "cdu/csu",
    "fdp",
    "afd",
    "bsw",
    "örr",
    "oerr",
    "ard",
    "zdf",
  ];

  if (uppercaseNames.includes(name.toLowerCase())) {
    return name.toUpperCase();
  }

  // Priorität: Custom Search Results (Schönere Namen aus der Liste oben)
  if (customSearchResults[name.toLowerCase()]) {
    return customSearchResults[name.toLowerCase()];
  }

  // Fallback: Erster Buchstabe groß
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// Mouse click handling
searchResults.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("search-item")) {
    const pageLink = e.target.getAttribute("data-link");
    window.location.href = pageLink;
  }
});

// Mouse hover effects
searchResults.addEventListener(
  "mouseover",
  (e) => {
    const searchItem = e.target.closest(".search-item");
    if (searchItem) {
      searchItem.classList.add("hover");
      console.log("Hover added to:", searchItem.textContent);
    }
  },
  true
);

searchResults.addEventListener(
  "mouseout",
  (e) => {
    const searchItem = e.target.closest(".search-item");
    if (searchItem) {
      searchItem.classList.remove("hover");
      console.log("Hover removed from:", searchItem.textContent);
    }
  },
  true
);

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

// Update selection for keyboard navigation
function updateSelection() {
  const searchItems = searchResults.children;
  for (let i = 0; i < searchItems.length; i++) {
    const item = searchItems[i];
    if (i === selectedResultIndex) {
      item.classList.add("selected");
      item.setAttribute("aria-selected", "true");
    } else {
      item.classList.remove("selected");
      item.setAttribute("aria-selected", "false");
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

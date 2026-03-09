// js/storage.js
const KEY = "KEY";

 import { G } from "./data.js";

let popupEnabled = false;

function debug(msg, data) {
  const line = `[storage] ${msg}`;
  if (data !== undefined) console.log(line, data);
  else console.log(line);

  if (popupEnabled) alert(line);
}

export function enableStoragePopup(on = false) {
  popupEnabled = !!on;
  debug(`Popup ${popupEnabled ? "ON" : "OFF"}`);
}

/* export function hasSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const obj = JSON.parse(raw);
    return !!(obj && obj.G);
  } catch {
    return false;
  }
} */

/* export function saveGame(G, reason = "") {
  try {
    const payload = { v: 1, t: Date.now(), reason, G };
    localStorage.setItem(KEY, JSON.stringify(payload));
    debug(`Saved OK${reason ? " (" + reason + ")" : ""}`, payload);
    return true;
  } catch (e) {
    console.error("[storage] saveGame failed", e);
    alert("[storage] saveGame failed: " + e.message);
    return false;
  }
} */

/* export function loadGame() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      debug("No save found");
      return null;
    }
    const obj = JSON.parse(raw);
    debug("Loaded OK", obj);
    return obj && obj.G ? obj.G : null;
  } catch (e) {
    console.error("[storage] loadGame failed", e);
    alert("[storage] loadGame failed: " + e.message);
    return null;
  }
} */

/* export function peekSaveMeta() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    return { v: obj.v, t: obj.t, reason: obj.reason };
  } catch {
    return null;
  }
} */

/* export function clearSave() {
  localStorage.removeItem(KEY);
  debug("Cleared save");
} */




// Gem spiltilstand til localStorage
export function gemSpil(etapeFærdig) {
    var saveData = {
        version: 1,
        navn: G.navn,
        tourNr: G.tourNr,
        enr: G.enr,
        etapeFærdig: etapeFærdig || false,
        stilTab: G.stilTab,
        sprPts: G.sprPts,
        bjgPts: G.bjgPts,
        ryttere: [],
        bonusPoint: G.bonusPoint || 0
    };
    
    // Gem rytterdata
    for (var i = 0; i < G.ryttere.length; i++) {
        var r = G.ryttere[i];
        saveData.ryttere.push({
            navn: r.navn,
            orig: r.orig,
            hold: r.hold,
            holdAbbr: r.holdAbbr,
            holdClr: r.holdClr,
            sp: r.sp,
            gc: r.gc,
            bj: r.bj,
            spr: r.spr,
            tt: r.tt,
            ud: r.ud,
            re: r.re,
            fl: r.fl,
            energi: r.energi,
            stid: r.stid,
            ude: r.ude
        });
    }
    
    // Gem etaper
    saveData.etaper = G.etaper;
    
    localStorage.setItem('KEY', JSON.stringify(saveData));
    console.log('Spil gemt!');
}

// Hent spiltilstand fra localStorage
export function hentSpil() {
    var saved = localStorage.getItem('KEY');
    if (!saved) return null;
    
    try {
        return JSON.parse(saved);
    } catch (e) {
        console.error('Fejl ved indlæsning af gemt spil:', e);
        return null;
    }
}

// Slet gemt spil
function sletGemtSpil() {
    localStorage.removeItem('KEY');
    console.log('Gemt spil slettet!');
}

// Check om der er et gemt spil
export function harGemtSpil() {
    return localStorage.getItem('KEY') !== null;
}
    
export function indlaesGemtSpil() {
    var saveData = hentSpil();
    if (!saveData) return false;
    
    // Check version
    var CURRENT_VERSION = 1;
    if (!saveData.version || saveData.version < CURRENT_VERSION) {
        console.log('Gammelt save format - sletter og starter forfra');
        sletGemtSpil();
        return false;
    }
    
    G.navn = saveData.navn;
    G.tourNr = saveData.tourNr;
    G.enr = saveData.enr;
    G.stilTab = saveData.stilTab || "gc";
    G.sprPts = saveData.sprPts;
    G.bjgPts = saveData.bjgPts;
    G.etaper = saveData.etaper;
    G.bonusPoint = saveData.bonusPoint || 0;
    
    G.ryttere = [];
    for (var i = 0; i < saveData.ryttere.length; i++) {
        var r = saveData.ryttere[i];
        G.ryttere.push(r);
        if (r.sp) G.spiller = G.ryttere[G.ryttere.length - 1];
    }
    
    // Hvis etapen var færdig, gå til næste
    if (saveData.etapeFærdig) {
        if (G.enr >= 20) {
            // Sidste etape var færdig - vis slutresultat i stedet
            G.enr = 20;  // Behold på 20
            return 'slut';  // Returnér special værdi
        } else {
            G.enr++;
        }
    }

    return true;
}

export function fortsaetSpil() {
    var result = indlaesGemtSpil();
    if (result === 'slut') {
        slut();  // Vis slutresultat
    } else if (result) {
        startEtape();  // Start næste etape
    } else {
        alert('Kunne ikke indlæse gemt spil');
        intro();
    }
}
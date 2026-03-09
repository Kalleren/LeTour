import * as game from "./game.js";

import {enableStoragePopup, gemSpil, hentSpil, harGemtSpil, indlaesGemtSpil, fortsaetSpil} from "./storage.js";

enableStoragePopup(false);

Object.assign(window, game);

import { G, TEAMS, ETYPER, BYER, BONUS, SPR_PTS_FINISH, BJG_PTS_FINISH, INT_PTS } from "./data.js";

import { $, ri } from "./utils.js";

window.startGame = startGame;
window.visInstruktioner = visInstruktioner;
window.rytterInfo = rytterInfo;
window.rerollRytter = rerollRytter;
window.startEtape = startEtape;
window.startNorm = startNorm;


// ========== WAKE LOCK (hold skærm tændt) ==========

var wakeLock = null;

// Anmod om wake lock
async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock aktiv - skærmen slukker ikke');
            
            // Lyt efter release (fx hvis bruger skifter tab)
            wakeLock.addEventListener('release', function() {
                console.log('Wake Lock frigivet');
            });
        } catch (err) {
            console.log('Wake Lock fejl:', err.message);
        }
    }
}

// Frigiv wake lock
function releaseWakeLock() {
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log('Wake Lock frigivet manuelt');
    }
}

// Genaktiver wake lock når brugeren kommer tilbage til siden
document.addEventListener('visibilitychange', async function() {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        await requestWakeLock();
    }
});

// Keyboard
document.addEventListener("keydown", function(e) {
    // Ignorer tastetryk hvis man skriver i et input-felt
    if (e.target.tagName === "INPUT") return;
    
    var k = e.key.toLowerCase();
    if (k === "a") accel();
    else if (k === "p") pause();
    else if (k === "u" && G.vent && G.udata) accUdb();
    else if (k === "n" && G.vent && G.udata) rejUdb();
});

//Indlæser gemt spil hvis det findes
const saved = harGemtSpil() ? indlaesGemtSpil() : null;
if (saved) {
	fortsaetSpil()
} else {
  intro();
}



import * as game from "./game.js";

import { loadGame, hasSave, enableStoragePopup  } from "./storage.js";

enableStoragePopup(true);

Object.assign(window, game);

import { G, TEAMS, ETYPER, BYER, BONUS, SPR_PTS_FINISH, BJG_PTS_FINISH, INT_PTS } from "./data.js";

import { $, ri } from "./utils.js";

window.startGame = startGame;
window.visInstruktioner = visInstruktioner;
window.rytterInfo = rytterInfo;
window.rerollRytter = rerollRytter;
window.startEtape = startEtape;
window.startNorm = startNorm;


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
const saved = hasSave() ? loadGame() : null;
if (saved) {
  Object.assign(G, saved);
  resumeFromSave();
} else {
  intro();
}

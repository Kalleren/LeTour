// js/storage.js
const KEY = "letour_save_v1";

let popupEnabled = false;

function debug(msg, data) {
  const line = `[storage] ${msg}`;
  if (data !== undefined) console.log(line, data);
  else console.log(line);

  if (popupEnabled) alert(line);
}

export function enableStoragePopup(on = true) {
  popupEnabled = !!on;
  debug(`Popup ${popupEnabled ? "ON" : "OFF"}`);
}

export function hasSave() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    const obj = JSON.parse(raw);
    return !!(obj && obj.G);
  } catch {
    return false;
  }
}

export function saveGame(G, reason = "") {
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
}

export function loadGame() {
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
}

export function peekSaveMeta() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    return { v: obj.v, t: obj.t, reason: obj.reason };
  } catch {
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(KEY);
  debug("Cleared save");
}
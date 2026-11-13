/**
 * Cyberpunk RED - ND Core: Russian translation.
 *
 * Interface strings are loaded by Foundry from lang/ru.json. Compendium content is
 * translated by Babele from babele/ru, which this script registers.
 *
 * The system itself registers the CPR specific Babele mapping (dvTable) and resolves
 * documents by their original English names, so translated names are safe for mechanics.
 */
const MODULE_ID = "cpr-ru";

const register = (babele) => {
  if (!babele || typeof babele.register !== "function") {
    console.warn(`${MODULE_ID} | Babele is not available; compendia stay in English.`);
    return;
  }
  babele.register({
    module: MODULE_ID,
    lang: "ru",
    dir: "babele/ru",
  });
};

// Babele creates its instance in its own "init" hook and announces it with
// "babele.init". Depending on module load order that may already have happened.
if (globalThis.game?.babele) {
  register(game.babele);
} else {
  let registered = false;
  const once = (babele) => {
    if (registered) return;
    registered = true;
    register(babele);
  };
  Hooks.once("babele.init", once);
  Hooks.once("init", () => {
    if (game.babele) once(game.babele);
  });
}

Hooks.once("ready", () => {
  if (game.i18n.lang !== "ru") return;
  if (!game.modules.get("babele")?.active && game.user.isGM) {
    ui.notifications.warn(
      "Cyberpunk RED — русский перевод: модуль Babele не включён, компендиумы останутся на английском."
    );
  }
});

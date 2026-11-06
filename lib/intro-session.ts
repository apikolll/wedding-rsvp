// Remembers whether the intro was opened, so it doesn't replay when the guest
// comes back with the back button. A refresh (or a fresh visit) plays it again.
//
// - Module state survives client-side navigation (e.g. /rsvp → back), since the
//   JS document stays alive.
// - sessionStorage covers a back navigation that reloads the page (e.g. after
//   leaving the site), which we tell apart from a refresh by the navigation type.

const KEY = "intro-opened";

let opened: boolean | null = null; // null = not decided yet for this document
let savedScrollY = 0;

const read = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

/** Safe during render: returns false on the server and on the first hydration. */
export const introAlreadyOpened = () => opened === true;

/** Call once on the client after mount. Decides for this document. */
export const resolveIntroOpened = () => {
  if (opened !== null) return opened;

  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (nav?.type === "back_forward") {
    opened = read();
  } else {
    // reload or a fresh visit → play the intro again
    opened = false;
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  }
  return opened;
};

export const markIntroOpened = () => {
  opened = true;
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
};

export const saveScrollY = (y: number) => {
  savedScrollY = y;
};

export const getSavedScrollY = () => savedScrollY;

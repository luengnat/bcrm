(() => {
  const storageKey = "bcrm.crm.language";
  const toggle = document.querySelector("#lang, #language, #languageButton, #languageToggle");
  if (!toggle) return;

  const currentLanguage = () => {
    const label = (toggle.getAttribute("aria-label") || "").trim().toLowerCase();
    if (/switch to english|change to english|สลับเป็นภาษาอังกฤษ|เปลี่ยนเป็นภาษาอังกฤษ/.test(label)) return "th";
    if (/switch to thai|change to thai|สลับเป็นภาษาไทย|เปลี่ยนเป็นภาษาไทย/.test(label)) return "en";

    const buttonText = (toggle.textContent || "").trim().toLowerCase();
    if (["en", "english", "ภาษาอังกฤษ"].includes(buttonText)) return "th";
    if (["th", "thai", "ไทย", "ภาษาไทย"].includes(buttonText)) return "en";

    const documentLanguage = (document.documentElement.lang || "").toLowerCase();
    if (documentLanguage.startsWith("th")) return "th";
    if (documentLanguage.startsWith("en")) return "en";
    if (document.body.classList.contains("th")) return "th";
    if (document.body.classList.contains("en")) return "en";
    return "th";
  };

  let preferredLanguage = "th";
  try {
    preferredLanguage = localStorage.getItem(storageKey) || "th";
  } catch {
    // Keep the page usable when browser storage is unavailable.
  }
  if (preferredLanguage !== "en" && preferredLanguage !== "th") preferredLanguage = "th";

  if (currentLanguage() !== preferredLanguage) toggle.click();
  try {
    localStorage.setItem(storageKey, preferredLanguage);
  } catch {
    // Language still works for this page even when it cannot be remembered.
  }

  toggle.addEventListener("click", () => {
    window.setTimeout(() => {
      try {
        localStorage.setItem(storageKey, currentLanguage());
      } catch {
        // Leave the current page's selected language in place.
      }
    }, 0);
  });
})();

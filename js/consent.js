document.addEventListener("DOMContentLoaded", function() {
  // === Inject template into banner ===
  const template = document.getElementById("consent-template");
  const clone = template.content.cloneNode(true);
  document.getElementById("cookie-banner").appendChild(clone);

  // === Open / Close Functions ===
  function openBanner() {
    let saved = JSON.parse(localStorage.getItem("cookieConsent")) || {};
    document.getElementById("functional").checked = saved.functional || false;
    document.getElementById("analytics").checked = saved.analytics || false;
    document.getElementById("performance").checked = saved.performance || false;

    const banner = document.getElementById("cookie-banner");
    banner.style.display = "block";
  }

  document.getElementById("close-banner").onclick = () => {
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("cookieSeen", "true"); // mark as seen
  };

  // === Event Listeners ===
  document.getElementById("manage-cookies-btn").onclick = openBanner;

  document.getElementById("reject-all").onclick = () => {
    document.getElementById("functional").checked = false;
    document.getElementById("analytics").checked = false;
    document.getElementById("performance").checked = false;
  };

  document.getElementById("accept-all").onclick = () => {
    document.getElementById("functional").checked = true;
    document.getElementById("analytics").checked = true;
    document.getElementById("performance").checked = true;
  };

  document.getElementById("save-prefs").onclick = () => {
    let consent = {
      functional: document.getElementById("functional").checked,
      analytics: document.getElementById("analytics").checked,
      performance: document.getElementById("performance").checked
    };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    document.getElementById("cookie-banner").style.display = "none";
    localStorage.setItem("cookieSeen", "true"); // mark as seen

    if (consent.analytics) {
      loadAnalytics();
    }
  };

  // === Analytics Loader ===
  function loadAnalytics() {
    let consent = JSON.parse(localStorage.getItem("cookieConsent"));
    if (consent && consent.analytics) {
      var gaScript = document.createElement("script");
      gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-WTDLZV4CGV";
      gaScript.async = true;
      document.head.appendChild(gaScript);

      gaScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag("js", new Date());
        gtag("config", "G-WTDLZV4CGV");
      };
    }
  }

  // === First-time logic ===
  let savedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
  let cookieSeen = localStorage.getItem("cookieSeen");

  if (savedConsent) {
    if (savedConsent.analytics) loadAnalytics();
  } else if (!cookieSeen) {
    openBanner(); // show only first visit if not seen
  }
});

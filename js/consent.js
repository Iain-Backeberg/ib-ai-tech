document.addEventListener("DOMContentLoaded", function() {
  // 1. Clone template content into banner
  const template = document.getElementById("consent-template");
  const clone = template.content.cloneNode(true);
  document.getElementById("cookie-banner").appendChild(clone);

  // 2. Now all elements exist — safe to use getElementById
  function saveConsent(consent) {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
  }

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

    // === OPEN / CLOSE FUNCTIONS ===
  function openBanner() {
    let saved = JSON.parse(localStorage.getItem("cookieConsent")) || {};
    document.getElementById("functional").checked = saved.functional || false;
    document.getElementById("analytics").checked = saved.analytics || false;
    document.getElementById("performance").checked = saved.performance || false;

    document.getElementById("cookie-banner").style.display = "block";
  }

  document.getElementById("close-banner").onclick = () => {
    document.getElementById("cookie-banner").style.display = "none";
  };
  // Event bindings
  document.getElementById("manage-cookies-btn").onclick = openBanner;
  document.getElementById("close-banner").onclick = () => {
    document.getElementById("cookie-banner").style.bottom = "-700px";
  };

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
    saveConsent(consent);
    document.getElementById("cookie-banner").style.bottom = "-700px";

    if (consent.analytics) {
      loadAnalytics();
    }
  };

  // First-time behaviour
  let savedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
  if (savedConsent) {
    if (savedConsent.analytics) {
      loadAnalytics();
    }
  } else {
    openBanner(); // show automatically first time
  }
});

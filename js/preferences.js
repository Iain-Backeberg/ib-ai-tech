document.addEventListener("DOMContentLoaded", function() {

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

      // ✅ Update consent now that analytics is allowed
      gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });

      // Fire a pageview immediately
      gtag('event', 'page_view');
    };
  }
}
    }
  }
// Fire a pageview immediately
  gtag('event', 'page_view');
};
  // Open the banner
  document.getElementById("manage-cookies-btn").onclick = () => {
    let saved = JSON.parse(localStorage.getItem("cookieConsent")) || {};
    document.getElementById("functional").checked = saved.functional || false;
    document.getElementById("analytics").checked = saved.analytics || false;
    document.getElementById("performance").checked = saved.performance || false;

    let banner = document.getElementById("cookie-banner");
    let bannerHeight = banner.offsetHeight;
    banner.style.bottom = `calc(50% - ${bannerHeight / 2}px)`;
  };

  // Close banner without saving
  document.getElementById("close-banner").onclick = () => {
    document.getElementById("cookie-banner").style.bottom = "-700px";
  };

  // Reject all except necessary — only updates toggles visually
  document.getElementById("reject-all").onclick = () => {
    document.getElementById("functional").checked = false;
    document.getElementById("analytics").checked = false;
    document.getElementById("performance").checked = false;
  };

  // Accept all — only updates toggles visually
  document.getElementById("accept-all").onclick = () => {
    document.getElementById("functional").checked = true;
    document.getElementById("analytics").checked = true;
    document.getElementById("performance").checked = true;
  };

  // Save preferences — updates localStorage and loads GA if Analytics is on
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

  // Auto-load analytics if previously consented
  let savedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
  if (savedConsent && savedConsent.analytics) {
    loadAnalytics();
  }

});

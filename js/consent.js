document.addEventListener("DOMContentLoaded", function() {

  function saveConsent(consent) {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
  }

  function loadAnalytics() {
    let consent = JSON.parse(localStorage.getItem("cookieConsent"));
    if (consent && consent.analytics) {
      if (!document.querySelector('script[src*="googletagmanager"]')) {
        const gaScript = document.createElement("script");
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
  }

  // Dynamically load consent form into #dynamic-content
  window.loadConsent = function() {
    const template = document.getElementById("consent-template");
    document.getElementById("dynamic-content").innerHTML = template.innerHTML;

    let saved = JSON.parse(localStorage.getItem("cookieConsent")) || {};
    document.getElementById("functional").checked = saved.functional || false;
    document.getElementById("analytics").checked = saved.analytics || false;
    document.getElementById("performance").checked = saved.performance || false;
  };

  // Event delegation for dynamically loaded buttons
  document.getElementById("dynamic-content").addEventListener("click", function(e) {
    const saveBtn = e.target.closest("#save-prefs");
    const acceptBtn = e.target.closest("#accept-all");
    const rejectBtn = e.target.closest("#reject-all");

    if (saveBtn) {
      let consent = {
        functional: document.getElementById("functional").checked,
        analytics: document.getElementById("analytics").checked,
        performance: document.getElementById("performance").checked
      };
      saveConsent(consent);

      // Replace content with thank-you message
      document.getElementById("dynamic-content").innerHTML =
        "<h2>Consent Preferences</h2>Thank You. Your preferences have been saved. You can amend them at any time.";

      if (consent.analytics) loadAnalytics();
    }

    if (acceptBtn) {
      document.getElementById("functional").checked = true;
      document.getElementById("analytics").checked = true;
      document.getElementById("performance").checked = true;
    }

    if (rejectBtn) {
      document.getElementById("functional").checked = false;
      document.getElementById("analytics").checked = false;
      document.getElementById("performance").checked = false;
    }
  });

  // Manage Cookies button loads the form dynamically
  const manageBtn = document.getElementById("manage-cookies-btn");
  if (manageBtn) {
    manageBtn.onclick = () => loadConsent();
  }

  // Auto-load analytics if previously consented
  let savedConsent = JSON.parse(localStorage.getItem("cookieConsent"));
  if (savedConsent && savedConsent.analytics) {
    loadAnalytics();
  }

});

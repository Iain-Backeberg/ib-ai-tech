const mainContent = document.getElementById("dynamic-content").innerHTML;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // can change to "auto" if you don’t want animation
  });
}

function restoreMain() {
  const container = document.getElementById("dynamic-content");
  container.innerHTML = mainContent;
      scrollToTop();

}
function loadTerms() {
  const container = document.getElementById("dynamic-content");
  const termsTemplate = document.getElementById("terms-template").innerHTML;
  container.innerHTML = termsTemplate;
    scrollToTop();

}
function loadPrivacy() {
  const container = document.getElementById("dynamic-content");
  const privacyTemplate = document.getElementById("privacy-template").innerHTML;
  container.innerHTML = privacyTemplate;
  scrollToTop();

}
function loadCookies() {
  const container = document.getElementById("dynamic-content");
  const cookiesTemplate = document.getElementById("cookies-template").innerHTML;
  container.innerHTML = cookiesTemplate;
  scrollToTop();

}
function loadChat() {
  const container = document.getElementById("dynamic-content");
  const chatTemplate = document.getElementById("chat-template").innerHTML;
  container.innerHTML = chatTemplate;
  scrollToTop();

}

function loadConsent() {
  const container = document.getElementById("dynamic-content"); // same container as Terms/Privacy
  const consentTemplate = document.getElementById("consent-template").innerHTML;
  container.innerHTML = consentTemplate;
    scrollToTop();
  }

  
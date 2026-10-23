(function () {
  var NAV = [
    ["index.html", "nav.home"],
    ["story.html", "nav.story"],
    ["schedule.html", "nav.schedule"],
    ["venue.html", "nav.venue"],
    ["stay.html", "nav.stay"],
    ["rsvp.html", "nav.rsvp"],
    ["faq.html", "nav.faq"],
    ["registry.html", "nav.registry"]
  ];
  var page = document.body.getAttribute("data-page") || "";
  var LANG_KEY = "ja_lang";
  var GATE_KEY = "ja_gate_v" + ((window.SITE && window.SITE.gateVersion) || "1");

  function store(get, k, v) {
    try { return get ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) { return null; }
  }

  var lang = store(true, LANG_KEY);
  if (lang !== "en" && lang !== "es") {
    lang = (navigator.language || "en").toLowerCase().indexOf("es") === 0 ? "es" : "en";
  }

  function t(key) {
    var d = window.I18N[lang] || window.I18N.en;
    return d[key] !== undefined ? d[key] : (window.I18N.en[key] || key);
  }

  function langButtons() {
    return '<div class="lang" role="group" aria-label="' + t("lang.label") + '">' +
      '<button type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
      '<button type="button" data-lang="es" aria-pressed="' + (lang === "es") + '">ES</button></div>';
  }

  function render() {
    var header = document.getElementById("site-header");
    if (header) {
      var links = NAV.map(function (n) {
        var cur = n[0] === page + ".html" || (page === "home" && n[0] === "index.html");
        return '<a href="' + n[0] + '"' + (cur ? ' aria-current="page"' : "") + ">" + t(n[1]) + "</a>";
      }).join("");
      header.innerHTML = '<div class="tile-band" aria-hidden="true"></div>' +
        '<div class="site-header"><a class="monogram" href="index.html" aria-label="J &amp; A">J &amp; A</a>' +
        '<nav class="site-nav" aria-label="Main">' + links + "</nav>" + langButtons() + "</div>";
    }
    var footer = document.getElementById("site-footer");
    if (footer) {
      footer.innerHTML = '<div class="site-footer"><span class="monogram">J &amp; A</span><p>' + t("foot.line") +
        '</p></div><div class="tile-band" aria-hidden="true"></div>';
    }
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n-html"));
    });
    var titleKey = document.body.getAttribute("data-title");
    if (titleKey) document.title = t(titleKey);
    renderGate();
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        lang = b.getAttribute("data-lang");
        store(false, LANG_KEY, lang);
        render();
      });
    });
  }

  function renderGate() {
    var host = document.getElementById("gate-root");
    if (!host) {
      host = document.createElement("div");
      host.id = "gate-root";
      document.body.appendChild(host);
    }
    if (store(true, GATE_KEY) === "1") { host.innerHTML = ""; document.body.style.overflow = ""; return; }
    var prev = document.getElementById("gate-email");
    var keep = prev ? prev.value : "";
    host.innerHTML =
      '<div class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-h">' +
      '<div class="tile-band" aria-hidden="true"></div>' +
      '<div class="gate-top">' + langButtons() + "</div>" +
      '<div class="gate-wrap"><div class="gate-card">' +
      '<span class="monogram">J &amp; A</span>' +
      '<p class="eyebrow" style="margin-top:20px">' + t("tagline") + "</p>" +
      '<h2 id="gate-h">' + t("gate.h") + "</h2>" +
      '<p class="t">' + t("gate.p") + "</p>" +
      '<form id="gate-form" novalidate>' +
      '<div class="field"><label for="gate-email">' + t("gate.email") + "</label>" +
      '<input id="gate-email" name="email" type="email" autocomplete="email" required></div>' +
      '<input class="hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<p id="gate-err" class="form-msg err" role="alert" hidden>' + t("gate.err") + "</p>" +
      '<button class="btn" type="submit">' + t("gate.btn") + "</button></form>" +
      '<p class="fine">' + t("gate.fine") + "</p></div></div></div>";
    document.body.style.overflow = "hidden";
    var input = document.getElementById("gate-email");
    input.value = keep;
    document.getElementById("gate-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      var email = f.email.value.trim();
      if (f.company.value || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
        document.getElementById("gate-err").hidden = false;
        return;
      }
      var ep = window.SITE && window.SITE.emailEndpoint;
      if (ep) {
        try {
          fetch(ep, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, lang: lang, page: page })
          }).catch(function () {});
        } catch (err) {}
      }
      store(false, GATE_KEY, "1");
      renderGate();
    });
  }

  // RSVP form
  function initRsvp() {
    var form = document.getElementById("rsvp-form");
    if (!form) return;
    var msg = document.getElementById("rsvp-msg");
    function show(key, isErr) {
      msg.hidden = false;
      msg.className = "form-msg" + (isErr ? " err" : "");
      msg.textContent = t(key);
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.company.value) return;
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        attending: form.attending.value,
        party: form.party.value,
        diet: form.diet.value.trim(),
        message: form.message.value.trim(),
        lang: lang
      };
      if (!data.name || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(data.email)) { show("f.invalid", true); return; }
      var ep = window.SITE && window.SITE.rsvpEndpoint;
      if (!ep) { show("f.notLive", true); return; }
      fetch(ep, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw new Error("bad"); show("f.ok", false); form.reset(); })
        .catch(function () { show("f.err", true); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () { render(); initRsvp(); });
})();

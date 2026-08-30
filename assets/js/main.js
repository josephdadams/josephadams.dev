/* josephadams.dev — small enhancements. Everything here is optional;
   the page is fully readable with JS disabled. */
(function () {
  'use strict';

  // Current year in the footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Live GitHub numbers, with the static values in the HTML as the fallback.
  var API = 'https://api.github.com/users/josephdadams/repos?per_page=100&type=owner';

  function setStat(name, value) {
    var el = document.querySelector('[data-stat="' + name + '"]');
    if (el) el.textContent = value.toLocaleString();
  }

  fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (res) {
      if (!res.ok) throw new Error('github ' + res.status);
      return res.json();
    })
    .then(function (repos) {
      if (!Array.isArray(repos)) return;

      var owned = repos.filter(function (r) { return !r.fork; });
      var stars = owned.reduce(function (sum, r) { return sum + (r.stargazers_count || 0); }, 0);

      setStat('repos', owned.length);
      setStat('stars', stars);

      // Per-project star badges
      var byName = {};
      owned.forEach(function (r) { byName[r.name.toLowerCase()] = r.stargazers_count || 0; });

      document.querySelectorAll('.stars[data-repo]').forEach(function (el) {
        var count = byName[el.dataset.repo.toLowerCase()];
        if (typeof count !== 'number') return;
        // A zero-star badge says nothing worth the space.
        if (count === 0) { el.hidden = true; return; }
        el.textContent = '★ ' + count.toLocaleString();
      });

      return fetch('https://api.github.com/users/josephdadams');
    })
    .then(function (res) { return res && res.ok ? res.json() : null; })
    .then(function (user) {
      if (user && typeof user.followers === 'number') setStat('followers', user.followers);
    })
    .catch(function () {
      /* Rate-limited or offline — the static numbers already on the page stand. */
    });
})();

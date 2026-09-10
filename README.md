# Practical Science Platform

A modern, responsive practical-science learning website with an interactive frontend and a small PHP backend foundation.

## Structure

- `index.html` — homepage and application shell
- `assets/css/style.css` — responsive UI styles
- `assets/js/app.js` — activity data, search, filters, modal lessons, theme toggle, mobile navigation, and contact form interaction
- `backend/config.php` — backend configuration foundation
- `backend/api.php` — simple JSON health endpoint / API entry point
- `backend/.htaccess` — Apache routing foundation

## Run locally

For the static frontend, open `index.html` in a browser or serve the repository with any static web server.

For the PHP backend, use PHP 8+ with Apache and enable URL rewriting. The API entry point can be served through `backend/api.php`.

## Next steps

The structure is intentionally simple so it can be extended with a database, authentication, teacher/student dashboards, experiment submissions, quizzes, and a full REST API without replacing the frontend.

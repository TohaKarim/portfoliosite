# Toha Karim Sujal - Portfolio Website

Pure HTML + CSS + JavaScript. No build step, no frameworks.

## Run it
Open `index.html` in a browser (double-click), or serve the folder:

    python3 -m http.server 8000     # then visit http://localhost:8000

## Pages
| File | Purpose |
|------|---------|
| index.html | Home: photo, introduction, featured projects |
| resume.html | Personal info, stats, education, skills, courses, **viewable + downloadable CV** |
| projects.html | Project overview with filters |
| project-weather.html | Project A: FastAPI weather app |
| project-library.html | Project B: Library management system |
| project-games.html | Project C: Python games (Snake, Blocks, retro platformer) |
| contact.html | Contact details + message form |

## Things to personalise
1. **CV**: replace `assets/Toha_Karim_Sujal_CV.pdf` with your real CV (keep the file name, or change `CONFIG.cv` in `js/main.js`). The included file is a sample.
2. **Social links**: edit `CONFIG.social` at the top of `js/main.js` (currently `#`).
3. **Education**: replace "Your University Name" / "Your College Name" in `resume.html`.
4. **Project images**: `images/projects/*.png` are illustrative visuals. Swap in your real screenshots, sketches and diagrams (same file names, or edit the `<img>` tags).
5. **Skill percentages**, stats and course list in `resume.html`.
6. **Colours / fonts**: CSS variables at the top of `css/style.css` (visitors can also use the gear button to switch accent colour).
7. **Contact form**: opens the visitor's email app with the message pre-filled. For a real backend form, point the `<form>` to a service such as Formspree.

## Folder structure
    portfolio/
    |- index.html, resume.html, projects.html, contact.html
    |- project-weather.html, project-library.html, project-games.html
    |- css/style.css
    |- js/main.js, js/icons.js
    |- images/profile.png, favicon.svg, projects/*.png
    |- assets/Toha_Karim_Sujal_CV.pdf

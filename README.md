# Welcome to Sunkanmhy's Portfolio

## Live pages

| Page | Purpose |
|---|---|
| `index.html` | Landing page — hero intro, recent project highlights, stack overview, recent write-ups, and client testimonials |
| `about.html` | Background, career timeline, full-stack "operation module", and certifications |
| `skills.html` | Detailed breakdown of languages, frameworks, tools, and infrastructure |
| `projects.html` | Full, filterable project archive across static sites, portals, e-commerce, CMS, and enterprise apps |
| `contact.html` | Contact form, quote request form, and direct contact details |

## Highlights

- **Full-stack delivery, not just a template** — every project featured is a real client
  engagement covering everything from database schema to deployed UI: hospitality booking
  platforms, education portals, NGO landing sites, and multi-role admin dashboards.
- **Custom UI components built from scratch**, including an animated typing terminal, a
  filterable project grid, image carousels on each project card, star-rated testimonials, and a
  light/dark theme toggle persisted across sessions via `localStorage`.
- **Real, working contact pipeline** — the contact, quote, and newsletter forms are wired to a
  serverless email function (not a dead `mailto:` link), sending through the Resend API and
  forwarding submissions straight to the developer's inbox.
- **Responsive and accessible** by default — semantic HTML, `aria-label`s on interactive
  controls, `loading="lazy"` images, and a mobile-first layout with no external UI framework
  dependency.

## Tech stack

**Frontend:** HTML5, modern CSS (custom properties, grid/flexbox, no preprocessor), vanilla
JavaScript (ES modules-free, dependency-free DOM scripting).

**Backend:** Node.js serverless function (`api/send-email.js`) deployed on Vercel, integrating
with the [Resend](https://resend.com) email API.

**Tooling/Infra referenced across featured projects:** TypeScript, React, Python, PostgreSQL,
Docker, AWS, Supabase, Railway.

## Project structure

```
├── index.html          # Landing page
├── about.html           # About / career timeline
├── skills.html          # Skills & stack breakdown
├── projects.html        # Full project archive
├── contact.html         # Contact, quote & newsletter forms
├── style.css            # Design system (colors, layout, components)
├── script.js             # UI behavior (nav, carousels, forms, filters, animations)
├── api/
│   └── send-email.js    # Vercel serverless function — sends form submissions via Resend
├── images/               # Local image assets (see images/README.md for required filenames)
└── package.json
```

## Getting started locally

No build step or dependencies are required to view the site itself:

```bash
git clone https://github.com/Sunkhanmhy/Sunkanmhy-s-Portfolio.git
cd Sunkanmhy-s-Portfolio
# open index.html directly, or serve it locally, e.g.:
npx serve .
```

## Form email delivery

Contact, quote, and newsletter forms POST to `/api/send-email`, a serverless
function that sends through the Resend API and forwards every submission to
sunkanmhy@icloud.com.

Deploy on Vercel and set the environment variable:

```
RESEND_API_KEY=your_resend_api_key
```

See `.env.example` for local development.

## Contact

- **Email:** sunkanmhy@icloud.com
- **Location:** Lagos, Nigeria · Available remote worldwide
- **GitHub:** [github.com/Sunkhanmhy](https://github.com/Sunkhanmhy)
- **LinkedIn:** [linkedin.com/in/sunkanmhy](https://linkedin.com/in/sunkanmhy)

Currently open to freelance, contract, and full-time full-stack engineering roles. Reach out via
the [contact page](contact.html) or any of the channels above.

## License

See [LICENSE](LICENSE) for details.



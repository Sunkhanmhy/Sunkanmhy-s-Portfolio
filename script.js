/* ============================================================
   PORTFOLIO — SHARED SCRIPT
   ============================================================ */

/* ---------- Theme toggle ---------- */
(function initTheme(){
  const root = document.documentElement;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', prefersLight ? 'light' : 'dark');

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });
  });
})();

/* ---------- Mobile nav ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
});

/* ---------- WhatsApp float tooltip ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const wa = document.getElementById('waFloat');
  const tip = document.getElementById('waTooltip');
  if(!wa || !tip) return;
  let hideTimer;
  const reveal = () => {
    tip.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => tip.classList.remove('show'), 3200);
  };
  setTimeout(reveal, 1200);
  wa.addEventListener('mouseenter', () => tip.classList.add('show'));
  wa.addEventListener('mouseleave', () => tip.classList.remove('show'));
});

/* ---------- Terminal typing effect (home hero) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('terminalOutput');
  if(!el) return;

  const lines = [
    { type:'cmd', text:'whoami' },
    { type:'out', text:'>> Senior Software Engineer · 8+ yrs building scalable products' },
    { type:'cmd', text:'cat core_stack.json' },
    { type:'out', text:'>> { "backend": "Node · Go · Python", "frontend": "React · TypeScript" }' },
    { type:'cmd', text:'status --current' },
    { type:'out', text:'>> Available for select freelance & full-time roles' },
  ];

  let lineIndex = 0, charIndex = 0;
  el.innerHTML = '';

  function typeNext(){
    if(lineIndex >= lines.length){
      el.insertAdjacentHTML('beforeend', '<span class="prompt">$</span> <span class="cursor"></span>');
      return;
    }
    const line = lines[lineIndex];
    if(charIndex === 0){
      const rowClass = line.type === 'cmd' ? 'cmd' : 'out';
      const prefix = line.type === 'cmd' ? '<span class="prompt">$</span> ' : '';
      el.insertAdjacentHTML('beforeend', `<div class="term-line"><span class="${rowClass}" data-full="${line.text.replace(/"/g,'&quot;')}">${prefix}</span></div>`);
    }
    const rows = el.querySelectorAll('.term-line span[data-full]');
    const currentSpan = rows[rows.length - 1];
    const full = currentSpan.getAttribute('data-full');
    const prefix = line.type === 'cmd' ? '<span class="prompt">$</span> ' : '';
    currentSpan.innerHTML = prefix + full.slice(0, charIndex);

    charIndex++;
    if(charIndex <= full.length){
      setTimeout(typeNext, line.type === 'cmd' ? 45 : 12);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, line.type === 'cmd' ? 260 : 420);
    }
  }
  setTimeout(typeNext, 500);
});

/* ---------- Project filters (projects.html) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('[data-category]');
  if(!filterBtns.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const match = target === 'all' || card.getAttribute('data-category') === target;
        card.style.display = match ? '' : 'none';
      });
    });
  });
});

/* ---------- Skill bars animate on view ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.bar-fill');
  if(!bars.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        el.style.width = el.getAttribute('data-level') + '%';
        io.unobserve(el);
      }
    });
  }, { threshold:0.4 });
  bars.forEach(b => { b.style.width = '0%'; io.observe(b); });
});

/* ---------- Contact form (submits via FormSubmit — replace with your email) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!name || !emailPattern.test(email) || !message){
      status.textContent = 'Please fill in your name, a valid email, and a message.';
      status.className = 'form-status show err';
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try{
      const res = await fetch(form.action, {
        method:'POST',
        headers:{ 'Accept':'application/json' },
        body:new FormData(form)
      });
      if(res.ok){
        status.textContent = 'Message sent — thank you! I\'ll reply within 1–2 business days.';
        status.className = 'form-status show ok';
        form.reset();
      } else {
        throw new Error('bad response');
      }
    } catch(err){
      status.textContent = 'Could not send right now — please email me directly, or try again shortly.';
      status.className = 'form-status show err';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

/* ---------- Newsletter form ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  const status = document.getElementById('newsletterStatus');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(input.value.trim())){
      status.textContent = 'Enter a valid email to subscribe.';
      status.className = 'form-status show err';
      return;
    }

    const originalText = btn.textContent;
    btn.textContent = '…';
    btn.disabled = true;

    try{
      const res = await fetch(form.action, {
        method:'POST',
        headers:{ 'Accept':'application/json' },
        body:new FormData(form)
      });
      if(res.ok){
        status.textContent = 'Subscribed! Watch your inbox for updates.';
        status.className = 'form-status show ok';
        form.reset();
      } else {
        throw new Error('bad response');
      }
    } catch(err){
      status.textContent = 'Could not subscribe right now — please try again shortly.';
      status.className = 'form-status show err';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

/* ---------- Reveal-on-scroll for cards/sections ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.card, .proj-card, .stack-card, .quote-card');
  if(!targets.length || !('IntersectionObserver' in window)) return;
  targets.forEach(t => { t.style.opacity = '0'; t.style.transform = 'translateY(16px)'; t.style.transition = 'opacity .6s ease, transform .6s ease'; });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });
  targets.forEach(t => io.observe(t));
});

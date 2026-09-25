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

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('installBanner');
  const installBtn = document.getElementById('installAppBtn');
  const dismissBtn = document.getElementById('installDismiss');
  if(!banner || !installBtn || !dismissBtn) return;

  const DISMISS_KEY = 'sunkanmhy-install-dismissed';
  let deferredPrompt = null;

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if(isStandalone || localStorage.getItem(DISMISS_KEY) === '1') return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    banner.classList.add('show');
  });

  installBtn.addEventListener('click', async () => {
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    banner.classList.remove('show');
  });

  dismissBtn.addEventListener('click', () => {
    banner.classList.remove('show');
    localStorage.setItem(DISMISS_KEY, '1');
  });

  window.addEventListener('appinstalled', () => {
    banner.classList.remove('show');
    localStorage.setItem(DISMISS_KEY, '1');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('terminalOutput');
  if(!el) return;

  const lines = [
    { type:'cmd', text:'About-me' },
    { type:'out', text:'>> Full-Stack Engineer · 3+ yrs building scalable products' },

    { type:'cmd', text:'cat dev-stack.json' },
    { type:'out', text:'>> { "backend": "Node · Go · Python", "frontend": "React · TypeScript", "Environment": "AWS · Google CLoud · Railway · Plesk · cPanel" }' },
    
    { type:'cmd', text:'Opening-status -- active' },
    { type:'out', text:'>> Available for select freelance & full-time roles' },

    { type:'cmd', text:'Application-type' },
    { type:'out', text:'>> Full-time, Contract, Freelance, Testing & QA' },

    { type:'cmd', text:'Project-roles' },
    { type:'out', text:'>> Frontend Development, Backend Development, Testing & QA, Native Mobile App, Native Desktop App, Cloud-Based Solutions' },
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

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.thumb-slider').forEach(slider => {
    const track = slider.querySelector('.thumb-track');
    const dots = slider.querySelectorAll('.thumb-dot');
    if(!track || !dots.length) return;

    let index = 0;
    const goTo = (i) => {
      index = (i + dots.length) % dots.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
    };
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    let timer = setInterval(() => goTo(index + 1), 4000);
    slider.addEventListener('mouseenter', () => clearInterval(timer));
    slider.addEventListener('mouseleave', () => { timer = setInterval(() => goTo(index + 1), 4000); });
  });
});

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

const EMAIL_ENDPOINT = '/api/send-email';

async function submitFormToEmailApi(form){
  const data = Object.fromEntries(new FormData(form).entries());
  const res = await fetch(EMAIL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formName: form.dataset.formName || form.id, fields: data })
  });
  if(!res.ok) throw new Error('bad response');
}

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
      await submitFormToEmailApi(form);
      status.textContent = 'Message sent — thank you! I\'ll reply within 1–2 business days.';
      status.className = 'form-status show ok';
      form.reset();
    } catch(err){
      status.textContent = 'Could not send right now — please email me directly, or try again shortly.';
      status.className = 'form-status show err';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

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
      await submitFormToEmailApi(form);
      status.textContent = 'Subscribed! Watch your inbox for updates.';
      status.className = 'form-status show ok';
      form.reset();
    } catch(err){
      status.textContent = 'Could not subscribe right now — please try again shortly.';
      status.className = 'form-status show err';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('quoteStatus');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    const name = form.querySelector('#quoteName').value.trim();
    const email = form.querySelector('#quoteEmail').value.trim();
    const scope = form.querySelector('#quoteScope').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!name || !emailPattern.test(email) || !scope){
      status.textContent = 'Please fill in your name, a valid email, and project scope.';
      status.className = 'form-status show err';
      return;
    }

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try{
      await submitFormToEmailApi(form);
      status.textContent = 'Quote request received — I\'ll follow up with pricing within 1–2 business days.';
      status.className = 'form-status show ok';
      form.reset();
    } catch(err){
      status.textContent = 'Could not send right now — please email me directly, or try again shortly.';
      status.className = 'form-status show err';
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
});

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

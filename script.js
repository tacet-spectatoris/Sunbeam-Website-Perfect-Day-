document.addEventListener('DOMContentLoaded', () => {
  // Create a reusable modal popup
  function createModal() {
    const overlay = document.createElement('div');
    overlay.id = 'popup-modal';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.55)',
      zIndex: 9999,
      padding: '24px'
    });

    const box = document.createElement('div');
    box.id = 'popup-box';
    Object.assign(box.style, {
      maxWidth: '720px',
      width: '100%',
      background: '#fff',
      color: '#111',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
      padding: '20px',
      fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    });

    const title = document.createElement('h3');
    title.id = 'popup-title';
    Object.assign(title.style, { margin: '0 0 8px 0', fontSize: '20px' });

    const desc = document.createElement('div');
    desc.id = 'popup-desc';
    Object.assign(desc.style, { marginBottom: '16px', lineHeight: '1.45' });

    const controls = document.createElement('div');
    Object.assign(controls.style, { display: 'flex', gap: '8px', justifyContent: 'flex-end' });

    const closeBtn = document.createElement('button');
    closeBtn.id = 'popup-close';
    closeBtn.textContent = 'Close';
    Object.assign(closeBtn.style, {
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid rgba(0,0,0,0.08)',
      background: '#f4f4f6',
      cursor: 'pointer'
    });

    const goBtn = document.createElement('button');
    goBtn.id = 'popup-go';
    goBtn.textContent = 'Go';
    Object.assign(goBtn.style, {
      padding: '8px 12px',
      borderRadius: '8px',
      border: 'none',
      background: 'linear-gradient(90deg,#ff8a00,#ffbb33)',
      color: '#fff',
      cursor: 'pointer'
    });

    controls.appendChild(closeBtn);
    controls.appendChild(goBtn);

    box.appendChild(title);
    box.appendChild(desc);
    box.appendChild(controls);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Close handlers
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) hideModal();
    });
    closeBtn.addEventListener('click', hideModal);

    return { overlay, title, desc, goBtn };
  }

  function showModal({ titleText = '', description = '', confirmLabel = '', onConfirm = null }) {
    const modal = window.__popupModal || createModal();
    window.__popupModal = modal;

    modal.title.textContent = titleText;
    modal.desc.innerHTML = description;

    if (confirmLabel) {
      modal.goBtn.textContent = confirmLabel;
      modal.goBtn.style.display = '';
      modal.goBtn.onclick = () => {
        hideModal();
        if (typeof onConfirm === 'function') onConfirm();
      };
    } else {
      modal.goBtn.style.display = 'none';
      modal.goBtn.onclick = null;
    }

    modal.overlay.style.display = 'flex';
    // small focus trap for accessibility
    modal.goBtn.focus();
  }

  function hideModal() {
    const modal = window.__popupModal;
    if (modal) modal.overlay.style.display = 'none';
  }

  // Descriptions for items (editable)
  const descriptions = {
    "Saron's Recipes": 'A cozy collection of Saron\'s best recipes — warm stews, sweet buns, and the secret spice blend that keeps the hearth alive.',
    "Meklit's Journal": 'Torn maps, pressed flowers, and half-finished schemes. Meklit\'s journal captures the joy of wandering and the small discoveries along the way.',
    'Tome of Fire Magic': 'Old spells and careful diagrams for shaping flame. Not for novices; handles dangerous embers and unlikely invitations.',
    'Ancient Hearth Lore': 'Forgotten songs of the hearth and stories told beside the flame. A gentle book for long nights and slow mornings.',
    'Enter': 'Step through the gate and visit the Hearth Room.',
    'Back to Main Gate': 'Return to the main gate (homepage).'
  };

  // Handle book clicks (supports both .book and .book-item markup)
  const bookSelectors = Array.from(document.querySelectorAll('.book, .book-item'));
  bookSelectors.forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      // Try to derive a title for the clicked element
      const titleFromData = el.dataset.book;
      const titleFromCover = el.querySelector('.cover')?.innerText?.trim();
      const titleFromTitle = el.querySelector('.book-title')?.innerText?.trim();
      const title = titleFromData || titleFromCover || titleFromTitle || el.innerText.trim();

      const desc = descriptions[title] || 'No description available for this item.';

      showModal({ titleText: title, description: `<p>${desc}</p>` });
    });
  });

  // Navigation buttons: show description first, allow confirm to navigate
  // Enter buttons (links with class .enter-btn)
  document.querySelectorAll('.enter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const label = btn.getAttribute('aria-label') || btn.innerText.trim() || 'Enter';
      const desc = descriptions['Enter'] || 'Navigate.';
      const href = btn.getAttribute('href');
      showModal({ titleText: label, description: `<p>${desc}</p>`, confirmLabel: 'Go', onConfirm: () => { if (href) window.location.href = href; } });
    });
  });

  // Back button (id=back-btn)
  const backButton = document.getElementById('back-btn');
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      const label = backButton.getAttribute('aria-label') || backButton.innerText.trim() || 'Back to Main Gate';
      const desc = descriptions['Back to Main Gate'] || 'Navigate back.';
      showModal({ titleText: label, description: `<p>${desc}</p>`, confirmLabel: 'Go', onConfirm: () => { window.location.href = backButton.dataset.href || 'index.html'; } });
    });
  }

});

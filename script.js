// Minimal behavior: open modal from title list, toggle details, open full image
(function(){
  const btns = document.querySelectorAll('.title-btn');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');
  const toggleDesc = document.getElementById('toggleDesc');
  const openFull = document.getElementById('openFull');
  const yearEl = document.getElementById('year');

  // set year in footer
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  function openModal(info){
    modalImg.src = info.large;
    modalImg.alt = info.title;
    modalTitle.textContent = info.title;
    modalDesc.textContent = info.desc || '';
    openFull.href = info.large || '#';
    toggleDesc.setAttribute('aria-expanded', 'false');
    modalDesc.hidden = true;
    modal.setAttribute('aria-hidden', 'false');
    // trap focus: move focus to close button
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal({
        large: btn.dataset.large,
        title: btn.dataset.title,
        desc: btn.dataset.desc
      });
    });
    // keyboard: Enter/Space works by default on button
  });

  modalClose.addEventListener('click', closeModal);

  // close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });

  // Escape closes
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });

  // toggle details
  toggleDesc.addEventListener('click', () => {
    const expanded = toggleDesc.getAttribute('aria-expanded') === 'true';
    toggleDesc.setAttribute('aria-expanded', String(!expanded));
    modalDesc.hidden = expanded; // show when expanding
  });

  // clicking image opens full in new tab (same as "Open full image")
  modalImg.addEventListener('click', () => {
    if(modalImg.src) window.open(modalImg.src, '_blank', 'noopener');
  });
})();

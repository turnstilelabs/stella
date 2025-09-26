document.addEventListener('DOMContentLoaded', () => {
  const contributeBtn = document.getElementById('contribute-btn');
  const modal = document.getElementById('contribution-modal');
  
  if (!modal) return;

  const closeModalBtn = modal.querySelector('.modal-close');
  const tabs = modal.querySelectorAll('.tab-link');
  const tabContents = modal.querySelectorAll('.tab-content');
  const contributionForm = document.getElementById('contribution-form');
  const submitBtn = contributionForm.querySelector('button[type="submit"]');


  const openModal = () => {
    modal.style.display = 'flex';
  };

  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (contributeBtn) {
    contributeBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });


  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      tab.classList.add('active');
      const activeTabContent = document.getElementById(tab.dataset.tab);
      if (activeTabContent) {
        activeTabContent.classList.add('active');
        activeTabContent.style.display = 'block';
      }
    });
  });


  if (contributionForm) {
    contributionForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const originalButtonText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
  
      const SHEET_BEST_URL = '__SHEET_BEST_URL_PLACEHOLDER__';

      const data = {
        timestamp: new Date().toISOString(),
        submissionType: modal.querySelector('.tab-link.active').dataset.tab,
        paperReference: document.getElementById('reference-paper').value,
        statementLocation: document.getElementById('reference-location').value,
        manualStatement: document.getElementById('manual-statement').value,
        manualProof: document.getElementById('manual-proof').value,
        comment: document.getElementById('comment').value
      };
      
      console.log("Data being sent to Sheet.best:", JSON.stringify(data, null, 2));


      try {
        const response = await fetch(SHEET_BEST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        submitBtn.textContent = 'Success ✓';
        
        setTimeout(() => {
          contributionForm.reset();
          submitBtn.textContent = originalButtonText;
          submitBtn.disabled = false;
          closeModal();
        }, 2000);

      } catch (error) {
        console.error('Submission failed:', error);
        alert('Sorry, there was an error submitting your contribution. Please check your connection and try again.');
        submitBtn.textContent = originalButtonText;
        submitBtn.disabled = false;
      }
    });
  }
});
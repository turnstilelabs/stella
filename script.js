document.addEventListener('DOMContentLoaded', () => {
  const contributeBtn = document.getElementById('contribute-btn');
  const modal = document.getElementById('contribution-modal');
  const closeModalBtn = modal.querySelector('.modal-close');
  const tabs = modal.querySelectorAll('.tab-link');
  const tabContents = modal.querySelectorAll('.tab-content');

  // Function to open the modal
  const openModal = () => {
    modal.style.display = 'flex';
  };

  // Function to close the modal
  const closeModal = () => {
    modal.style.display = 'none';
  };

  // Event listeners
  if (contributeBtn) {
    contributeBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Close modal if user clicks on the overlay
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Tab functionality
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      // Activate the clicked tab and its content
      tab.classList.add('active');
      const activeTabContent = document.getElementById(tab.dataset.tab);
      if (activeTabContent) {
        activeTabContent.classList.add('active');
        activeTabContent.style.display = 'block';
      }
    });
  });
});
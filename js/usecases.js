/* =========================================================================
   usecases.js – Usecase Explorer Page Interactions
   ========================================================================= */

function initUsecaseExplorer() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const projectLists = document.querySelectorAll('.project-list');
  const projectBtns = document.querySelectorAll('.project-btn');
  const projectDetails = document.querySelectorAll('.project-detail');

  if (!categoryBtns.length) return;

  // Function to animate the active donut chart
  function animateActiveDonuts(container) {
    // Reset all circles first
    document.querySelectorAll('.cs-metric-donut svg circle:last-child').forEach(circle => {
      circle.style.strokeDasharray = '377';
      circle.style.strokeDashoffset = '377';
    });

    if (!container) return;

    const activeCircles = container.querySelectorAll('.cs-metric-donut svg circle:last-child');
    activeCircles.forEach(circle => {
      // Get the value text to determine target fill percentage
      const valText = circle.closest('.cs-metric-donut').querySelector('.cs-donut-val')?.textContent || '100%';
      let percentage = 1.0;

      if (valText.includes('%')) {
        percentage = parseFloat(valText) / 100;
      } else if (valText.includes('+')) {
        // e.g. "25+" endpoints, let's fill it to 85%
        percentage = 0.85;
      }

      // Calculate target offset (dasharray is 377)
      const targetOffset = 377 * (1 - percentage);
      
      // Animate with a tiny delay to trigger after the content transitions
      setTimeout(() => {
        circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
        circle.style.strokeDashoffset = targetOffset;
      }, 100);
    });
  }

  // Handle Category Selection
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      // Update active category button
      categoryBtns.forEach(b => b.classList.toggle('active', b === btn));

      // Update active project list sidebar
      projectLists.forEach(list => {
        list.classList.toggle('active', list.dataset.category === category);
      });

      // Find first project button in the selected category list
      const activeList = document.querySelector(`.project-list[data-category="${category}"]`);
      const firstProjectBtn = activeList?.querySelector('.project-btn');

      if (firstProjectBtn) {
        // Click the first project in that category
        firstProjectBtn.click();
      } else {
        // No projects in this category (it's a placeholder category)
        // Hide all project details and show the specific category placeholder
        projectDetails.forEach(detail => {
          if (detail.dataset.category === category && detail.id.includes('placeholder')) {
            detail.classList.add('active');
            // Scroll to detail on mobile
            if (window.innerWidth <= 992) {
              detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          } else {
            detail.classList.remove('active');
          }
        });
      }
    });
  });

  // Handle Project Selection
  projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.dataset.project;
      const category = btn.closest('.project-list')?.dataset.category;

      // Update active project button within the current sidebar list
      const activeList = btn.closest('.project-list');
      activeList?.querySelectorAll('.project-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
      });

      // Show the selected project detail
      projectDetails.forEach(detail => {
        const isTarget = detail.dataset.project === project && detail.dataset.category === category;
        detail.classList.toggle('active', isTarget);
        if (isTarget) {
          animateActiveDonuts(detail);
          
          // Scroll to detail view on mobile
          if (window.innerWidth <= 992) {
            detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  });

  // Initialize: Set up initial state (e.g. animate active donuts for default project)
  const defaultActiveDetail = document.querySelector('.project-detail.active');
  if (defaultActiveDetail) {
    animateActiveDonuts(defaultActiveDetail);
  }
}

// Export to window so it can be called from app.js
window.initUsecaseExplorer = initUsecaseExplorer;
window.addEventListener('load', () => {
  initUsecaseExplorer();
});

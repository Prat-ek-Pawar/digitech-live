// website development script
    gsap.registerPlugin(ScrollTrigger, Flip);

    window.addEventListener('load', () => {

      // 1. COUNTERS
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const anim = { val: 0 };
        gsap.to(anim, {
          val: target, duration: 2,
          scrollTrigger: { trigger: counter, start: "top 85%" },
          onUpdate: function() { counter.innerText = Math.ceil(anim.val) + "+"; }
        });
      });

      // 2. ULTIMATE GSAP SCROLL ANIMATION
      
      const techSections = document.querySelectorAll('.tech-stack-section');
      
      techSections.forEach(section => {
          const wrapper = section.querySelector('.tech-stack-wrapper');
          const cards = gsap.utils.toArray(section.querySelectorAll('.tech-card'));
          const leftContent = section.querySelector('.tech-content-left');
          
          if(!wrapper || cards.length === 0) return;

          ScrollTrigger.matchMedia({
              "(min-width: 992px)": function() {
                  
                  // 1. Pin the Left Content
                  ScrollTrigger.create({
                      trigger: section,
                      start: "top top",
                      end: "bottom bottom",
                      pin: leftContent,
                      pinSpacing: false
                  });

                  // 2. Animate Cards on Scroll
                  cards.forEach((card, i) => {
                      gsap.fromTo(card, 
                          { 
                              opacity: 0, 
                              y: 100, 
                              scale: 0.8,
                              rotationX: -15
                          },
                          {
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              rotationX: 0,
                              duration: 1,
                              ease: "power3.out",
                              scrollTrigger: {
                                  trigger: card,
                                  start: "top 85%", 
                                  end: "top 50%",
                                  scrub: 1,
                                  toggleActions: "play reverse play reverse"
                              }
                          }
                      );
                  });
              },
              
              "(max-width: 991px)": function() {
                  // Mobile Animation - Robust Batch
                  // Ensure they are visible if JS fails by default CSS (opacity 1), but here we animate from 0
                  
                  ScrollTrigger.batch(cards, {
                      start: "top 90%", // Trigger earlier
                      onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.6, ease: "power2.out", overwrite: true }),
                      onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }) 
                  });
                  
                  // Initial set
                  gsap.set(cards, { opacity: 0, y: 50 });
              }
          });
      });

      // Mouse Move Glow Effect for Cards
      document.querySelectorAll('.tech-card').forEach(card => {
          card.addEventListener('mousemove', (e) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              card.style.setProperty('--x', `${x}px`);
              card.style.setProperty('--y', `${y}px`);
          });
      });

      // 3. MOBILE MENU
      // 3. MOBILE MENU
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileClose = document.getElementById('mobileMenuClose');
      const overlay = document.getElementById('mobileMenuOverlay');
      
      // Select both old and new buttons just in case
      const mobileBtns = document.querySelectorAll('.mobile-menu-btn, .tp-offcanvas-open-btn');

      function toggleMenu() { mobileMenu.classList.toggle('open'); }
      
      mobileBtns.forEach(btn => btn.addEventListener('click', toggleMenu));
      if(mobileClose) mobileClose.addEventListener('click', toggleMenu);
      if(overlay) overlay.addEventListener('click', toggleMenu);

      // Mobile Dropdown Logic
      const mobileDropdownHeader = document.querySelector('.mobile-dropdown-header');
      if(mobileDropdownHeader){
          mobileDropdownHeader.addEventListener('click', () => {
              const content = document.querySelector('.mobile-dropdown-content');
              const icon = mobileDropdownHeader.querySelector('i');
              if(content.style.display === 'none'){
                  content.style.display = 'block';
                  icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
              } else {
                  content.style.display = 'none';
                  icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
              }
          });
      }

      // 4. FAQ ACCORDION
      document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
          const parent = item.parentNode;
          const answer = parent.querySelector('.faq-answer');
          const icon = item.querySelector('i');
          
          document.querySelectorAll('.faq-item').forEach(child => {
             if(child !== parent) {
               child.classList.remove('active');
               child.querySelector('.faq-answer').style.maxHeight = null;
               child.querySelector('i').classList.replace('fa-minus', 'fa-plus');
             }
          });

          parent.classList.toggle('active');
          if(parent.classList.contains('active')){
             answer.style.maxHeight = answer.scrollHeight + "px";
             icon.classList.replace('fa-plus', 'fa-minus');
          } else {
             answer.style.maxHeight = null;
             icon.classList.replace('fa-minus', 'fa-plus');
          }
        });
      });

      // 5. SMOOTH SCROLLING (LENIS)
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Connect GSAP ScrollTrigger to Lenis
      gsap.registerPlugin(ScrollTrigger);
      
      // 6. THREE JS BACKGROUND (Refined Wave)
      const canvas = document.getElementById('three-canvas');
      if (canvas) {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Generate Circle Texture
        function getCircleTexture() {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }
        
        const circleTexture = getCircleTexture();

        // Wave Parameters
        const geometry = new THREE.BufferGeometry();
        const count = 3000; // Increased count for density
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        
        for(let i=0; i<count; i++) {
            positions[i*3] = (Math.random() - 0.5) * 30; // Wider x spread
            positions[i*3+1] = (Math.random() - 0.5) * 5; // y spread
            positions[i*3+2] = (Math.random() - 0.5) * 10; // z spread
            scales[i] = Math.random();
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        
        const material = new THREE.PointsMaterial({
            size: 0.06, // Much smaller particles
            color: 0x7463FF,
            map: circleTexture,
            transparent: true,
            opacity: 0.6, // More subtle
            sizeAttenuation: true,
            alphaTest: 0.5
        });
        
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);
        
        camera.position.z = 5;
        
        // Mobile Adjustment Variables
        let isMobile = false;

        function updateCameraPosition() {
            isMobile = window.innerWidth < 991;
            if (isMobile) {
                camera.position.y = 3.0; // Higher up on mobile
                camera.position.z = 8;   // Further back
            } else {
                camera.position.y = 1;
                camera.position.z = 5;
            }
        }
        updateCameraPosition();
        
        let mouseX = 0;
        let mouseY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        });

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            
            const positions = geometry.attributes.position.array;
            for(let i=0; i<count; i++) {
                const i3 = i * 3;
                const x = positions[i3];
                
                // Adjusted Wave Equation
                // Less amplitude on mobile to prevent clutter
                const amplitude = isMobile ? 0.3 : 0.8;
                
                positions[i3+1] = Math.sin(elapsedTime * 0.3 + x * 0.4) * amplitude 
                                + Math.sin(elapsedTime * 0.5 + x * 0.6) * (amplitude * 0.5);
            }
            geometry.attributes.position.needsUpdate = true;
            
            // Camera sway
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            const targetY = (isMobile ? 3.0 : 1) + (-mouseY * 0.5);
            camera.position.y += (targetY - camera.position.y) * 0.05;
            
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }
        animate();
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            updateCameraPosition();
        });
      }

      // 7. GENERAL REVEAL ANIMATIONS
      gsap.utils.toArray('.overview-title, .overview-desc, .overview-list li, .pp-enquiry-card').forEach(el => {
          gsap.from(el, {
              y: 50,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                  trigger: el,
                  start: "top 85%"
              }
          });
      });

      if($.fn.niceSelect) $('select').niceSelect();
    });

    {/* // review */}
     document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".review-card");

    cards.forEach(function (card) {
      const text = card.querySelector(".review-text");
      const btn = card.querySelector(".review-read-more");

      if (!text || !btn) return;

      // Temporarily remove any max-height to measure full height
      text.style.maxHeight = "none";
      const fullHeight = text.scrollHeight;

      // If text is short, don't show button
      if (fullHeight <= 80) { // adjust threshold if needed
        btn.style.display = "none";
        return;
      }

      // Calculate heights
      const collapsedHeight = Math.min(60, fullHeight * 0.35); // initial small snippet
      const halfHeight = fullHeight * 0.5;                     // ~half review

      // Store in dataset for this element
      text.dataset.collapsedHeight = collapsedHeight;
      text.dataset.halfHeight = halfHeight;
      text.dataset.fullHeight = fullHeight;
      text.dataset.state = "collapsed";

      // Apply initial collapsed state
      text.style.maxHeight = collapsedHeight + "px";

      btn.textContent = "Read more";

      btn.addEventListener("click", function () {
        const state = text.dataset.state;

        if (state === "collapsed") {
          // Go to half visible
          text.style.maxHeight = text.dataset.halfHeight + "px";
          text.dataset.state = "half";
          btn.textContent = "Read more"; // still "Read more" at half
          text.classList.remove("full-open");
        } else if (state === "half") {
          // Go to full
          text.style.maxHeight = text.dataset.fullHeight + "px";
          text.dataset.state = "full";
          btn.textContent = "Read less";
          text.classList.add("full-open");
        } else {
          // Back to collapsed
          text.style.maxHeight = text.dataset.collapsedHeight + "px";
          text.dataset.state = "collapsed";
          btn.textContent = "Read more";
          text.classList.remove("full-open");
        }
      });
    });
  });
   const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });


(function () {
  function initReviewsCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) return;

    const inner = carousel.querySelector('.reviews-inner');
    const cards = Array.from(inner.querySelectorAll('.review-card'));
    const nextBtn = carousel.querySelector('.review-nav.next');
    const prevBtn = carousel.querySelector('.review-nav.prev');

    if (!cards.length) return;

    let currentIndex = 0;

    function getStepWidth() {
      const card = cards[0];
      const rect = card.getBoundingClientRect();
      const style = getComputedStyle(card);
      const marginRight = parseFloat(style.marginRight || 0);
      return rect.width + marginRight;
    }

    function goToIndex(index) {
      const total = cards.length;
      currentIndex = (index + total) % total; // wrap around
      const offset = -currentIndex * getStepWidth();
      inner.style.transform = 'translateX(' + offset + 'px)';
    }

    function next() {
      goToIndex(currentIndex + 1);
    }

    function prev() {
      goToIndex(currentIndex - 1);
    }

    // Manual controls
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // AUTO SCROLL – SIMPLE, NO PAUSE/RESUME LOGIC
    setInterval(next, 3000); // change 3500 to adjust speed

    // Keep position correct on resize
    window.addEventListener('resize', function () {
      goToIndex(currentIndex);
    });

    // Init
    goToIndex(0);
  }

  // Safe init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewsCarousel);
  } else {
    initReviewsCarousel();
  }
})();

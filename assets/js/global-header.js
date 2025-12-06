document.addEventListener("DOMContentLoaded", function () {
  // 1. Define the HTML Structure
  const headerHTML = `
    <style>
        /* --- GENERAL RESET --- */
        body {
            padding-top: 0 !important; /* Remove body padding since header is not fixed */
        }

        /* --- DESKTOP HEADER STYLES (NON-STICKY) --- */
        #header-sticky {
            position: relative !important; /* Changed from fixed to relative */
            top: auto;
            left: 0;
            right: 0;
            background: #ffffff;
            z-index: 1000;
            box-shadow: 0 1px 10px rgba(0,0,0,0.05);
            padding: 0 !important; /* Removed up/down padding */
            margin: 0 !important;  /* Removed margins */
        }

        .tp-header-logo {
            padding: 10px 0; /* Minimal spacing for logo to breathe */
        }

        /* --- DESKTOP MENU ICON FIX --- */
        /* Forces the arrow/chevron next to Services to be Black (since header is white) */
        .tp-header-menu nav ul li.has-dropdown > a svg {
            stroke: #000000 !important; /* Black icon for white header */
        }

        /* --- DESKTOP MEGA MENU --- */
        .tp-megamenu-wrapper.megamenu-black-bg {
            background-color: #050505 !important;
            border: 1px solid rgba(255,255,255,0.15);
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
            top: 100%; /* Attach directly to bottom of header */
            margin-top: 0;
        }
        .tp-megamenu-list ul li a {
            color: #f0f0f0 !important;
            font-weight: 500;
        }
        .tp-megamenu-list ul li a:hover {
            color: #dafa66 !important;
        }
        .tp-megamenu-title {
            color: #ffffff !important;
            font-weight: 700;
        }

        /* --- MOBILE MENU STYLES --- */
        .mobile-menu-panel {
            background-color: #000000 !important; /* Pure Black background */
            overflow-y: auto; /* Enables scrolling */
            padding: 20px;
        }
  .hero-btn:hover{
    background-color: #dafa66 !important;
    color: #000000 !important;
    transition: all 0.4s ease-in-out;
  }
        /* Sticky Services Header for Mobile */
        .mobile-dropdown-header {
            position: -webkit-sticky; /* Safari support */
            position: sticky;
            top: 0; /* Stick to the top of the panel */
            z-index: 100; /* Sit on top of links */
            background-color: #000000; /* Match background so text doesn't show behind it */
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.15);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }

        /* Mobile Text Colors */
        .mobile-dropdown-header span {
            color: #ffffff !important;
            font-size: 18px;
            font-weight: 600;
        }

        /* Force all mobile SVGs to be white */
        .mobile-menu-close svg,
        .mobile-dropdown-header svg,
        .mobile-social svg {
            stroke: #ffffff !important;
            color: #ffffff !important;
            fill: none;
        }
        
        /* Mobile Links */
        .mobile-nav > a {
            color: #ffffff !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        /* Dropdown links styling */
        .mobile-dropdown-content {
            background-color: #111111;
            padding-left: 15px;
            padding-right: 5px;
        }
        .mobile-dropdown-content a {
            color: #d1d1d1 !important;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* Social Icons specific styling */
        .mobile-social ul li a {
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .mobile-social ul li a:hover {
            background-color:#dafa66 !important;
        }
        .mobile-social ul li a:hover svg {
            stroke: #000000 !important;
        }
    </style>

    <!-- HEADER -->
    <div id="header-sticky" class="tp-header-area tp-header-inner-style header-inner-white">
      <div class="container container-1750">
        <div class="row align-items-center">
          <div class="col-xl-2 col-lg-6 col-6">
              <div class="tp-header-logo">
              <a href="/index.html">
                <!-- Ensure margins are 0 via inline style just in case -->
                <img data-width="120" class="logo-white" src="/assets/digitech-logo.jpg" alt="The Digitech Solutions Logo" style="margin:0;">
                <img data-width="120" class="logo-black d-none" src="/assets/digitech-logo.jpg" alt="The Digitech Solutions Logo" style="margin:0;">
              </a>
            </div>
          </div>
          <div class="col-xl-8 d-none d-xl-block">
            <div class="tp-header-box text-center">
              <div class="tp-header-menu tp-header-dropdown dropdown-black-bg">
                <nav class="tp-mobile-menu-active">
                  <ul style="margin:0; padding:0;">
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/about-us.html">About</a></li>
                    <li class="has-dropdown">
                      <a href="javascript:void(0)">Services 
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-left:5px; transform:translateY(1px);">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </a>
                      <div class="tp-megamenu-wrapper mega-menu megamenu-black-bg">
                        <div class="row gx-0">
                          <!-- Digital Marketing -->
                          <div class="col-xl-3">
                            <div class="tp-megamenu-list">
                              <h4 class="tp-megamenu-title">Digital Marketing</h4>
                              <ul>
                                <li><a href="/service/seo.html">Search Engine Optimization</a></li>
                                <li><a href="/service/social-media-marketing.html">Social Media Marketing</a></li>
                                <li><a href="/service/content-marketing.html">Content Marketing</a></li>
                                <li><a href="/service/google-ads-ppc.html">Google Ads PPC</a></li>
                                <li><a href="/service/email-marketing.html">Email Marketing</a></li>
                                <li><a href="/service/sms-marketing.html">SMS Marketing</a></li>
                                <li><a href="/service/google-my-business.html">Google My Business</a></li>
                              </ul>
                            </div>
                          </div>
                          <!-- Website Development -->
                          <div class="col-xl-3">
                            <div class="tp-megamenu-list">
                              <h4 class="tp-megamenu-title">Website Development</h4>
                              <ul>
                                <li><a href="/service/website-developement.html">Website Development</a></li>
                                <li><a href="/service/ecommerce-development.html">E-Commerce Development</a></li>
                                <li><a href="/service/mobile-app-developement.html">Mobile App Development</a></li>
                                <li><a href="/service/cms-developement.html">CMS Development</a></li>
                              </ul>
                            </div>
                          </div>
                          <!-- Branding -->
                          <div class="col-xl-3">
                            <div class="tp-megamenu-list">
                              <h4 class="tp-megamenu-title">Branding Collaterals</h4>
                              <ul>
                                <li><a href="/service/video-production.html">Video Production</a></li>
                                <li><a href="/service/brand-name.html">Brand Name</a></li>
                                <li><a href="/service/logo-design.html">Logo Design</a></li>
                                <li><a href="/service/brochure-design.html">Brochure Design</a></li>
                              </ul>
                            </div>
                          </div>
                          <!-- Industries -->
                          <div class="col-xl-3">
                            <div class="tp-megamenu-list">
                              <h4 class="tp-megamenu-title">Industries</h4>
                              <ul>
                                <li><a href="/service/manufactures-digital-marketing.html">Manufactures</a></li>
                                <li><a href="/service/education-digital-marketing.html">Education</a></li>
                                <li><a href="/service/real-estate-digital-marketing.html">Real Estate</a></li>
                                <li><a href="/service/ecommerce-digital-marketing.html">E-Commerce</a></li>
                                <li><a href="/service/travel-and-tourism-digital-marketing.html">Travel</a></li>
                                <li><a href="/service/hospital-digital-marketing.html">Hospital</a></li>
                                <li><a href="/service/political-digital-marketing.html">Political</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="col-xl-2 col-lg-6 col-6">
            <div class="tp-header-right text-end">
              <div class="tp-header-14-bar-wrap ml-20">
                 <a href="/contact.html" class="hero-btn d-none d-xl-inline-block" style="background-color: #000000; color:white;">Contact Us</a>
                 <!-- Hamburger Button -->
                 <button class="mobile-menu-btn d-xl-none" style="background:none; border:none; padding:0;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE MENU -->
    <div class="mobile-menu" id="mobileMenu">
      <div class="mobile-menu-overlay" id="mobileMenuOverlay"></div>
      <div class="mobile-menu-panel">
        <div style="text-align:right; margin-bottom:10px;">
          <!-- Close Button SVG (White) -->
          <button id="mobileMenuClose" class="mobile-menu-close">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </button>
        </div>
        <nav class="mobile-nav">
          <a href="/index.html">Home</a>
          <a href="/about-us.html">About</a>
          
          <!-- Services Dropdown with Sticky Header -->
          <div class="mobile-dropdown">
              <div class="mobile-dropdown-header">
                  <span>Services</span>
                  <!-- Chevron SVG (White) -->
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
              </div>
              <div class="mobile-dropdown-content" style="display:none;">
                  
                  <!-- Digital Marketing -->
                  <div style="color:#dafa66; font-weight:bold; font-size:14px; padding-top:15px; text-transform:uppercase;">Digital Marketing</div>
                  <a href="/service/seo.html">SEO</a>
                  <a href="/service/social-media-marketing.html">Social Media Marketing</a>
                  <a href="/service/content-marketing.html">Content Marketing</a>
                  <a href="/service/google-ads-ppc.html">Google Ads PPC</a>
                  <a href="/service/email-marketing.html">Email Marketing</a>
                  <a href="/service/sms-marketing.html">SMS Marketing</a>
                  <a href="/service/google-my-business.html">Google My Business</a>

                  <!-- Website Development -->
                  <div style="color:#dafa66; font-weight:bold; font-size:14px; margin-top:20px; text-transform:uppercase;">Website Development</div>
                  <a href="/service/website-developement.html">Website Development</a>
                  <a href="/service/ecommerce-development.html">E-Commerce</a>
                  <a href="/service/mobile-app-developement.html">Mobile App</a>
                  <a href="/service/cms-developement.html">CMS Development</a>

                  <!-- Branding -->
                  <div style="color:#dafa66; font-weight:bold; font-size:14px; margin-top:20px; text-transform:uppercase;">Branding</div>
                  <a href="/service/video-production.html">Video Production</a>
                  <a href="/service/brand-name.html">Brand Name</a>
                  <a href="/service/logo-design.html">Logo Design</a>
                  <a href="/service/brochure-design.html">Brochure Design</a>
                  
                   <!-- Industries -->
                  <div style="color:#dafa66; font-weight:bold; font-size:14px; margin-top:20px; text-transform:uppercase;">Industries</div>
                  <a href="/service/manufactures-digital-marketing.html">Manufactures</a>
                  <a href="/service/education-digital-marketing.html">Education</a>
                  <a href="/service/real-estate-digital-marketing.html">Real Estate</a>
                  <a href="/service/ecommerce-digital-marketing.html">E-Commerce</a>
                  <a href="/service/travel-and-tourism-digital-marketing.html">Travel</a>
                  <a href="/service/hospital-digital-marketing.html">Hospital</a>
                  <a href="/service/political-digital-marketing.html">Political</a>
              </div>
          </div>

          <a href="/contact.html">Contact</a>
        </nav>

        <!-- Mobile Social Icons (White SVGs) -->
        <div class="mobile-social">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://www.facebook.com/thedigitechsolutions/" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/the.digitech.solutions/" target="_blank">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/the-digitech-solutions-a3a30033a/" target="_blank">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                  </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;

  // 2. Inject HTML
  const targetElement = document.getElementById("global-header-container");
  if (targetElement) {
    targetElement.innerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  // 3. Initialize JS Logic
  initMobileMenu();
});

function initMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBtns = document.querySelectorAll('.mobile-menu-btn');
  const mobileClose = document.getElementById('mobileMenuClose');
  const overlay = document.getElementById('mobileMenuOverlay');
  const body = document.body;

  function toggleMenu() {
    if (!mobileMenu) return;
    
    mobileMenu.classList.toggle('open');
    
    if(mobileMenu.classList.contains('open')) {
      body.classList.add('menu-open');
    } else {
      body.classList.remove('menu-open');
    }
  }

  if (mobileBtns.length > 0) {
    mobileBtns.forEach(btn => btn.addEventListener('click', toggleMenu));
  }
  
  if (mobileClose) mobileClose.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  // Dropdown Accordion
  const mobileDropdownHeader = document.querySelector('.mobile-dropdown-header');
  if (mobileDropdownHeader) {
    mobileDropdownHeader.addEventListener('click', () => {
      const content = document.querySelector('.mobile-dropdown-content');
      const icon = mobileDropdownHeader.querySelector('svg');
      
      if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        content.style.display = 'none';
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  }
}
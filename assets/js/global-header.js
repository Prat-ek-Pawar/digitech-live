document.addEventListener("DOMContentLoaded", function () {
  // 1. Define the HTML Structure with UNIQUE Class Names
  const headerHTML = `
    <style>
        /* --- GENERAL RESET & UTILS --- */
        body {
            padding-top: 0 !important;
            margin: 0 !important;
        }

        /* --- BODY SCROLL LOCK --- */
        body.uni-scroll-lock {
            overflow: hidden !important;
            height: 100vh !important;
        }

        /* --- WRAPPER --- */
        #uni-nav-wrapper {
            width: 100%;
            position: relative;
            z-index: 999; 
            background-color: #ffffff;
            box-shadow: 0 2px 15px rgba(0,0,0,0.05);
            font-family: 'Inter', sans-serif;
            height: 90px;
        }

        .uni-nav-inner {
            max-width: 1750px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
        }

        /* --- LOGO --- */
        .uni-nav-logo img {
            max-width: 140px;
            display: block;
        }

        /* --- DESKTOP MENU (CAPSULE STYLE) --- */
        .uni-nav-desk-menu {
            display: none;
        }

        @media (min-width: 1200px) {
            .uni-nav-desk-menu {
                display: block;
            }
        }

        /* The Capsule Container */
        .uni-nav-list {
            list-style: none;
            margin: 0;
            padding: 0 50px; /* Internal padding for capsule */
            display: flex;
            align-items: center;
            gap: 40px;
            background-color: #000000; /* Black Capsule */
            border-radius: 50px;       /* Round edges */
            height: 60px;              /* Fixed height for capsule */
        }

        .uni-nav-item {
            position: relative;
            display: flex;
            align-items: center;
            height: 100%;
        }

        .uni-nav-link {
            text-decoration: none;
            color: #ffffff; /* White Text */
            font-weight: 500;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: color 0.3s ease;
            white-space: nowrap;
        }

        .uni-nav-link:hover {
            color: #dafa66; /* Hover Accent */
        }

        .uni-nav-link svg {
            transition: transform 0.3s ease;
            stroke: #ffffff; /* White Arrow */
        }

        .uni-nav-item:hover .uni-nav-link svg {
            transform: rotate(180deg);
        }

        /* --- MEGA MENU (Desktop) --- */
        .uni-nav-mega {
            position: absolute;
            top: 60px; /* Offset from capsule bottom */
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            width: 1100px;
            background-color: #050505;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 30px 80px rgba(0,0,0,0.4);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            flex-wrap: wrap;
        }

        /* Bridge to prevent menu closing when moving cursor */
        .uni-nav-item::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            height: 40px; /* Connects capsule to megamenu */
        }

        .uni-nav-item:hover .uni-nav-mega {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(15px);
        }

        .uni-nav-mega-col {
            width: 25%;
            padding: 0 15px;
            box-sizing: border-box;
        }

        .uni-nav-mega-title {
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
            border-bottom: 1px solid #333;
            padding-bottom: 10px;
        }

        .uni-nav-mega-list {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .uni-nav-mega-list li {
            margin-bottom: 12px;
        }

        .uni-nav-mega-list a {
            color: #f0f0f0;
            text-decoration: none;
            font-size: 15px;
            transition: 0.2s;
            display: block;
            font-weight: 500;
        }

        .uni-nav-mega-list a:hover {
            color: #dafa66;
            transform: translateX(5px);
        }

        /* --- ACTIONS (Right Side) --- */
        .uni-nav-actions {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .uni-nav-cta {
            background-color: #000000;
            color: #ffffff !important;
            padding: 12px 30px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            transition: all 0.3s ease;
            display: none;
        }

        .uni-nav-cta:hover {
            background-color: #dafa66;
            color: #000000 !important;
            transform: translateY(-2px);
        }

        @media (min-width: 1200px) {
            .uni-nav-cta { display: inline-block; }
        }

        /* --- HAMBURGER BUTTON --- */
        .uni-nav-burger {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            display: block;
            line-height: 0;
        }

        .uni-nav-burger svg {
            stroke: #000;
        }

        @media (min-width: 1200px) {
            .uni-nav-burger { display: none; }
        }

        /* --- MOBILE MENU (OFFCANVAS) --- */
        .uni-mob-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            z-index: 99998;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
            backdrop-filter: blur(3px);
        }

        .uni-mob-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .uni-mob-panel {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 85%;
            max-width: 350px;
            background: #000000;
            z-index: 99999;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .uni-mob-panel.active {
            transform: translateX(0);
        }

        /* Fixed Header inside Panel (LOGO + CLOSE) */
        .uni-mob-header {
            padding: 20px;
            display: flex;
            justify-content: space-between; /* Logo Left, Close Right */
            align-items: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            flex-shrink: 0;
            background: #000;
        }

        .uni-mob-logo img {
            max-width: 120px; /* Slightly smaller for mobile drawer */
            height: auto;
            display: block;
        }

        .uni-mob-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
        }
        
        .uni-mob-close svg {
            stroke: #ffffff;
        }

        /* Scrollable Content Area */
        .uni-mob-content {
            padding: 0 20px;
            flex-grow: 1;
            overflow-y: auto;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
            position: relative;
        }

        /* Links */
        .uni-mob-link {
            display: block;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            font-weight: 500;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        /* Mobile Dropdown */
        .uni-mob-dd-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
            position: sticky; 
            top: 0;           
            background: #000000;
            z-index: 10;
        }

        .uni-mob-dd-body {
            display: none;
            background: #111111;
            padding: 0 15px;
            margin-top: 0;
        }

        .uni-mob-dd-body.active {
            display: block;
            padding-bottom: 15px;
        }

        .uni-mob-dd-cat {
            color: #dafa66;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 8px;
            display: block;
        }

        .uni-mob-sublink {
            display: block;
            color: #d1d1d1;
            text-decoration: none;
            font-size: 15px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .uni-mob-sublink:last-child {
            border-bottom: none;
        }

        /* Social Footer */
        .uni-mob-social {
            margin-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 20px;
            padding-bottom: 40px; 
        }

        .uni-mob-social h4 {
            color: #fff;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .uni-soc-list {
            display: flex;
            gap: 15px;
            padding: 0;
            list-style: none;
            margin: 0;
        }

        .uni-soc-item {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            transition: 0.3s;
        }

        .uni-soc-item:hover {
            background: #dafa66;
            border-color: #dafa66;
            color: #000;
        }
        
        .uni-soc-item svg { stroke: currentColor; }
        .uni-mob-dd-head svg { stroke: #ffffff; transition: transform 0.3s; }
    </style>

    <div id="uni-nav-wrapper">
        <div class="uni-nav-inner">
            
            <!-- LOGO (Desktop) -->
            <div class="uni-nav-logo">
                <a href="/index.html">
                    <img src="/assets/digitech-logo.jpg" alt="Digitech Logo">
                </a>
            </div>

            <!-- DESKTOP MENU (Capsule) -->
            <div class="uni-nav-desk-menu">
                <ul class="uni-nav-list">
                    <li class="uni-nav-item"><a href="/index.html" class="uni-nav-link">Home</a></li>
                    <li class="uni-nav-item"><a href="/about-us.html" class="uni-nav-link">About</a></li>
                    
                    <li class="uni-nav-item">
                        <a href="javascript:void(0)" class="uni-nav-link">
                            Services 
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 1L6 6L11 1"/>
                            </svg>
                        </a>
                        
                        <!-- MEGA MENU -->
                        <div class="uni-nav-mega">
                            <!-- Digital Marketing -->
                            <div class="gh-mm-col">
                                <span class="gh-mm-title">Digital Marketing</span>
                                <ul class="gh-mm-list">
                                    <li><a href="/service/seo.html">SEO</a></li>
                                    <li><a href="/service/smm.html">Social Media Marketing</a></li>
                                    <li><a href="/service/content-marketing.html">Content Marketing</a></li>
                                    <li><a href="/service/google-ads-ppc.html">Google Ads PPC</a></li>
                                    <li><a href="/service/email-marketing.html">Email Marketing</a></li>
                                    <li><a href="/service/sms-marketing.html">SMS Marketing</a></li>
                                    <li><a href="/service/google-my-business.html">Google My Business</a></li>
                                </ul>
                            </div>
                            <!-- Web Dev -->
                            <div class="uni-nav-mega-col">
                                <span class="uni-nav-mega-title">Website Development</span>
                                <ul class="uni-nav-mega-list">
                                    <li><a href="/service/website-developement.html">Website Development</a></li>
                                    <li><a href="/service/ecommerce-development.html">E-Commerce</a></li>
                                    <li><a href="/service/mobile-app-developement.html">Mobile App</a></li>
                                    <li><a href="/service/cms-developement.html">CMS Development</a></li>
                                </ul>
                            </div>
                            <!-- Branding -->
                            <div class="uni-nav-mega-col">
                                <span class="uni-nav-mega-title">Branding</span>
                                <ul class="uni-nav-mega-list">
                                    <li><a href="/service/video-production.html">Video Production</a></li>
                                    <li><a href="/service/brand-name.html">Brand Name</a></li>
                                    <li><a href="/service/logo-design.html">Logo Design</a></li>
                                    <li><a href="/service/brochure-design.html">Brochure Design</a></li>
                                </ul>
                            </div>
                            <!-- Industries -->
                            <div class="uni-nav-mega-col">
                                <span class="uni-nav-mega-title">Industries</span>
                                <ul class="uni-nav-mega-list">
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
                    </li>
                </ul>
            </div>

            <!-- ACTIONS (Contact + Hamburger) -->
            <div class="uni-nav-actions">
                <a href="/contact.html" class="uni-nav-cta">Contact Us</a>
                
                <button class="uni-nav-burger" id="uni-open-btn">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- MOBILE MENU STRUCTURE -->
    <div class="uni-mob-overlay" id="uni-overlay"></div>
    
    <div class="uni-mob-panel" id="uni-panel">
        
        <!-- HEADER inside Panel with LOGO & CLOSE -->
        <div class="uni-mob-header">
            <!-- Mobile Drawer Logo -->
            <div class="uni-mob-logo">
                <a href="/index.html">
                    <img src="/assets/digitech-logo.jpg" alt="Digitech Logo">
                </a>
            </div>

            <button class="uni-mob-close" id="uni-close-btn">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        
        <!-- Scrollable Content -->
        <div class="uni-mob-content">
            <a href="/index.html" class="uni-mob-link">Home</a>
            <a href="/about-us.html" class="uni-mob-link">About</a>
            
            <!-- Dropdown -->
            <div>
                <!-- Sticky Accordion Header -->
                <div class="uni-mob-dd-head" id="uni-acc-toggle">
                    <span>Services</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                
                <div class="uni-mob-dd-body" id="uni-acc-body">
                     <!-- Digital Marketing -->
                     <span class="uni-mob-dd-cat">Digital Marketing</span>
                     <a href="/service/seo.html" class="uni-mob-sublink">SEO</a>
                     <a href="/service/smm.html" class="uni-mob-sublink">Social Media Marketing</a>
                     <a href="/service/content-marketing.html" class="uni-mob-sublink">Content Marketing</a>
                     <a href="/service/google-ads-ppc.html" class="uni-mob-sublink">Google Ads PPC</a>
                     <a href="/service/email-marketing.html" class="uni-mob-sublink">Email Marketing</a>
                     <a href="/service/sms-marketing.html" class="uni-mob-sublink">SMS Marketing</a>
                     <a href="/service/google-my-business.html" class="uni-mob-sublink">Google My Business</a>
 
                     <!-- Website Development -->
                     <span class="uni-mob-dd-cat">Website Development</span>
                     <a href="/service/website-developement.html" class="uni-mob-sublink">Website Development</a>
                     <a href="/service/ecommerce-development.html" class="uni-mob-sublink">E-Commerce</a>
                     <a href="/service/mobile-app-developement.html" class="uni-mob-sublink">Mobile App</a>
                     <a href="/service/cms-developement.html" class="uni-mob-sublink">CMS Development</a>
 
                     <!-- Branding -->
                     <span class="uni-mob-dd-cat">Branding</span>
                     <a href="/service/video-production.html" class="uni-mob-sublink">Video Production</a>
                     <a href="/service/brand-name.html" class="uni-mob-sublink">Brand Name</a>
                     <a href="/service/logo-design.html" class="uni-mob-sublink">Logo Design</a>
                     <a href="/service/brochure-design.html" class="uni-mob-sublink">Brochure Design</a>
                     
                      <!-- Industries -->
                     <span class="uni-mob-dd-cat">Industries</span>
                     <a href="/service/manufactures-digital-marketing.html" class="uni-mob-sublink">Manufactures</a>
                     <a href="/service/education-digital-marketing.html" class="uni-mob-sublink">Education</a>
                     <a href="/service/real-estate-digital-marketing.html" class="uni-mob-sublink">Real Estate</a>
                     <a href="/service/ecommerce-digital-marketing.html" class="uni-mob-sublink">E-Commerce</a>
                     <a href="/service/travel-and-tourism-digital-marketing.html" class="uni-mob-sublink">Travel</a>
                     <a href="/service/hospital-digital-marketing.html" class="uni-mob-sublink">Hospital</a>
                     <a href="/service/political-digital-marketing.html" class="uni-mob-sublink">Political</a>
                </div>
            </div>

            <a href="/contact.html" class="uni-mob-link">Contact</a>

            <div class="uni-mob-social">
                <h4>Follow Us</h4>
                <ul class="uni-soc-list">
                    <li>
                      <a href="https://www.facebook.com/thedigitechsolutions/" target="_blank" class="uni-soc-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/the.digitech.solutions/" target="_blank" class="uni-soc-item">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/the-digitech-solutions-a3a30033a/" target="_blank" class="uni-soc-item">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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

  // 2. Inject Into Container
  const targetElement = document.getElementById("global-header-container");
  if (targetElement) {
    targetElement.innerHTML = headerHTML;
  } else {
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  }

  // 3. Init Logic
  initUniqueHeader();
});

function initUniqueHeader() {
    const openBtn = document.getElementById('uni-open-btn');
    const closeBtn = document.getElementById('uni-close-btn');
    const overlay = document.getElementById('uni-overlay');
    const panel = document.getElementById('uni-panel');
    const body = document.body;
    
    const accToggle = document.getElementById('uni-acc-toggle');
    const accBody = document.getElementById('uni-acc-body');
    const accIcon = accToggle ? accToggle.querySelector('svg') : null;

    function openMenu() {
        panel.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('uni-scroll-lock');
    }

    function closeMenu() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('uni-scroll-lock');
    }

    if(openBtn) openBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(overlay) overlay.addEventListener('click', closeMenu);

    // Mobile Accordion Logic
    if(accToggle && accBody) {
        accToggle.addEventListener('click', () => {
            accBody.classList.toggle('active');
            if(accBody.classList.contains('active')) {
                accIcon.style.transform = 'rotate(180deg)';
            } else {
                accIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
}
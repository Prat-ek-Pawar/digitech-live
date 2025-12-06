document.addEventListener("DOMContentLoaded", function () {
  // 1. Define the HTML Structure
  const headerHTML = `
    <style>
        /* --- GENERAL RESET --- */
        body {
            padding-top: 0 !important;
            margin: 0 !important;
        }

        /* --- BODY SCROLL LOCK (CRITICAL) --- */
        /* When menu is open, lock body completely */
        body.gh-menu-open {
            overflow: hidden !important;
            height: 100vh !important;
            /* touch-action: none; REMOVED to allow scrolling inside the fixed menu */
        }

        /* --- DESKTOP HEADER STYLES --- */
        #gh-header-container {
            width: 100%;
            position: relative;
            z-index: 999; 
            background-color: #ffffff;
            box-shadow: 0 2px 15px rgba(0,0,0,0.05);
            font-family: 'Inter', sans-serif;
            height: 90px;
        }

        .gh-container {
            max-width: 1750px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
        }

        .gh-logo img {
            max-width: 140px;
            display: block;
        }

        /* --- DESKTOP MENU --- */
        .gh-desktop-menu {
            display: none;
        }

        @media (min-width: 1200px) {
            .gh-desktop-menu {
                display: block;
            }
        }

        .gh-nav-list {
        background-color: black;
        width:300px;
       max-height: 60px;
            list-style: none;
            margin-top:20px;
            padding-left: 50;
            display: flex;
            align-items: center;
            gap: 40px;
            border-radius: 48px;
        }

        .gh-nav-item {
            position: relative;
            height: 90px; /* Full height for hover area */
            display: flex;
            align-items: center;
        }

        .gh-nav-link {
            text-decoration: none;
            color: #ffffffff;
            font-weight: 500;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: color 0.3s ease;
        }

        .gh-nav-link:hover {
            color: #7463FF;
        }

        .gh-nav-link svg {
            transition: transform 0.3s ease;
            stroke: #000000; /* Default Black Arrow */
        }

        .gh-nav-item:hover .gh-nav-link svg {
            transform: rotate(180deg);
        }

        /* --- MEGA MENU (Desktop) --- */
        .gh-megamenu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            width: 1100px;
            background-color: #050505;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 0 0 12px 12px;
            padding: 40px;
            box-shadow: 0 30px 80px rgba(0,0,0,0.4);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            flex-wrap: wrap;
        }

        .gh-nav-item:hover .gh-megamenu {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }

        .gh-mm-col {
            width: 25%;
            padding: 0 15px;
            box-sizing: border-box;
        }

        .gh-mm-title {
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

        .gh-mm-list {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .gh-mm-list li {
            margin-bottom: 12px;
        }

        .gh-mm-list a {
            color: #f0f0f0;
            text-decoration: none;
            font-size: 15px;
            transition: 0.2s;
            display: block;
            font-weight: 500;
        }

        .gh-mm-list a:hover {
            color: #dafa66;
            transform: translateX(5px);
        }

        /* --- ACTIONS --- */
        .gh-actions {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .gh-contact-btn {
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

        .gh-contact-btn:hover {
            background-color: #dafa66;
            color: #000000 !important;
            transform: translateY(-2px);
        }

        @media (min-width: 1200px) {
            .gh-contact-btn { display: inline-block; }
        }

        /* --- HAMBURGER BUTTON --- */
        .gh-burger-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            display: block;
            line-height: 0;
        }

        @media (min-width: 1200px) {
            .gh-burger-btn { display: none; }
        }

        /* --- MOBILE MENU (OFFCANVAS) --- */
        .gh-mobile-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            z-index: 99998;
            opacity: 0;
            visibility: hidden;
            transition: 0.3s;
            backdrop-filter: blur(3px);
        }

        .gh-mobile-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        /* The Panel Container */
        .gh-mobile-panel {
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
            display: flex;           /* FLEXBOX IS KEY */
            flex-direction: column;  /* Stack children vertically */
            height: 100%;            /* Full viewport height */
        }

        .gh-mobile-panel.active {
            transform: translateX(0);
        }

        /* 1. Fixed Header inside Panel */
        .gh-mobile-header {
            padding: 20px;
            display: flex;
            justify-content: flex-end;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            flex-shrink: 0; /* Prevent shrinking */
            background: #000;
        }

        .gh-close-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
        }
        
        .gh-close-btn svg {
            stroke: #ffffff;
        }

        /* 2. Scrollable Content Area */
        .gh-mobile-content {
            padding: 0 20px;
            flex-grow: 1;       /* Take up all remaining space */
            overflow-y: auto;   /* Scroll ONLY this area */
            overscroll-behavior: contain; /* Prevent scroll from passing to body */
            -webkit-overflow-scrolling: touch; /* Smooth iOS scroll */
            position: relative;
        }

        /* Links */
        .gh-mobile-link {
            display: block;
            color: #ffffff;
            text-decoration: none;
            font-size: 18px;
            font-weight: 500;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        /* 3. Sticky "Services" Header INSIDE the scrollable area */
        .gh-mobile-dd-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #ffffff;
            font-size: 18px;
            font-weight: 500;
            padding: 15px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            cursor: pointer;
            
            /* STICKY MAGIC */
            position: sticky; 
            top: 0;           
            background: #000000; /* Must have background to cover scrolling content */
            z-index: 10;         /* Sit on top of content */
        }

        .gh-mobile-dd-body {
            display: none;
            background: #111111;
            padding: 0 15px; /* Removed vertical padding */
            margin-top: 0;
        }

        .gh-mobile-dd-body.active {
            display: block;
            padding-bottom: 15px;
        }

        .gh-mobile-dd-title {
            color: #dafa66;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 8px;
            display: block;
        }

        .gh-mobile-dd-link {
            display: block;
            color: #d1d1d1;
            text-decoration: none;
            font-size: 15px;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .gh-mobile-dd-link:last-child {
            border-bottom: none;
        }

        /* 4. Social Footer (Fixed at bottom or scrolled) */
        /* We put it inside scrollable area to ensure it's reachable on small screens */
        .gh-mobile-social {
            margin-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 20px;
            padding-bottom: 40px; 
        }

        .gh-mobile-social h4 {
            color: #fff;
            font-size: 16px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .gh-social-list {
            display: flex;
            gap: 15px;
            padding: 0;
            list-style: none;
            margin: 0;
        }

        .gh-social-link {
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

        .gh-social-link:hover {
            background: #dafa66;
            border-color: #dafa66;
            color: #000; /* Black Icon on Hover */
        }
        
        /* SVG Colors Fix */
        .gh-burger-btn svg { stroke: #000000; }
        .gh-close-btn svg { stroke: #ffffff; }
        .gh-mobile-dd-header svg { stroke: #ffffff; transition: transform 0.3s; }
        .gh-social-link svg { stroke: currentColor; }
    </style>

    <div id="gh-header-container">
        <div class="gh-container">
            
            <!-- LOGO -->
            <div class="gh-logo">
                <a href="/index.html">
                    <img src="/assets/digitech-logo.jpg" alt="Digitech Logo">
                </a>
            </div>

            <!-- DESKTOP MENU -->
            <div class="gh-desktop-menu">
                <ul class="gh-nav-list">
                    <li class="gh-nav-item"><a href="/index.html" class="gh-nav-link">Home</a></li>
                    <li class="gh-nav-item"><a href="/about-us.html" class="gh-nav-link">About</a></li>
                    
                    <li class="gh-nav-item">
                        <a href="javascript:void(0)" class="gh-nav-link">
                            Services 
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 1L6 6L11 1"/>
                            </svg>
                        </a>
                        
                        <!-- MEGA MENU -->
                        <div class="gh-megamenu">
                            <!-- Digital Marketing -->
                            <div class="gh-mm-col">
                                <span class="gh-mm-title">Digital Marketing</span>
                                <ul class="gh-mm-list">
                                    <li><a href="/service/seo.html">Search Engine Optimization</a></li>
                                    <li><a href="/service/smm.html">Social Media Marketing</a></li>
                                    <li><a href="/service/content-marketing.html">Content Marketing</a></li>
                                    <li><a href="/service/google-ads-ppc.html">Google Ads PPC</a></li>
                                    <li><a href="/service/email-marketing.html">Email Marketing</a></li>
                                    <li><a href="/service/sms-marketing.html">SMS Marketing</a></li>
                                    <li><a href="/service/google-my-business.html">Google My Business</a></li>
                                </ul>
                            </div>
                            <!-- Web Dev -->
                            <div class="gh-mm-col">
                                <span class="gh-mm-title">Website Development</span>
                                <ul class="gh-mm-list">
                                    <li><a href="/service/website-developement.html">Website Development</a></li>
                                    <li><a href="/service/ecommerce-development.html">E-Commerce</a></li>
                                    <li><a href="/service/mobile-app-developement.html">Mobile App</a></li>
                                    <li><a href="/service/cms-developement.html">CMS Development</a></li>
                                </ul>
                            </div>
                            <!-- Branding -->
                            <div class="gh-mm-col">
                                <span class="gh-mm-title">Branding</span>
                                <ul class="gh-mm-list">
                                    <li><a href="/service/video-production.html">Video Production</a></li>
                                    <li><a href="/service/brand-name.html">Brand Name</a></li>
                                    <li><a href="/service/logo-design.html">Logo Design</a></li>
                                    <li><a href="/service/brochure-design.html">Brochure Design</a></li>
                                </ul>
                            </div>
                            <!-- Industries -->
                            <div class="gh-mm-col">
                                <span class="gh-mm-title">Industries</span>
                                <ul class="gh-mm-list">
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
            <div class="gh-actions">
                <a href="/contact.html" class="gh-contact-btn">Contact Us</a>
                
                <button class="gh-burger-btn" id="gh-open-menu">
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
    <div class="gh-mobile-overlay" id="gh-overlay"></div>
    
    <div class="gh-mobile-panel" id="gh-panel">
        <!-- Fixed Header inside Panel -->
        <div class="gh-mobile-header">
            <button class="gh-close-btn" id="gh-close-menu">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        
        <!-- Scrollable Content -->
        <div class="gh-mobile-content">
            <a href="/index.html" class="gh-mobile-link">Home</a>
            <a href="/about-us.html" class="gh-mobile-link">About</a>
            
            <!-- Dropdown -->
            <div>
                <!-- This Header is Sticky via CSS -->
                <div class="gh-mobile-dd-header" id="gh-dd-toggle">
                    <span>Services</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                
                <div class="gh-mobile-dd-body" id="gh-dd-body">
                     <!-- Digital Marketing -->
                     <span class="gh-mobile-dd-title">Digital Marketing</span>
                     <a href="/service/seo.html" class="gh-mobile-dd-link">SEO</a>
                     <a href="/service/smm.html" class="gh-mobile-dd-link">Social Media Marketing</a>
                     <a href="/service/content-marketing.html" class="gh-mobile-dd-link">Content Marketing</a>
                     <a href="/service/google-ads-ppc.html" class="gh-mobile-dd-link">Google Ads PPC</a>
                     <a href="/service/email-marketing.html" class="gh-mobile-dd-link">Email Marketing</a>
                     <a href="/service/sms-marketing.html" class="gh-mobile-dd-link">SMS Marketing</a>
                     <a href="/service/google-my-business.html" class="gh-mobile-dd-link">Google My Business</a>
 
                     <!-- Website Development -->
                     <span class="gh-mobile-dd-title">Website Development</span>
                     <a href="/service/website-developement.html" class="gh-mobile-dd-link">Website Development</a>
                     <a href="/service/ecommerce-development.html" class="gh-mobile-dd-link">E-Commerce</a>
                     <a href="/service/mobile-app-developement.html" class="gh-mobile-dd-link">Mobile App</a>
                     <a href="/service/cms-developement.html" class="gh-mobile-dd-link">CMS Development</a>
 
                     <!-- Branding -->
                     <span class="gh-mobile-dd-title">Branding</span>
                     <a href="/service/video-production.html" class="gh-mobile-dd-link">Video Production</a>
                     <a href="/service/brand-name.html" class="gh-mobile-dd-link">Brand Name</a>
                     <a href="/service/logo-design.html" class="gh-mobile-dd-link">Logo Design</a>
                     <a href="/service/brochure-design.html" class="gh-mobile-dd-link">Brochure Design</a>
                     
                      <!-- Industries -->
                     <span class="gh-mobile-dd-title">Industries</span>
                     <a href="/service/manufactures-digital-marketing.html" class="gh-mobile-dd-link">Manufactures</a>
                     <a href="/service/education-digital-marketing.html" class="gh-mobile-dd-link">Education</a>
                     <a href="/service/real-estate-digital-marketing.html" class="gh-mobile-dd-link">Real Estate</a>
                     <a href="/service/ecommerce-digital-marketing.html" class="gh-mobile-dd-link">E-Commerce</a>
                     <a href="/service/travel-and-tourism-digital-marketing.html" class="gh-mobile-dd-link">Travel</a>
                     <a href="/service/hospital-digital-marketing.html" class="gh-mobile-dd-link">Hospital</a>
                     <a href="/service/political-digital-marketing.html" class="gh-mobile-dd-link">Political</a>
                </div>
            </div>

            <a href="/contact.html" class="gh-mobile-link">Contact</a>

            <div class="gh-mobile-social">
                <h4>Follow Us</h4>
                <ul class="gh-social-list">
                    <li>
                      <a href="https://www.facebook.com/thedigitechsolutions/" target="_blank" class="gh-social-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/the.digitech.solutions/" target="_blank" class="gh-social-link">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/the-digitech-solutions-a3a30033a/" target="_blank" class="gh-social-link">
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
  initGlobalHeader();
});

function initGlobalHeader() {
    const openBtn = document.getElementById('gh-open-menu');
    const closeBtn = document.getElementById('gh-close-menu');
    const overlay = document.getElementById('gh-overlay');
    const panel = document.getElementById('gh-panel');
    const body = document.body;
    
    const ddToggle = document.getElementById('gh-dd-toggle');
    const ddBody = document.getElementById('gh-dd-body');
    const ddIcon = ddToggle ? ddToggle.querySelector('svg') : null;

    function openMenu() {
        panel.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('gh-menu-open');
    }

    function closeMenu() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('gh-menu-open');
    }

    if(openBtn) openBtn.addEventListener('click', openMenu);
    if(closeBtn) closeBtn.addEventListener('click', closeMenu);
    if(overlay) overlay.addEventListener('click', closeMenu);

    // Mobile Accordion Logic
    if(ddToggle && ddBody) {
        ddToggle.addEventListener('click', () => {
            ddBody.classList.toggle('active');
            if(ddBody.classList.contains('active')) {
                ddIcon.style.transform = 'rotate(180deg)';
            } else {
                ddIcon.style.transform = 'rotate(0deg)';
            }
        });
    }
}
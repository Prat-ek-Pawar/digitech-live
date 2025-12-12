document.addEventListener("DOMContentLoaded", function() {
    const footerContainer = document.getElementById("global-footer-container");
    if (footerContainer) {
        footerContainer.innerHTML = `
        <footer class="adv-tech-footer" style="width:100%; overflow:hidden;">
          <!-- Container for Three.js -->
          <div id="three-footer-container"></div>
          
          <!-- Gradient Overlay for Text Readability -->
          <div class="footer-overlay-gradient"></div>
        
          <!-- Main Content: Full Width Container with Equal Spacing -->
          <div class="container-fluid relative-layer" style="padding-left: 8%; padding-right: 8%;">
            <div class="row gx-5 justify-content-between">
        
              <!-- Column 1: Brand -->
              <div class="col-xl-3 col-lg-3 col-md-6 mb-50 footer-col">
                <div class="footer-brand-widget">
                  <div class="brand-logo-anim mb-30">
                    <a href="/index.html">
                      <img src="/assets/digitech-logo.png" alt="The Digitech Solutions Logo" style="background-color: rgba(255, 255, 255, 0.934) !important;width: 65%; border-radius: 33px;" class="img-fluid logo-glow">
                    </a>
                  </div>
                  <p class="brand-desc text-wrap">
                    We are committed to helping you succeed, and we will work with you every step of the way to engineer digital excellence.
                  </p>
                  <div class="social-orbit mt-4">
                    <a href="https://www.facebook.com/thedigitechsolutions/" target="_blank" class="orbit-btn fb"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.linkedin.com/in/the-digitech-solutions-a3a30033a/" target="_blank" class="orbit-btn in"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://www.instagram.com/the.digitech.solutions/#" target="_blank" class="orbit-btn ig"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
        
              <!-- Column 2: Services -->
              <div class="col-xl-3 col-lg-3 col-md-6 mb-50 footer-col pl-lg-5">
                <div class="footer-nav-widget">
                  <h4 class="tech-title">Services</h4>
                  <ul class="tech-links text-wrap">
                    <li><a href="/service/website-developement.html" class="link-hover-effect">Website Development</a></li>
                    <li><a href="/service/mobile-app-developement.html" class="link-hover-effect">App Development</a></li>
                    <li><a href="/service/seo.html" class="link-hover-effect">SEO Optimization</a></li>
                    <li><a href="/service/smm.html" class="link-hover-effect">Social Media Marketing</a></li>
                    <li><a href="/service/brand-name.html" class="link-hover-effect">Branding Solutions</a></li>
                  </ul>
                </div>
              </div>
        
              <!-- Column 3: Industries -->
              <div class="col-xl-3 col-lg-3 col-md-6 mb-50 footer-col pl-lg-5">
                <div class="footer-nav-widget">
                  <h4 class="tech-title">Industries</h4>
                  <ul class="tech-links text-wrap">
                    <li><a href="/service/real-estate-digital-marketing-agency-pune.html" class="link-hover-effect">Real Estate</a></li>
                    <li><a href="/service/digital-marketing-education-industry-pune.html" class="link-hover-effect">Education</a></li>
                    <li><a href="/service/digital-marketing-agency-manufacturers-pune.html" class="link-hover-effect">Manufacturing</a></li>
                    <li><a href="/service/ecommerce-development.html" class="link-hover-effect">E-Commerce</a></li>
                    <li><a href="/service/political-digital-marketing.html" class="link-hover-effect">Political</a></li>
                  </ul>
                </div>
              </div>
        
              <!-- Column 4: Contact Info -->
              <div class="col-xl-3 col-lg-3 col-md-6 mb-50 footer-col pl-lg-5">
                <div class="footer-contact-widget">
                  <h4 class="tech-title">Get in Touch</h4>
                  
                  <div class="info-card-wrap">
                    <div class="info-card-item">
                      <div class="info-icon pulse-icon"><i class="fas fa-map-marker-alt"></i></div>
                      <div class="info-text text-wrap">
                        <p>Neo95, SB Patil School Rd,<br> Ravet, Pune, Maharashtra</p>
                      </div>
                    </div>
        
                    <div class="info-card-item">
                      <div class="info-icon pulse-icon"><i class="fas fa-phone-alt"></i></div>
                      <div class="info-text text-wrap">
                        <a href="tel:+919822857421">+91 98228 57421</a>
                      </div>
                    </div>
        
                    <div class="info-card-item">
                      <div class="info-icon pulse-icon"><i class="fas fa-envelope"></i></div>
                      <div class="info-text text-wrap">
                        <a href="mailto:info@thedigitechsolutions.com">info@thedigitechsolutions.com</a>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Quick Links Mini -->
                  <div class="mini-links-bar mt-4 text-wrap">
                    <a href="/index.html">Home</a> <span class="sep">•</span> <a href="/contact.html">Contact</a> <span class="sep">•</span> <a href="/about-us.html">About</a> <span class="sep">•</span> <a href="/service/career.html">Career</a> <span class="sep">•</span> <a href="/blog.html">Blog</a>
                  </div>
        
                </div>
              </div>
        
            </div>
            
            <!-- Copyright -->
            <div class="row pt-30 pb-30 mt-20 border-tech-top">
              <div class="col-12 text-center">
                <p class="copyright-txt">© 2025 The Digitech Solutions. All Rights Reserved.</p>
              </div>
            </div>
        
          </div>
          <style>
            .footer-col {
                word-wrap: break-word; /* Prevent overflow */
                overflow-wrap: break-word;
                width: 100%; /* Default for mobile */
            }
            /* Add left padding to inner columns on large screens to distribute visually */
            @media (min-width: 992px) {
                .pl-lg-5 {
                    padding-left: 3rem !important;
                }
                /* Enforce strict equal width for all 4 columns */
                .col-lg-3 {
                    flex: 0 0 25% !important;
                    max-width: 25% !important;
                    width: 25% !important;
                }
            }
            .text-wrap {
                white-space: normal !important;
                word-break: break-word; /* Force break if word is too long */
            }
            .tech-links, .info-card-wrap {
                margin-top: 15px !important; /* Spacing from Headline */
            }
          </style>
        </footer>
        `;
    }
});

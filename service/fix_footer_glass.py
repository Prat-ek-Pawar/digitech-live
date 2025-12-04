
import os

file_path = r"C:\Users\prati\Downloads\digitech 01-12-2025\digitech 29-11-2025\service\website-development.html"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1. Update Footer HTML (Remove inline colors, add glass class)
footer_start = -1
footer_end = -1

for i, line in enumerate(lines):
    if '<footer class="adv-tech-footer">' in line:
        footer_start = i
    if '</footer>' in line and footer_start != -1:
        footer_end = i
        break

if footer_start != -1 and footer_end != -1:
    # Replace the footer block with a cleaner version that uses classes
    new_footer = """  <!-- FOOTER -->
  <footer class="adv-tech-footer glass-footer">
    <div class="container-custom">
      <div class="row">
        <div class="col-lg-4 mb-5">
          <img src="/assets/digitech-logo.png" alt="Logo" class="footer-logo">
          <p class="footer-desc">We engineer digital excellence for brands that want to stand out. Trusted by Pune's leading businesses.</p>
        </div>
        <div class="col-lg-2 col-6 mb-5">
          <h4 class="footer-title">Services</h4>
          <ul class="footer-links list-unstyled">
            <li><a href="#">Web Development</a></li>
            <li><a href="#">App Development</a></li>
            <li><a href="#">SEO Services</a></li>
            <li><a href="#">Digital Marketing</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-6 mb-5">
          <h4 class="footer-title">Company</h4>
          <ul class="footer-links list-unstyled">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-4 mb-5">
          <h4 class="footer-title">Contact</h4>
          <p class="footer-contact">Neo95, SB Patil School Rd, Ravet, Pune, Maharashtra</p>
          <p class="footer-contact">+91 98228 57421</p>
          <p class="footer-contact">info@thedigitechsolutions.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 The Digitech Solutions. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
"""
    lines[footer_start:footer_end+1] = [new_footer]

# 2. Add Footer CSS
css_footer = """
    /* --- GLASS FOOTER --- */
    .glass-footer {
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        padding: 80px 0 30px;
        position: relative;
        z-index: 1;
        margin-top: 50px;
    }
    
    .footer-logo {
        width: 150px;
        background: transparent; /* Assuming logo is transparent png, or keep white if needed */
        margin-bottom: 20px;
    }
    
    .footer-title {
        color: #1a1a1a;
        font-weight: 700;
        margin-bottom: 25px;
        font-size: 20px;
    }
    
    .footer-desc, .footer-contact {
        color: #555;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .footer-links li {
        margin-bottom: 12px;
    }
    
    .footer-links a {
        color: #555;
        transition: all 0.3s;
        font-size: 16px;
    }
    
    .footer-links a:hover {
        color: #7463FF;
        padding-left: 5px;
    }
    
    .footer-bottom {
        border-top: 1px solid rgba(0,0,0,0.1);
        padding-top: 30px;
        text-align: center;
        margin-top: 50px;
    }
    
    .footer-bottom p {
        color: #666;
        font-size: 14px;
        margin: 0;
    }
"""

# Append CSS
for i, line in enumerate(lines):
    if "</style>" in line:
        lines.insert(i, css_footer)
        break

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

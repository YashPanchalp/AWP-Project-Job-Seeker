
const fs = require('fs');
const content = \<div class=\"home-container\" style=\"background-color: #fff;\">
  <section class=\"hero-section\" style=\"background-color: var(--li-bg); padding:60px 16px;\">
    <div class=\"explore-container\" style=\"display:flex; align-items:center; gap:60px;\">
      <div class=\"hero-text\" style=\"flex:1;\">
        <h1 style=\"font-size:56px; font-weight:200; color:#8f5849; line-height:1.2; margin-bottom:24px;\">Welcome to your professional community</h1>
        <div class=\"hero-actions\" style=\"display:flex; flex-direction:column; gap:16px; margin-top:32px; max-width:400px;\">
          <a href=\"#/login\" class=\"btn btn-outline\" style=\"border-radius:24px; padding:16px; font-size:20px; display:flex; justify-content:space-between; align-items:center;\">
            Sign in
            <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"currentColor\"><path d=\"M14 12l-5 5-1.4-1.4 3.6-3.6-3.6-3.6L9 7l5 5z\"></path></svg>
          </a>
          <a href=\"#/register\" class=\"btn btn-outline\" style=\"border-radius:24px; padding:16px; font-size:20px; display:flex; justify-content:space-between; align-items:center;\">
            New to JobSeeker? Join now
            <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"currentColor\"><path d=\"M14 12l-5 5-1.4-1.4 3.6-3.6-3.6-3.6L9 7l5 5z\"></path></svg>
          </a>
        </div>
      </div>
      <div class=\"hero-visual\" style=\"flex:1; display:flex; justify-content:center;\">
        <img src=\"https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4\" alt=\"Professionals working\" style=\"width:100%; max-width:700px; border-radius:50%; mix-blend-mode:multiply; animation: float 6s ease-in-out infinite;\">
      </div>
    </div>
  </section>

  <section class=\"explore-section\">
    <div class=\"explore-container\">
      <h2 style=\"font-size:32px; font-weight:400; margin-bottom:24px;\">Explore top opportunities</h2>
      <div class=\"explore-grid\">
        <div class=\"explore-card\">
          <h3>Engineering</h3>
          <p style=\"color:var(--li-text-muted);\">Find remote & onsite software engineering jobs worldwide.</p>
        </div>
        <div class=\"explore-card\">
          <h3>Design</h3>
          <p style=\"color:var(--li-text-muted);\">Discover creatively-fulfilling UI/UX and product roles.</p>
        </div>
        <div class=\"explore-card\">
          <h3>Product</h3>
          <p style=\"color:var(--li-text-muted);\">Build the future with amazing Product Management openings.</p>
        </div>
      </div>
    </div>
  </section>
</div>\;

fs.writeFileSync('frontend/views/home.html', content);
console.log('home.html updated!');


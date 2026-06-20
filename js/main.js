/* ============================================
   Dheny Puji Laksono - Portfolio JavaScript
   All interactive functionality, modals, demos, PDF generation
   ============================================ */

// Tailwind script (if needed for runtime config)
function initializeTailwind() {
  // Tailwind CDN is already configured via play CDN in HTML
  // This function can be extended if custom Tailwind config is needed later
}

// Dark / Light Mode Toggle
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");
  const html = document.documentElement;

  // Default to dark theme (professional data portfolio look)
  if (!localStorage.getItem("theme")) {
    html.classList.add("dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else if (localStorage.getItem("theme") === "light") {
    html.classList.remove("dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    html.classList.add("dark");
    icon.classList.add("fa-moon");
  }

  toggleBtn.addEventListener("click", () => {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + "%";
  });
}

// Back to Top Button
function initBackToTop() {
  const backBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      backBtn.style.display = "flex";
    } else {
      backBtn.style.display = "none";
    }
  });
}

// Mobile Menu
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const icon = menuBtn.querySelector("i");
    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      const icon = menuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
}

// Active Nav Link on Scroll using Intersection Observer
function initActiveNav() {
  const sections = [
    "home",
    "about",
    "skills",
    "projects",
    "dashboard",
    "experience",
    "certificates",
    "resume",
    "contact",
  ];
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove("nav-active", "text-cyan-400");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("nav-active", "text-cyan-400");
            }
          });

          mobileLinks.forEach((link) => {
            link.classList.remove("text-cyan-400", "bg-slate-900");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("text-cyan-400", "bg-slate-900");
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" },
  );

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

// Animated Counters for Stats
function animateCounters() {
  const counters = [
    { id: "stat-projects", target: 4, suffix: "" },
    { id: "stat-certs", target: 8, suffix: "" },
    { id: "stat-exp", target: 1, suffix: "" },
    { id: "stat-models", target: 5, suffix: "" },
  ];

  counters.forEach((counter) => {
    const element = document.getElementById(counter.id);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let current = 0;
          const increment = counter.target / 55;
          const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
              element.textContent = counter.target + counter.suffix;
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(current) + counter.suffix;
            }
          }, 28);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(element);
  });
}

// Hero Canvas - Data Particles / Network Visualization
function initHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  let particles = [];
  let animationFrame;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2.2 + 1.1;
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(103, 232, 249, ${this.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 135) {
          ctx.save();
          ctx.strokeStyle = `rgba(103, 232, 249, ${0.12 * (1 - distance / 135)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationFrame = requestAnimationFrame(animate);
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 8500);
    for (let i = 0; i < Math.min(count, 65); i++) {
      particles.push(new Particle());
    }
  }

  // Initialize
  resizeCanvas();
  initParticles();
  animate();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  // Pause when not visible (performance)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      animate();
    }
  });
}

// Project Demo Data & Functions
const projectData = [
  {
    title: "SQL Data Analysis Queries",
    content: `
            <div>
                <p class="text-sm mb-4">Key analytical queries developed for the e-commerce database project:</p>
                
                <div class="space-y-4 text-xs font-mono">
                    <div class="p-4 bg-black/60 rounded-2xl border border-slate-700">
                        <div class="text-emerald-400 mb-1">-- Total Orders by Store</div>
                        <div class="text-slate-300">SELECTs.store_name,s.city,
                                                            o.order_date,
                                                            SUM(s.store_id) AS total_order
                                                        FROM stores s
                                                        JOIN orders o
                                                            ON s.store_id = o.store_id
                                                        GROUP BY 
                                                            s.store_name,
                                                            s.city,
                                                            o.order_date;</div>
                    </div>
                </div>
                
                <div class="mt-5 text-xs text-center text-slate-500">Full SQL scripts, views, and stored procedures available on GitHub repository.</div>
            </div>
        `,
  },
];

function showProjectDemo(index) {
  const modal = document.getElementById("project-modal");
  const titleEl = document.getElementById("modal-project-title");
  const contentEl = document.getElementById("modal-project-content");

  if (!modal || !titleEl || !contentEl) return;

  titleEl.innerHTML = projectData[index].title;
  contentEl.innerHTML = projectData[index].content;
  modal.style.display = "flex";

  setTimeout(() => {
    const smsInput = document.getElementById("sms-input");
    if (smsInput) smsInput.focus();
  }, 300);
}

function hideProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) modal.style.display = "none";
}

// Dashboard Gallery Data & Modals
const dashboardData = [
  {
    title: "Real Estate Market Performance: Executive Summary (2006–2010)",
    subtitle: "Power BI",
    image: "image/ds1.png",
    desc: "Developed an executive-level Power BI dashboard to analyze real estate market performance using 1,460 property transactions. The dashboard provides insights into total sales value, average property prices, transaction volumes, geographical distribution, and yearly market trends, enabling stakeholders to monitor market performance and identify emerging opportunities through interactive visual analytics.",
    tech: ["Power BI", "Python"],
  },
  {
    title: "Property Characteristics & Price Drivers Analysis",
    subtitle: "Power BI",
    image: "image/ds2.png",
    desc: "Designed an analytical dashboard to examine the relationship between property characteristics and market value. The analysis explores how factors such as living area, building type, house style, garage capacity, fireplaces, and overall quality influence residential property prices, helping uncover the key drivers behind property valuation.",
    tech: ["Power BI", "Python"],
  },
  {
    title: "Quarterly Order Trends Analysis by Store Location (2016–2018)",
    subtitle: "Tableau",
    image: "image/tabeleu.png",
    desc: "Developed an interactive Tableau dashboard to analyze quarterly order trends across multiple retail store locations from 2016 to 2018. The analysis highlights sales performance differences, seasonal demand fluctuations, and ordering patterns, enabling stakeholders to evaluate store performance and support data-driven inventory and sales planning.",
    tech: ["Tableau", "Mysql"],
  },
];

function showDashboardModal(index) {
  const modal = document.getElementById("dashboard-modal");
  const data = dashboardData[index];

  if (!modal || !data) return;

  const titleEl = document.getElementById("dash-modal-title");
  const subtitleEl = document.getElementById("dash-modal-subtitle");
  const imgEl = document.getElementById("dash-modal-image");
  const descEl = document.getElementById("dash-modal-desc");
  const techContainer = document.getElementById("dash-modal-tech");

  if (titleEl) titleEl.innerHTML = data.title;
  if (subtitleEl) subtitleEl.innerHTML = data.subtitle;
  if (imgEl) imgEl.src = data.image;
  if (descEl) descEl.innerHTML = data.desc;

  if (techContainer) {
    techContainer.innerHTML = data.tech
      .map(
        (t) =>
          `<span class="px-4 py-1 text-xs rounded-2xl bg-slate-800 border border-slate-700">${t}</span>`,
      )
      .join("");
  }

  modal.style.display = "flex";
}

function hideDashboardModal() {
  const modal = document.getElementById("dashboard-modal");
  if (modal) modal.style.display = "none";
}

// Certificate Data & Modals
const certData = [
  {
    icon: '<i class="fa-solid fa-code text-violet-400"></i>',
    title: "Python",
    issuer: "Course • Dicoding • 2026",
    desc: "This course is designed for beginners to learn the basics of Python programming based on industry standards. Students learn to create programs using IDEs such as Visual Studio Code, Jupyter Notebook, and Google Colaboratory.",
    link: "https://drive.google.com/file/d/12kcE6plED0TeKFiGFLIcy2FncdPlMUYo/view?usp=sharing",
  },
  {
    icon: '<i class="fa-brands fa-python text-violet-400"></i>',
    title: "PCAP - Programming Essentials in Python",
    issuer: "Course • Cisco • 2023",
    desc: "This certificate is awarded to the individual for successfully completing the Programming Essentials in Python course as part of the Cisco Networking Academy program",
    link: "https://drive.google.com/file/d/1rKkqpAUECKx9ed-uw4voKsUEKzfhltLV/view?usp=sharing",
  },
  {
    icon: '<i class="fa-solid fa-database text-violet-400"></i>',
    title: "MySQL",
    issuer: "Course • Dicoding • 2025",
    desc: "Designed for aspiring data analysts and data scientists to master basic queries for data management using SQL",
    link: "https://drive.google.com/file/d/1SsV5mjoLvNCBWqPvUFtqh9dm8mpo0glu/view?usp=sharing",
  },
  {
    icon: '<i class="fa-solid fa-brain text-violet-400"></i>',
    title: "Artificial Intelligence",
    issuer: "Course • Dicoding • 2025",
    desc: "This course is designed for beginners who want to start a career in the field of Artificial Intelligence (AI). Upon completion, students are expected to be able to analyze various basic concepts of AI and their applications effectively.",
    link: "https://drive.google.com/file/d/1f9GuRMHn11H7FoxU9kluz8yHsNCAzwe2/view?usp=sharing",
  },
  {
    icon: '<i class="fa-solid fa-building text-violet-400"></i>',
    title: "Certificate Internship",
    issuer: "Data Analyst • Garuda Indonesia • 2025",
    desc: "Internship certificate for Data Analyst experience at Garuda Indonesia.",
    link: "https://drive.google.com/file/d/1wXwu_4ueJBxdYLVz-xr9-q4mVHvVbzCD/view?usp=sharing",
  },
  {
    icon: '<i class="fa-solid fa-chart-line text-amber-400"></i>',
    title: "Data Classification and Summarization Using IBM Granite",
    issuer: "Course • IBM • 2025",
    desc: "This certificate is awarded in recognition of the commitment to achieve professional excellence and for successfully satisfying the requirements of the course",
    link: "https://www.credly.com/badges/4f5dd98c-464a-460e-90bd-e6abac976a77",
  },
  {
    icon: '<i class="fa-solid fa-chart-simple text-amber-400"></i>',
    title: "Data Science",
    issuer: "Course • Dicoding • 2025",
    desc: "The course is designed for individuals aiming to become data scientists by learning the fundamental concepts of data science. It aims to enable students to recognize, understand, and analyze data science basics effectively.",
    link: "https://drive.google.com/file/d/1SHvhFGiEn7B-T_jSQfhuIXe23ONqNymB/view?usp=sharing",
  },
  {
    icon: '<i class="fa-solid fa-award text-amber-400"></i>',
    title: "Digital Talent Scholarship - Startup Foundation",
    issuer: "Scholarship • Komdigi • 2024",
    desc: "Certificate from Digital Talent Scholarship Microcredential program.",
    link: "https://drive.google.com/file/d/17tw-aFOS3lOJNIMWrxvj1V_Jf2CBMr8o/view?usp=sharing",
  },
  {
    icon: '<i class="fa-solid fa-award text-amber-400"></i>',
    title: "Software Engineer",
    issuer: "Competence • BNSP • 2025",
    desc: "Competence certificate for Software Engineer.",
    link: "https://drive.google.com/file/d/1vVz6U4OuyHwtrFxWCZicoWnd7Dhf2WZG/view?usp=sharing",
  },
];

function showCertificateModal(index) {
  const modal = document.getElementById("cert-modal");
  const data = certData[index];

  if (!modal || !data) return;

  const iconEl = document.getElementById("cert-modal-icon");
  const titleEl = document.getElementById("cert-modal-title");
  const issuerEl = document.getElementById("cert-modal-issuer");
  const descEl = document.getElementById("cert-modal-desc");
  const linkEl = document.getElementById("cert-modal-link");

  if (iconEl) iconEl.innerHTML = data.icon;
  if (titleEl) titleEl.innerHTML = data.title;
  if (issuerEl) issuerEl.innerHTML = data.issuer;
  if (descEl) descEl.innerHTML = data.desc;
  if (linkEl) linkEl.href = data.link;

  modal.style.display = "flex";
}

function hideCertModal() {
  const modal = document.getElementById("cert-modal");
  if (modal) modal.style.display = "none";
}
// CV--------------------------------------------------
// Generate Professional PDF Resume using jsPDF
function downloadCV() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = 22;

  // Header accent bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 32, "F");

  doc.setFillColor(103, 232, 249);
  doc.rect(0, 32, pageWidth, 1.2, "F");

  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("DHENY PUJI LAKSONO", margin, 15);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Data Analyst | Business Intelligence | Data Science", margin, 22);

  // Contact line
  doc.setFontSize(9);
  doc.text(
    "Jakarta, Indonesia  •  denipuji028@gmail.com  •  linkedin.com/in/dheny-pujilaksono-73b42020b/  •  github.com/dhenypujilaksono",
    margin,
    28,
  );

  y = 42;

  // Summary
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL SUMMARY", margin, y);
  y += 5.5;

  doc.setDrawColor(103, 232, 249);
  doc.setLineWidth(0.6);
  doc.line(margin, y, margin + 45, y);
  y += 6;

  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const summary =
    "Final-year Information Technology student with hands-on experience in data analysis, business intelligence, dashboard development, and machine learning. Skilled in transforming complex datasets into actionable insights using SQL, Python, Excel, Power BI, and Tableau. Experienced in data validation, trend analysis, reporting, and predictive analytics through professional internships and real-world projects. Passionate about supporting data-driven decision-making and delivering measurable business value through analytics.";

  const splitSummary = doc.splitTextToSize(summary, pageWidth - margin * 2);
  doc.text(splitSummary, margin, y);
  y += splitSummary.length * 4.8 + 6;

  // Skills
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("TECHNICAL SKILLS", margin, y);
  y += 5.5;
  doc.line(margin, y, margin + 38, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);

  const skills = [
    "Data Analytics: Data Cleaning, Data Validation, Exploratory Data Analysis (EDA), Trend Analysis, Statistical Analysis",
    "Business Intelligence: Dashboard Development, KPI Monitoring, Data Visualization, Business Reporting, Data Storytelling",
    "Programming & Databases: Python, SQL, MySQL, JavaScript",
    "Data Science: Machine Learning, Predictive Analytics, NLP, Feature Engineering, Model Evaluation",
    "Tools & Technologies: Excel, Power BI, Tableau, Streamlit, Pandas, NumPy, Scikit-Learn, Plotly, Google Cloud",
  ];

  skills.forEach((skill) => {
    doc.text("•  " + skill, margin, y);
    y += 5;
  });

  y += 5;

  // Experience
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PROFESSIONAL EXPERIENCE", margin, y);
  y += 5.5;
  doc.line(margin, y, margin + 52, y);
  y += 7;

  // Exp 1
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Interline & Strategic Support", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Garuda Indonesia  |  Jan 2025 – Jun 2025",
    pageWidth - margin - 65,
    y,
  );
  y += 5;

  doc.setFontSize(8.8);
  doc.setTextColor(80, 80, 80);
  const exp1 = [
    "• Collected, validated, and analyzed airline fare and partnership datasets to ensure reporting accuracy and data consistency",
    "• Conducted pricing trend analysis and benchmarking across domestic and international airline partners",
    "• Developed structured reports and analytical outputs using advanced Excel functions to support business decision-making",
    "• Collaborated with cross-functional teams to identify data discrepancies and improve operational reporting processes",
  ];
  exp1.forEach((line) => {
    doc.text(line, margin + 2, y);
    y += 4.6;
  });

  y += 5;

  // Exp 2
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("AI & Cloud Engineer Trainee", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Kementerian Kominfo  |  Jul 2024 – Dec 2024",
    pageWidth - margin - 72,
    y,
  );
  y += 5;

  doc.setFontSize(8.8);
  doc.setTextColor(80, 80, 80);
  const exp2 = [
    "• Developed machine learning and data analytics solutions using Python and Google Cloud technologies",
    "• Applied data preprocessing, feature engineering, and model evaluation techniques to solve business problems",
    "• Built AI and Generative AI prototypes using Vertex AI and cloud-based machine learning services",
    "• Collaborated in project-based learning environments to deliver data-driven solutions and analytical insights",
  ];
  exp2.forEach((line) => {
    doc.text(line, margin + 2, y);
    y += 4.6;
  });

  y += 6;

  // ========================================
  // KEY PROJECTS
  // ========================================

  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("KEY PROJECTS", margin, y);

  y += 5.5;

  doc.setDrawColor(103, 232, 249);
  doc.line(margin, y, margin + 30, y);

  y += 8;

  // ========================================
  // PROJECT FUNCTION
  // ========================================

  function addProject(title, description) {
    // Auto new page
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);

    doc.text(`• ${title}`, margin, y);

    y += 5;

    // Description
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);

    const descLines = doc.splitTextToSize(description, 165);

    doc.text(descLines, margin + 4, y);

    y += descLines.length * 4 + 5;
  }

  // ========================================
  // PROJECTS
  // ========================================

  addProject(
    "House Price Prediction & Analytics Dashboard",
    "Built an end-to-end analytics solution combining machine learning and Power BI dashboards to analyze housing market trends, identify key property price drivers, and generate data-driven insights for real estate decision-making.",
  );

  addProject(
    "HR Analytics & Prediction Dashboard",
    "Developed an interactive HR Analytics Dashboard to monitor workforce KPIs, employee demographics, and attrition trends. Leveraged data visualization and automated reporting techniques to generate actionable insights that support employee retention and human resource decision-making.",
  );

  addProject(
    "Bike Store Sales & Order Trend Analysis",
    "Analyzed multi-store sales performance using SQL and Tableau to identify quarterly order trends, seasonal demand patterns, and store-level performance differences. Delivered actionable business insights to support inventory planning and operational decision-making.",
  );

  addProject(
    "Indonesian SMS Spam & Fraud Detection",
    "Developed a machine learning-based text classification solution to identify spam, fraudulent, and legitimate SMS messages in Bahasa Indonesia. Applied NLP techniques, feature engineering, and predictive analytics to support automated message filtering and fraud detection.",
  );

  y += 5;

  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 282, pageWidth - margin, 282);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    "References and full project portfolio available upon request  •  Jakarta, Indonesia  •  2026",
    pageWidth / 2,
    288,
    { align: "center" },
  );

  // Save
  doc.save("Dheny_Puji_Laksono_Data_Analyst_CV_2026.pdf");
}
// END CV --------------------------------------------------------------
// Initialize AOS (Animate On Scroll)
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      delay: 0,
    });
  }
}

// Loading Screen
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.transition = "opacity 0.45s ease";
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
      // Trigger skill progress animation after load
      animateSkillBars();
    }, 450);
  }, 1350);
}

function animateSkillBars() {
  const progressBars = document.querySelectorAll(".skill-progress");
  progressBars.forEach((bar, index) => {
    const width = bar.style.width;
    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.transition = "width 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)";
      bar.style.width = width;
    }, 180 * index);
  });
}

// Keyboard shortcuts & accessibility
function initKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "?" && document.activeElement.tagName === "BODY") {
      e.preventDefault();
      const projects = document.getElementById("projects");
      if (projects)
        projects.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "/") {
      e.preventDefault();
      const contact = document.getElementById("contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth" });
    }
  });

  console.log(
    '%c[Portfolio] Keyboard shortcuts ready: Press "?" to jump to projects, Cmd/Ctrl + "/" to contact section',
    "color:#64748b",
  );
}

// Main Initialization Function
function initializePortfolio() {
  initializeTailwind();
  initThemeToggle();
  initScrollProgress();
  initBackToTop();
  initMobileMenu();
  initActiveNav();
  animateCounters();
  initHeroCanvas();
  initAOS();
  initLoader();
  initKeyboardShortcuts();

  // Easter egg: Konami code for fun data viz
  let konami = [];
  const pattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  document.addEventListener("keydown", function (e) {
    konami.push(e.keyCode);
    if (konami.length > pattern.length) konami.shift();
    if (JSON.stringify(konami) === JSON.stringify(pattern)) {
      const canvas = document.getElementById("hero-canvas");
      if (canvas) {
        canvas.style.transition = "opacity 0.4s";
        canvas.style.opacity = canvas.style.opacity === "0.9" ? "0.4" : "0.9";
      }
      konami = [];
    }
  });

  // Make sure all external links have proper attributes
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    if (!a.getAttribute("rel")) a.setAttribute("rel", "noopener noreferrer");
  });

  // Close modals when pressing Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const projectModal = document.getElementById("project-modal");
      const dashModal = document.getElementById("dashboard-modal");
      const certModal = document.getElementById("cert-modal");

      if (projectModal && projectModal.style.display === "flex") {
        projectModal.style.display = "none";
      } else if (dashModal && dashModal.style.display === "flex") {
        dashModal.style.display = "none";
      } else if (certModal && certModal.style.display === "flex") {
        certModal.style.display = "none";
      }
    }
  });

  console.log(
    "%c[Portfolio] Dheny Puji Laksono professional portfolio initialized successfully.",
    "color:#64748b; font-size: 9px",
  );
}

// Boot application when DOM is ready
document.addEventListener("DOMContentLoaded", initializePortfolio);

// Expose useful functions to console for debugging/demo
window.downloadPortfolioCV = downloadCV;
window.showProjectDemo = showProjectDemo;
window.showDashboardModal = showDashboardModal;

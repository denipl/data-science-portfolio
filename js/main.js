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
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Default to dark theme (professional data portfolio look)
    if (!localStorage.getItem('theme')) {
        html.classList.add('dark');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else if (localStorage.getItem('theme') === 'light') {
        html.classList.remove('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        html.classList.add('dark');
        icon.classList.add('fa-moon');
    }

    toggleBtn.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Back to Top Button
function initBackToTop() {
    const backBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backBtn.style.display = 'flex';
        } else {
            backBtn.style.display = 'none';
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Active Nav Link on Scroll using Intersection Observer
function initActiveNav() {
    const sections = ['home', 'about', 'skills', 'projects', 'dashboard', 'experience', 'certificates', 'resume', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('nav-active', 'text-cyan-400');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-active', 'text-cyan-400');
                    }
                });
                
                mobileLinks.forEach(link => {
                    link.classList.remove('text-cyan-400', 'bg-slate-900');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('text-cyan-400', 'bg-slate-900');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: "-80px 0px -20% 0px" });

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    });
}

// Animated Counters for Stats
function animateCounters() {
    const counters = [
        { id: 'stat-projects', target: 15, suffix: '' },
        { id: 'stat-certs', target: 8, suffix: '' },
        { id: 'stat-exp', target: 2, suffix: '' },
        { id: 'stat-models', target: 12, suffix: '' }
    ];

    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
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
        }, { threshold: 0.6 });
        
        observer.observe(element);
    });
}

// Hero Canvas - Data Particles / Network Visualization
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
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
        
        particles.forEach(p => {
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
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Pause when not visible (performance)
    document.addEventListener('visibilitychange', () => {
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
        title: "Indonesian SMS Spam & Fraud Detection",
        content: `
            <div class="space-y-5 text-sm">
                <p class="text-slate-300">This interactive demo showcases a simplified version of the SMS classification model. Enter an Indonesian SMS text below to see how the model would classify it.</p>
                
                <div>
                    <label class="block text-xs tracking-wider text-slate-400 mb-1.5">INPUT SMS TEXT</label>
                    <textarea id="sms-input" rows="3" class="w-full bg-slate-950 border border-slate-700 focus:border-cyan-600 rounded-2xl p-4 text-sm resize-y" placeholder="Contoh: Selamat anda memenangkan hadiah 100 juta rupiah. Hubungi nomor ini segera!"></textarea>
                </div>
                
                <button onclick="classifySMS()" class="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-slate-950 flex items-center justify-center gap-x-2 active:scale-[0.985] transition">
                    <i class="fa-solid fa-magic"></i> 
                    <span>CLASSIFY WITH ML MODEL</span>
                </button>
                
                <div id="sms-result" class="hidden mt-4 p-5 rounded-2xl border border-slate-700 bg-slate-950">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="text-xs text-slate-400">PREDICTED CLASS</div>
                            <div id="sms-class" class="font-semibold text-2xl mt-0.5"></div>
                        </div>
                        <div class="text-right">
                            <div class="text-xs text-slate-400">CONFIDENCE</div>
                            <div id="sms-conf" class="font-mono text-3xl font-semibold text-emerald-400"></div>
                        </div>
                    </div>
                </div>
                
                <div class="pt-3 text-[10px] text-center text-slate-500">Model: SVM + TF-IDF • Trained on 6,120 labeled Indonesian SMS records • Macro F1: 0.91</div>
            </div>
        `
    },
    {
        title: "Customer Segmentation Dashboard",
        content: `
            <div>
                <p class="text-sm text-slate-300 mb-5">This project segments customers into 4 clusters using RFM (Recency, Frequency, Monetary) analysis + K-Means. Below is a simplified interactive segment explorer.</p>
                
                <div class="grid grid-cols-2 gap-3">
                    <div onclick="selectSegment(0)" class="cursor-pointer p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 bg-slate-950">
                        <div class="font-semibold">Champions</div>
                        <div class="text-xs text-emerald-400">High value • Loyal</div>
                        <div class="text-[10px] mt-3 text-slate-400">32% of customers • 58% revenue</div>
                    </div>
                    <div onclick="selectSegment(1)" class="cursor-pointer p-4 rounded-2xl border border-slate-700 hover:border-amber-500 bg-slate-950">
                        <div class="font-semibold">Loyal Customers</div>
                        <div class="text-xs text-amber-400">Frequent buyers</div>
                        <div class="text-[10px] mt-3 text-slate-400">27% of customers • 24% revenue</div>
                    </div>
                    <div onclick="selectSegment(2)" class="cursor-pointer p-4 rounded-2xl border border-slate-700 hover:border-orange-500 bg-slate-950">
                        <div class="font-semibold">At Risk</div>
                        <div class="text-xs text-orange-400">Declining engagement</div>
                        <div class="text-[10px] mt-3 text-slate-400">23% of customers • 12% revenue</div>
                    </div>
                    <div onclick="selectSegment(3)" class="cursor-pointer p-4 rounded-2xl border border-slate-700 hover:border-red-500 bg-slate-950">
                        <div class="font-semibold">New / Low Value</div>
                        <div class="text-xs text-red-400">One-time purchasers</div>
                        <div class="text-[10px] mt-3 text-slate-400">18% of customers • 6% revenue</div>
                    </div>
                </div>
                
                <div id="segment-detail" class="hidden mt-5 p-4 rounded-2xl bg-slate-950 border border-slate-700 text-xs"></div>
            </div>
        `
    },
    {
        title: "Product Review Sentiment Analysis",
        content: `
            <div class="space-y-4">
                <p class="text-sm">Test the sentiment classifier trained on Indonesian product reviews. The model uses TF-IDF + SVM and achieves 87.3% F1-score.</p>
                
                <div>
                    <label class="text-xs text-slate-400">REVIEW TEXT (Bahasa Indonesia)</label>
                    <textarea id="review-input" rows="3" class="mt-1.5 w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm" placeholder="Produknya bagus banget, pengiriman cepat dan kualitas sesuai harapan!"></textarea>
                </div>
                
                <button onclick="analyzeSentiment()" class="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-slate-950 flex items-center justify-center gap-x-2">
                    ANALYZE SENTIMENT
                </button>
                
                <div id="sentiment-result" class="hidden p-5 rounded-2xl border border-slate-700">
                    <div class="flex items-center justify-between">
                        <div>
                            <div id="sentiment-label" class="font-bold text-3xl"></div>
                            <div id="sentiment-score" class="font-mono text-sm"></div>
                        </div>
                        <i id="sentiment-icon" class="text-5xl"></i>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "SQL Data Analysis Queries",
        content: `
            <div>
                <p class="text-sm mb-4">Key analytical queries developed for the e-commerce database project:</p>
                
                <div class="space-y-4 text-xs font-mono">
                    <div class="p-4 bg-black/60 rounded-2xl border border-slate-700">
                        <div class="text-emerald-400 mb-1">-- Customer Lifetime Value (Cohort)</div>
                        <div class="text-slate-300">WITH customer_cohorts AS (...)</div>
                    </div>
                    <div class="p-4 bg-black/60 rounded-2xl border border-slate-700">
                        <div class="text-emerald-400 mb-1">-- Retention Rate by Month</div>
                        <div class="text-slate-300">SELECT DATE_TRUNC('month', first_purchase) ...</div>
                    </div>
                </div>
                
                <div class="mt-5 text-xs text-center text-slate-500">Full SQL scripts, views, and stored procedures available on GitHub repository.</div>
            </div>
        `
    }
];

function showProjectDemo(index) {
    const modal = document.getElementById('project-modal');
    const titleEl = document.getElementById('modal-project-title');
    const contentEl = document.getElementById('modal-project-content');
    
    if (!modal || !titleEl || !contentEl) return;
    
    titleEl.innerHTML = projectData[index].title;
    contentEl.innerHTML = projectData[index].content;
    modal.style.display = 'flex';
    
    setTimeout(() => {
        const smsInput = document.getElementById('sms-input');
        if (smsInput) smsInput.focus();
    }, 300);
}

function hideProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.style.display = 'none';
}

// Fake SMS Classifier (demo)
function classifySMS() {
    const input = document.getElementById('sms-input')?.value.trim();
    const resultBox = document.getElementById('sms-result');
    const classEl = document.getElementById('sms-class');
    const confEl = document.getElementById('sms-conf');
    
    if (!input || !resultBox || !classEl || !confEl) return;
    
    resultBox.classList.remove('hidden');
    
    const lower = input.toLowerCase();
    let predictedClass = "Normal";
    let confidence = (Math.random() * 12 + 82).toFixed(1);
    let color = "emerald";
    
    if (lower.includes("hadiah") || lower.includes("menang") || lower.includes("100 juta") || lower.includes("klik link")) {
        predictedClass = "Fraud / Penipuan";
        confidence = (Math.random() * 9 + 89).toFixed(1);
        color = "rose";
    } else if (lower.includes("promo") || lower.includes("diskon") || lower.includes("spesial") || lower.includes("segera")) {
        predictedClass = "Spam";
        confidence = (Math.random() * 11 + 84).toFixed(1);
        color = "amber";
    }
    
    classEl.innerHTML = predictedClass;
    classEl.style.color = color === "emerald" ? "#10b981" : color === "amber" ? "#f59e0b" : "#f43f5e";
    confEl.innerHTML = confidence + "%";
    confEl.style.color = color === "emerald" ? "#10b981" : color === "amber" ? "#f59e0b" : "#f43f5e";
}

function selectSegment(segment) {
    const detail = document.getElementById('segment-detail');
    if (!detail) return;
    
    detail.classList.remove('hidden');
    
    const segments = [
        { name: "Champions", desc: "Most valuable segment. High recency, frequency and monetary value. Strategy: VIP loyalty program, early access to new products, personalized offers." },
        { name: "Loyal Customers", desc: "Consistent buyers. Good frequency but slightly lower monetary. Strategy: Cross-sell & upsell campaigns, subscription offers." },
        { name: "At Risk", desc: "Previously active but showing declining engagement. High churn risk. Strategy: Win-back campaigns, special reactivation discounts." },
        { name: "New / Low Value", desc: "Recent or one-time buyers. Low engagement. Strategy: Onboarding sequences, educational content, entry-level product recommendations." }
    ];
    
    detail.innerHTML = `
        <div class="font-semibold text-lg mb-1">${segments[segment].name}</div>
        <div class="text-xs leading-relaxed text-slate-300">${segments[segment].desc}</div>
    `;
}

function analyzeSentiment() {
    const input = document.getElementById('review-input')?.value.trim();
    const resultBox = document.getElementById('sentiment-result');
    
    if (!input || !resultBox) return;
    
    resultBox.classList.remove('hidden');
    
    const lower = input.toLowerCase();
    let label = "Positive";
    let score = (Math.random() * 14 + 83).toFixed(1);
    let icon = "fa-smile";
    let color = "#10b981";
    
    if (lower.includes("buruk") || lower.includes("jelek") || lower.includes("kecewa") || lower.includes("rusak") || lower.includes("lambat")) {
        label = "Negative";
        score = (Math.random() * 18 + 78).toFixed(1);
        icon = "fa-frown";
        color = "#f43f5e";
    } else if (lower.includes("biasa") || lower.includes("cukup") || lower.includes("standar")) {
        label = "Neutral";
        score = (Math.random() * 15 + 72).toFixed(1);
        icon = "fa-meh";
        color = "#f59e0b";
    }
    
    const labelEl = document.getElementById('sentiment-label');
    const scoreEl = document.getElementById('sentiment-score');
    const iconEl = document.getElementById('sentiment-icon');
    
    if (labelEl) {
        labelEl.innerHTML = label;
        labelEl.style.color = color;
    }
    if (scoreEl) scoreEl.innerHTML = `Confidence: ${score}%`;
    if (iconEl) {
        iconEl.className = `fa-regular ${icon}`;
        iconEl.style.color = color;
    }
}

// Dashboard Gallery Data & Modals
const dashboardData = [
    {
        title: "Sales Performance Dashboard",
        subtitle: "Power BI • Enterprise Sales Analytics",
        image: "https://picsum.photos/id/201/1200/630",
        desc: "Comprehensive sales performance tracking including YTD revenue, regional breakdown, top products, sales rep leaderboards, and 12-month forecasting using DAX time intelligence functions. Features row-level security and executive drill-through pages.",
        tech: ["Power BI", "DAX", "Power Query", "Azure SQL", "Row-Level Security"]
    },
    {
        title: "Customer 360 Analytics",
        subtitle: "Power BI • Customer Intelligence",
        image: "https://picsum.photos/id/160/1200/630",
        desc: "360-degree customer view combining transaction history, support tickets, website engagement, and demographic data. Includes cohort analysis, churn prediction scores, and customer lifetime value heatmaps.",
        tech: ["Power BI", "Python (for prep)", "Azure Synapse", "Customer Data Platform"]
    },
    {
        title: "Financial KPI & Forecasting",
        subtitle: "Power BI • Finance & Planning",
        image: "https://picsum.photos/id/251/1200/630",
        desc: "Finance team dashboard showing P&L trends, cash flow forecasting, budget vs actual variance analysis, and scenario modeling. Built with advanced DAX and connected to SAP and Excel data sources.",
        tech: ["Power BI", "DAX", "SAP BW", "Excel", "What-if Parameters"]
    },
    {
        title: "Supply Chain & Inventory",
        subtitle: "Tableau • Operations",
        image: "https://picsum.photos/id/180/1200/630",
        desc: "End-to-end supply chain visibility: inventory levels by warehouse, supplier performance scorecards, lead time analysis, and demand forecasting. Includes alerts for stockouts and overstock situations.",
        tech: ["Tableau", "Tableau Prep", "PostgreSQL", "SAP", "Python forecasting"]
    }
];

function showDashboardModal(index) {
    const modal = document.getElementById('dashboard-modal');
    const data = dashboardData[index];
    
    if (!modal || !data) return;
    
    const titleEl = document.getElementById('dash-modal-title');
    const subtitleEl = document.getElementById('dash-modal-subtitle');
    const imgEl = document.getElementById('dash-modal-image');
    const descEl = document.getElementById('dash-modal-desc');
    const techContainer = document.getElementById('dash-modal-tech');
    
    if (titleEl) titleEl.innerHTML = data.title;
    if (subtitleEl) subtitleEl.innerHTML = data.subtitle;
    if (imgEl) imgEl.src = data.image;
    if (descEl) descEl.innerHTML = data.desc;
    
    if (techContainer) {
        techContainer.innerHTML = data.tech.map(t => 
            `<span class="px-4 py-1 text-xs rounded-2xl bg-slate-800 border border-slate-700">${t}</span>`
        ).join('');
    }
    
    modal.style.display = 'flex';
}

function hideDashboardModal() {
    const modal = document.getElementById('dashboard-modal');
    if (modal) modal.style.display = 'none';
}

// Certificate Data & Modals
const certData = [
    {
        icon: '<i class="fa-brands fa-google text-red-400"></i>',
        title: "Google Data Analytics Professional Certificate",
        issuer: "Google • Coursera • 2025",
        desc: "Comprehensive training in data cleaning, analysis, visualization, and R programming. Covered SQL, Tableau, and the full data analysis process with real-world case studies.",
        link: "https://www.coursera.org/professional-certificates/google-data-analytics"
    },
    {
        icon: '<i class="fa-brands fa-microsoft text-blue-400"></i>',
        title: "Microsoft Certified: Power BI Data Analyst Associate",
        issuer: "Microsoft • 2025",
        desc: "Official Microsoft certification validating skills in preparing data, modeling, visualizing, and analyzing data using Power BI. Includes DAX, Power Query, and dashboard design best practices.",
        link: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/"
    },
    {
        icon: '<i class="fa-solid fa-brain text-violet-400"></i>',
        title: "Deep Learning Specialization",
        issuer: "deeplearning.ai • Coursera • 2024",
        desc: "Five-course specialization covering neural networks, CNNs, RNNs, transformers, and practical deep learning implementation using TensorFlow and Keras. Strong focus on practical model building and hyperparameter tuning.",
        link: "https://www.coursera.org/specializations/deep-learning"
    },
    {
        icon: '<i class="fa-solid fa-chart-line text-amber-400"></i>',
        title: "IBM Data Science Professional Certificate",
        issuer: "IBM • Coursera • 2025",
        desc: "Hands-on program covering Python for data science, SQL, data visualization, machine learning, and applied data science capstone projects. Included multiple real industry case studies.",
        link: "https://www.coursera.org/professional-certificates/ibm-data-science"
    }
];

function showCertificateModal(index) {
    const modal = document.getElementById('cert-modal');
    const data = certData[index];
    
    if (!modal || !data) return;
    
    const iconEl = document.getElementById('cert-modal-icon');
    const titleEl = document.getElementById('cert-modal-title');
    const issuerEl = document.getElementById('cert-modal-issuer');
    const descEl = document.getElementById('cert-modal-desc');
    const linkEl = document.getElementById('cert-modal-link');
    
    if (iconEl) iconEl.innerHTML = data.icon;
    if (titleEl) titleEl.innerHTML = data.title;
    if (issuerEl) issuerEl.innerHTML = data.issuer;
    if (descEl) descEl.innerHTML = data.desc;
    if (linkEl) linkEl.href = data.link;
    
    modal.style.display = 'flex';
}

function hideCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) modal.style.display = 'none';
}

// Generate Professional PDF Resume using jsPDF
function downloadCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    let y = 22;
    
    // Header accent bar
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    doc.setFillColor(103, 232, 249);
    doc.rect(0, 32, pageWidth, 1.2, 'F');
    
    // Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("DHENY PUJI LAKSONO", margin, 15);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Data Analyst  |  Aspiring Data Scientist", margin, 22);
    
    // Contact line
    doc.setFontSize(9);
    doc.text("Jakarta, Indonesia  •  dheny.pujilaksono@gmail.com  •  linkedin.com/in/dhenypujilaksono  •  github.com/dhenypujilaksono", margin, 28);
    
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
    const summary = "Results-driven Information Technology student (GPA 3.67/4.00) with strong foundations in software engineering transitioning into data analytics and machine learning. Experienced in building end-to-end data pipelines, developing predictive models, and creating impactful business intelligence dashboards. Passionate about transforming raw data into actionable insights that drive strategic decisions. Seeking Data Scientist or ML Engineer internship opportunities in 2026.";
    
    const splitSummary = doc.splitTextToSize(summary, pageWidth - margin * 2);
    doc.text(splitSummary, margin, y);
    y += (splitSummary.length * 4.8) + 6;
    
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
        "Programming: Python (92%), SQL (88%), JavaScript (75%)",
        "Data Analysis: Pandas, NumPy, Excel (Advanced), Statistical Analysis",
        "Machine Learning: Scikit-learn, SVM, Naive Bayes, KNN, Feature Engineering, Model Evaluation",
        "Visualization & BI: Power BI (Advanced DAX), Tableau, Matplotlib, Seaborn, Plotly",
        "Databases & Tools: MySQL, Git, Docker, Jupyter, VS Code, Vertex AI, FastAPI (basic)"
    ];
    
    skills.forEach(skill => {
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
    doc.text("Alliance & Partnership Intern", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Garuda Indonesia  |  Jan 2025 – Jun 2025", pageWidth - margin - 65, y);
    y += 5;
    
    doc.setFontSize(8.8);
    doc.setTextColor(80, 80, 80);
    const exp1 = [
        "• Conducted data validation and cleansing on large partnership agreement datasets",
        "• Performed fare analysis and competitive benchmarking across multiple airline partners",
        "• Built automated Excel reporting templates that reduced manual reporting effort by ~40%",
        "• Prepared executive-level analysis and presentations for partnership strategy meetings"
    ];
    exp1.forEach(line => { doc.text(line, margin + 2, y); y += 4.6; });
    
    y += 5;
    
    // Exp 2
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("AI & Cloud Engineer Trainee", margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Kementerian Kominfo  |  Jul 2024 – Dec 2024", pageWidth - margin - 72, y);
    y += 5;
    
    doc.setFontSize(8.8);
    doc.setTextColor(80, 80, 80);
    const exp2 = [
        "• Developed and evaluated machine learning and deep learning models using Vertex AI",
        "• Implemented generative AI prototypes and advanced prompt engineering workflows",
        "• Built complete ML pipelines including preprocessing, training, validation, and deployment",
        "• Collaborated with cross-functional teams to productionize AI solutions for internal use"
    ];
    exp2.forEach(line => { doc.text(line, margin + 2, y); y += 4.6; });
    
    y += 6;
    
    // Projects
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("KEY PROJECTS", margin, y);
    y += 5.5;
    doc.line(margin, y, margin + 30, y);
    y += 6;
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("• Indonesian SMS Spam & Fraud Detection (SVM • 94.2% accuracy)", margin, y); y += 4.8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text("   Compared Naive Bayes, SVM, and KNN for multi-class Indonesian SMS classification using TF-IDF + SMOTE.", margin, y); y += 5.5;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("• Customer Segmentation using RFM + K-Means Clustering", margin, y); y += 4.8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text("   Identified 4 actionable customer personas with silhouette score of 0.72 for targeted marketing strategies.", margin, y); y += 5.5;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text("• Enterprise Sales Performance Dashboard (Power BI)", margin, y); y += 4.8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text("   Built interactive dashboards with DAX forecasting, regional analysis, and role-based access control.", margin, y);
    
    // Footer
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, 282, pageWidth - margin, 282);
    
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("References and full project portfolio available upon request  •  Jakarta, Indonesia  •  2026", pageWidth / 2, 288, { align: 'center' });
    
    // Save
    doc.save("Dheny_Puji_Laksono_Data_Analyst_CV_2026.pdf");
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            delay: 0
        });
    }
}

// Loading Screen
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;
    
    setTimeout(() => {
        loader.style.transition = 'opacity 0.45s ease';
        loader.style.opacity = '0';
        
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger skill progress animation after load
            animateSkillBars();
        }, 450);
    }, 1350);
}

function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            bar.style.width = width;
        }, 180 * index);
    });
}

// Keyboard shortcuts & accessibility
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === "?" && document.activeElement.tagName === "BODY") {
            e.preventDefault();
            const projects = document.getElementById('projects');
            if (projects) projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        if ((e.metaKey || e.ctrlKey) && e.key === "/") {
            e.preventDefault();
            const contact = document.getElementById('contact');
            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    console.log('%c[Portfolio] Keyboard shortcuts ready: Press "?" to jump to projects, Cmd/Ctrl + "/" to contact section', 'color:#64748b');
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
    const pattern = [38,38,40,40,37,39,37,39,66,65];
    document.addEventListener('keydown', function(e) {
        konami.push(e.keyCode);
        if (konami.length > pattern.length) konami.shift();
        if (JSON.stringify(konami) === JSON.stringify(pattern)) {
            const canvas = document.getElementById('hero-canvas');
            if (canvas) {
                canvas.style.transition = 'opacity 0.4s';
                canvas.style.opacity = canvas.style.opacity === '0.9' ? '0.4' : '0.9';
            }
            konami = [];
        }
    });
    
    // Make sure all external links have proper attributes
    document.querySelectorAll('a[target="_blank"]').forEach(a => {
        if (!a.getAttribute('rel')) a.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Close modals when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const projectModal = document.getElementById('project-modal');
            const dashModal = document.getElementById('dashboard-modal');
            const certModal = document.getElementById('cert-modal');
            
            if (projectModal && projectModal.style.display === 'flex') {
                projectModal.style.display = 'none';
            } else if (dashModal && dashModal.style.display === 'flex') {
                dashModal.style.display = 'none';
            } else if (certModal && certModal.style.display === 'flex') {
                certModal.style.display = 'none';
            }
        }
    });
    
    console.log('%c[Portfolio] Dheny Puji Laksono professional portfolio initialized successfully.', 'color:#64748b; font-size: 9px');
}

// Boot application when DOM is ready
document.addEventListener('DOMContentLoaded', initializePortfolio);

// Expose useful functions to console for debugging/demo
window.downloadPortfolioCV = downloadCV;
window.showProjectDemo = showProjectDemo;
window.showDashboardModal = showDashboardModal;
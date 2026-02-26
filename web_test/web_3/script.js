/* ============================================
   ROOTSENTINEL - VULNERABILITY SCANNER
   Main JavaScript File
   ============================================ */

// Navigation functionality
function navigateTo(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`a[data-page="${page}"]`)?.classList.add('active');

    // Close mobile menu
    document.querySelector('.nav-links')?.classList.remove('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Scanner functionality
const vulnerabilityDatabase = [
    {
        id: 'CVE-2024-001',
        name: 'SQL Injection in Login Form',
        type: 'SQL Injection',
        severity: 'critical',
        cvss: 9.8,
        description: 'Critical vulnerability in database query construction allowing unauthorized data access',
        affected: ['MySQL', 'PostgreSQL', 'MariaDB'],
        patch: 'Use prepared statements and parameterized queries',
        precautions: [
            'Implement input validation and sanitization',
            'Use ORM frameworks to prevent SQL injection',
            'Apply principle of least privilege to database users',
            'Use Web Application Firewall (WAF)'
        ],
        patchUrl: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-001'
    },
    {
        id: 'CVE-2024-002',
        name: 'Cross-Site Scripting (XSS) in Comments',
        type: 'XSS',
        severity: 'high',
        cvss: 8.2,
        description: 'Reflected XSS vulnerability in user comment section allowing JavaScript execution',
        affected: ['Web Applications', 'Comment Systems'],
        patch: 'Implement output encoding and Content Security Policy (CSP)',
        precautions: [
            'Sanitize user input on both client and server side',
            'Use HTML encoding for special characters',
            'Implement Content Security Policy headers',
            'Use security libraries like DOMPurify'
        ],
        patchUrl: 'https://owasp.org/www-community/attacks/xss/'
    },
    {
        id: 'CVE-2024-003',
        name: 'Broken Authentication in API',
        type: 'Authentication Bypass',
        severity: 'critical',
        cvss: 9.5,
        description: 'Authentication bypass vulnerability allowing unauthorized API access',
        affected: ['REST API', 'GraphQL', 'OAuth Implementation'],
        patch: 'Implement strong authentication mechanisms and token validation',
        precautions: [
            'Use OAuth 2.0 or OpenID Connect',
            'Implement JWT with strong secret keys',
            'Use secure password hashing (bcrypt, Argon2)',
            'Implement multi-factor authentication (MFA)',
            'Enforce HTTPS for all authentication endpoints'
        ],
        patchUrl: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'
    },
    {
        id: 'CVE-2024-004',
        name: 'Path Traversal in File Upload',
        type: 'Path Traversal',
        severity: 'high',
        cvss: 8.1,
        description: 'Path traversal vulnerability in file upload functionality',
        affected: ['Web Servers', 'CMS Platforms'],
        patch: 'Validate file paths and restrict upload directories',
        precautions: [
            'Validate and sanitize file paths',
            'Restrict upload directory access',
            'Use whitelisting for allowed file types',
            'Generate random file names',
            'Store uploads outside web root'
        ],
        patchUrl: 'https://owasp.org/www-community/attacks/Path_Traversal'
    },
    {
        id: 'CVE-2024-005',
        name: 'Insecure Deserialization',
        type: 'Deserialization',
        severity: 'critical',
        cvss: 9.3,
        description: 'Unsafe deserialization of user-supplied objects',
        affected: ['Java', 'Python', 'PHP', '.NET'],
        patch: 'Use safe serialization methods and validate input',
        precautions: [
            'Never deserialize untrusted data',
            'Use JSON instead of native serialization',
            'Implement object validation',
            'Use integrity checks for serialized data',
            'Apply principle of least privilege'
        ],
        patchUrl: 'https://owasp.org/www-community/deserialization_of_untrusted_data'
    },
    {
        id: 'CVE-2024-006',
        name: 'Sensitive Data Exposure',
        type: 'Data Exposure',
        severity: 'high',
        cvss: 8.0,
        description: 'Sensitive user data exposed in network traffic',
        affected: ['HTTP Communications', 'Client Storage'],
        patch: 'Enforce HTTPS and encrypt sensitive data',
        precautions: [
            'Use TLS 1.2 or higher',
            'Implement HSTS headers',
            'Encrypt data at rest and in transit',
            'Use secure cookies (HttpOnly, Secure flags)',
            'Avoid storing sensitive data in client-side storage'
        ],
        patchUrl: 'https://owasp.org/www-project-top-ten/'
    },
    {
        id: 'CVE-2024-007',
        name: 'XML External Entity (XXE) Injection',
        type: 'XXE',
        severity: 'high',
        cvss: 7.8,
        description: 'XXE vulnerability in XML parsing allowing data disclosure',
        affected: ['XML Parsers', 'Web Services'],
        patch: 'Disable XML external entities and DTDs',
        precautions: [
            'Disable XML external entities',
            'Use XML libraries with XXE protection',
            'Validate and sanitize XML input',
            'Use schema validation',
            'Implement input size limits'
        ],
        patchUrl: 'https://owasp.org/www-community/attacks/XML_External_Entity_(XXE)_Prevention'
    },
    {
        id: 'CVE-2024-008',
        name: 'Missing Security Headers',
        type: 'Configuration Issue',
        severity: 'medium',
        cvss: 6.5,
        description: 'Missing or misconfigured security HTTP headers',
        affected: ['Web Servers', 'All Web Applications'],
        patch: 'Implement comprehensive security headers',
        precautions: [
            'Set Content-Security-Policy header',
            'Enable X-Frame-Options',
            'Set X-Content-Type-Options: nosniff',
            'Implement X-XSS-Protection',
            'Set Strict-Transport-Security (HSTS)'
        ],
        patchUrl: 'https://securityheaders.com/'
    }
];

// Vulnerability Scanner
function performScan() {
    const urlInput = document.getElementById('scanUrl');
    const resultsDiv = document.getElementById('scanResults');
    
    if (!urlInput || !urlInput.value.trim()) {
        showAlert('error', 'Please enter a valid URL to scan');
        return;
    }

    // Simulate scanning process
    showAlert('info', 'Starting vulnerability scan...');
    resultsDiv.innerHTML = '';

    const progressBar = document.getElementById('scanProgress');
    if (progressBar) {
        progressBar.style.display = 'block';
    }

    // Simulate scan progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            displayScanResults(resultsDiv);
            if (progressBar) progressBar.style.display = 'none';
        }
    }, 500);
}

function displayScanResults(container) {
    // Randomly select some vulnerabilities to display
    const foundVulnerabilities = vulnerabilityDatabase.sort(() => 0.5 - Math.random()).slice(0, 4);

    let resultsHTML = '<div class="scan-results"><h3 style="color: #ff0055; text-shadow: 0 0 10px rgba(255, 0, 85, 0.5); margin-bottom: 1.5rem; font-family: \'Roboto Mono\', monospace;">> SCAN COMPLETED - VULNERABILITIES FOUND</h3>';

    foundVulnerabilities.forEach((vuln, index) => {
        const severityClass = `severity-${vuln.severity}`;
        resultsHTML += `
            <div class="scan-result-item">
                <div class="result-header">
                    <div class="result-title">${index + 1}. ${vuln.name}</div>
                    <div class="severity-badge ${severityClass}">${vuln.severity.toUpperCase()}</div>
                </div>
                <div class="result-description">${vuln.description}</div>
                <div class="result-details">
                    <div class="detail-item">
                        <div class="detail-label">CVE ID:</div>
                        <div class="detail-value">${vuln.id}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">CVSS Score:</div>
                        <div class="detail-value">${vuln.cvss}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Type:</div>
                        <div class="detail-value">${vuln.type}</div>
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="showVulnerabilityDetails('${vuln.id}')">
                    > VIEW PATCH & PRECAUTIONS
                </button>
            </div>
        `;
    });

    resultsHTML += '</div>';
    container.innerHTML = resultsHTML;
    showAlert('success', `Scan completed. Found ${foundVulnerabilities.length} vulnerabilities.`);
}

// Show vulnerability details
function showVulnerabilityDetails(vulnId) {
    const vuln = vulnerabilityDatabase.find(v => v.id === vulnId);
    if (!vuln) return;

    const detailsHTML = `
        <div class="terminal-box" style="margin-top: 2rem;">
            <div style="color: #ff0055; margin-bottom: 1rem; font-weight: 700;">$ CVE-${vuln.id}</div>
            
            <h4 style="color: #00ff00; margin: 1rem 0 0.5rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);">PATCH INFORMATION</h4>
            <p style="color: #00ff88; margin-bottom: 1.5rem;">→ ${vuln.patch}</p>

            <h4 style="color: #00ff00; margin: 1rem 0 0.5rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);">PRECAUTIONS & MITIGATION</h4>
            <ul style="color: #00ff88; margin-left: 1.5rem;">
                ${vuln.precautions.map(p => `<li style="margin-bottom: 0.5rem;">→ ${p}</li>`).join('')}
            </ul>

            <h4 style="color: #00ff00; margin: 1rem 0 0.5rem; text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);">AFFECTED COMPONENTS</h4>
            <p style="color: #00ff88;">$ ${vuln.affected.join(' | ')}</p>

            <a href="${vuln.patchUrl}" target="_blank" class="btn btn-primary" style="margin-top: 1.5rem; text-decoration: none;">
                > OFFICIAL CVE REPORT
            </a>
        </div>
    `;

    const resultsDiv = document.getElementById('scanResults');
    if (resultsDiv) {
        resultsDiv.innerHTML += detailsHTML;
    }
}

// Load vulnerability list
function loadVulnerabilityList() {
    const container = document.getElementById('vulnListContainer');
    if (!container) return;

    let html = '';
    vulnerabilityDatabase.forEach(vuln => {
        const severityClass = `severity-${vuln.severity}`;
        html += `
            <div class="vuln-card">
                <div class="vuln-header">
                    <div class="vuln-id">${vuln.id}</div>
                    <div class="severity-badge ${severityClass}">${vuln.severity.toUpperCase()}</div>
                </div>
                <h4>${vuln.name}</h4>
                <div class="vuln-info">
                    <div class="vuln-info-item">
                        <span class="vuln-info-label">Type:</span>
                        <span class="vuln-info-value">${vuln.type}</span>
                    </div>
                    <div class="vuln-info-item">
                        <span class="vuln-info-label">CVSS:</span>
                        <span class="vuln-info-value">${vuln.cvss}</span>
                    </div>
                </div>
                <p style="color: var(--text-secondary); margin-bottom: 1rem; font-size: 0.9rem;">${vuln.description}</p>
                <button class="vuln-details-btn" onclick="expandVulnerability('${vuln.id}')">VIEW DETAILS & PATCH</button>
                <div id="details-${vuln.id}" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-primary);">
                    <div style="color: var(--text-secondary); margin-bottom: 1rem;">
                        <strong style="color: var(--text-primary);">Patch:</strong> ${vuln.patch}
                    </div>
                    <div style="color: var(--text-secondary); margin-bottom: 1rem;">
                        <strong style="color: var(--text-primary);">Precautions:</strong>
                        <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                            ${vuln.precautions.map(p => `<li style="margin-bottom: 0.5rem;">→ ${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Expand vulnerability details
function expandVulnerability(vulnId) {
    const detailsDiv = document.getElementById(`details-${vulnId}`);
    if (detailsDiv) {
        detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
    }
}

// Show alerts
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.body.querySelector('main') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 5000);
}

// Form submission
function handleContactForm(event) {
    event.preventDefault();
    const form = event.target;
    
    const formData = new FormData(form);
    showAlert('success', 'Message sent successfully! We will contact you soon.');
    form.reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set first page as active
    navigateTo('home');

    // Load vulnerability list on vulnerabilities page load
    loadVulnerabilityList();

    // Add event listeners
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('.nav-links')?.classList.remove('active');
        });
    });

    // Handle contact form
    const contactForm = document.querySelector('form[name="contactForm"]');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+K to focus scanner
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        navigateTo('scanner');
        const scanInput = document.getElementById('scanUrl');
        if (scanInput) scanInput.focus();
    }

    // Ctrl+L to go to vulnerability list
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        navigateTo('vulnerabilities');
    }
});

// Export functions for global use
window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;
window.performScan = performScan;
window.showVulnerabilityDetails = showVulnerabilityDetails;
window.expandVulnerability = expandVulnerability;
window.handleContactForm = handleContactForm;

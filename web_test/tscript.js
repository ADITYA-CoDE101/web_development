const scanLines = [
    "Initializing RootSentinel Engine...",
    "Loading vulnerability database...",
    "Scanning open ports...",
    "Analyzing endpoints...",
    "[CRITICAL] SQL Injection detected.",
    "[HIGH] XSS vulnerability discovered.",
    "Generating patch recommendations...",
    "Scan complete."
];

function startScan() {
    const terminal = document.getElementById("terminalOutput");
    terminal.innerHTML = "";

    let i = 0;

    function typeLine() {
        if (i < scanLines.length) {
            const p = document.createElement("p");
            p.textContent = scanLines[i];
            terminal.appendChild(p);
            i++;
            setTimeout(typeLine, 800);
        }
    }

    typeLine();
}

// const lines = [
//   "Initializing scanner...",
//   "Loading vulnerability database...",
//   "Scanning endpoints...",
//   "Injection vectors detected.",
//   "Generating patch recommendations..."
// ];

// let i = 0;
// const terminal = document.querySelector(".terminal-body");

// function typeLine() {
//   if (i < lines.length) {
//     const p = document.createElement("p");
//     p.textContent = lines[i];
//     terminal.appendChild(p);
//     i++;
//     setTimeout(typeLine, 800);
//   }
// }

// typeLine();
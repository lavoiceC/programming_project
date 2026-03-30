function analyzeJob() {
    let text = document.getElementById("jobText").value.toLowerCase();
    let results = document.getElementById("results");

    if (text === "") {
        results.innerHTML = "Please enter a job description.";
        return;
    }

    let score = 100;
    let problems = [];
    let suggestions = [];

    let biased = ["rockstar", "ninja", "aggressive", "young"];
    let accom = ["accommodation", "accessible"];
    let eeo = ["equal opportunity", "eeo"];

    for (let word of biased) {
        if (text.includes(word)) {
            score -= 10;
            problems.push("Biased word: " + word);
        }
    }

    let hasAccom = accom.some(w => text.includes(w));
    if (!hasAccom) {
        score -= 15;
        problems.push("Missing accommodation statement");
        suggestions.push("Add accommodation information");
    }

    let hasEEO = eeo.some(w => text.includes(w));
    if (!hasEEO) {
        score -= 15;
        problems.push("Missing EEO statement");
        suggestions.push("Add equal opportunity statement");
    }

    if (text.split(" ").length > 200) {
        score -= 10;
        problems.push("Too long");
    }

    let rating = score >= 80 ? "Good" : score >= 60 ? "Okay" : "Needs Work";

    let color = "red";
    if (score >= 80) color = "green";
    else if (score >= 60) color = "orange";

    results.innerHTML = `
        <h2>Results</h2>
        <p>Score: <span style="color:${color}; font-weight:bold;">${score}/100</span></p>
        <p>Status: ${rating}</p>
        <h3>Problems:</h3>
        <ul>${problems.map(p => `<li>${p}</li>`).join("")}</ul>
        <h3>Suggestions:</h3>
        <ul>${suggestions.map(s => `<li>${s}</li>`).join("")}</ul>
    `;
}

function clearText() {
    document.getElementById("jobText").value = "";
    document.getElementById("results").innerHTML = "";
}
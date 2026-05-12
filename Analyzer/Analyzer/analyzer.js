let rules = null;

async function loadRubrics() {
    const response = await fetch("rubric.json");
    const data = await response.json();
    rules = data[0]
    console.log("Rubric loaded:", rules)
}

loadRubrics();

document.getElementById("jdForm").addEventListener("submit", function(event) {   
     event.preventDefault();

    const jd = document.getElementById("JobDescription").value.trim();
    const results = document.getElementById("results");
    var jdLower = jd.toLowerCase();

    if (jd.length < 50){
        alert("Please enter 50 characters")
        return;
    }
    //readability detection 

 const words = jd.length;
  var readability;
  if (words < 80) {
    readability = "Very easy";
  }

else if (words < 150) {
    readability = "Easy";
  }

   if (words < 250) {
    readability = "Moderate";
  }
  else{
    readability = "Hard";
  }
    //document.getElementById("bias").textContent = "Gender based language"

        // Accessibility 
    var accessFound = rules.accessibility_terms.filter(function(term) {
        return jdLower.indexOf(term.toLowerCase()) > -1;
    });

    var accessOutput;
        if (accessFound.length > 0) {
            accessOutput = "Accessibility terms found: " + accessFound.join(", ");     
           } else {
            accessOutput = "no accessibility found";
        }
    let bias = "false";

    for(let term of rules.bias_terms) {
        if (jdLower.includes(term.toLowerCase())){
            bias = "true";
            break
        }
    }


    document.getElementById("Readability").textContent = readability
    document.getElementById("bias").textContent = bias;
    document.getElementById("accessibility").textContent = accessOutput;
    document.getElementById("recommendations").textContent = "add accomodations"
    document.getElementById("Compliance")
    results.style.display = "block";
});
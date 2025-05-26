const apiKey = "AIzaSyAIPD51IYMZbYfb9pFNUfK_w1phXfKcaYo";
const endpoint = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

async function main() {
    document.getElementById("answer").innerHTML = "<div id='spinner'><i class='fa-solid fa-spinner fa-pulse'></i></div>";
    const q = document.getElementById("question").value;

    const requestBody = {
        contents: [{ role: "user", parts: [{ text: q }] }]
    };

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    let answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
    document.getElementById("answer").innerHTML = `<div>${marked.parse(answer)}</div>`;
}

document.getElementById("submit").addEventListener("click", main);

const questionEl = document.getElementById("question");
questionEl.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});
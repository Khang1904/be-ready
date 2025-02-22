const newsit = [document.getElementById('newsi0t'), document.getElementById('newsi1t'), document.getElementById('newsi2t')];
const newsib = [document.getElementById('newsi0b'), document.getElementById('newsi1b'), document.getElementById('newsi2b')];

const url = "https://newsapi.org/v2/everything?q=diseases&apiKey=7bc06aaa8e314c309652d4e0039e5c44"
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 3; i++) {
      newsit[i].innerHTML = data.articles[i].title;
      newsib[i].innerHTML = data.articles[i].description;
  }})
  .catch(error => console.log(error))
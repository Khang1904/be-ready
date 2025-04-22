const newsit = [document.getElementById('newsi0t'), document.getElementById('newsi1t'), document.getElementById('newsi2t')];
const newsib = [document.getElementById('newsi0b'), document.getElementById('newsi1b'), document.getElementById('newsi2b')];

const url = "https://gnews.io/api/v4/search?q=diseases&max=3&apikey=8de1bb755136930300a943b549cc1d1e";
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 3; i++) {
      newsit[i].innerHTML = data.articles[i].title;
      newsib[i].innerHTML = data.articles[i].description;
    }
  })
  .catch(error => console.log(error))
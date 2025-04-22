const newsnt = [document.getElementById('newsn0t'), document.getElementById('newsn1t'), document.getElementById('newsn2t')];
const newsnb = [document.getElementById('newsn0b'), document.getElementById('newsn1b'), document.getElementById('newsn2b')];
const newscover = document.getElementById('newsni')

const url = "https://gnews.io/api/v4/search?q=diseases&max=3&apikey=8de1bb755136930300a943b549cc1d1e";
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 3; i++) {
      newsnt[i].innerHTML = data.articles[i].title;
      newsnb[i].innerHTML = data.articles[i].description;
    }
    // newscover.src = data.articles[0].image;
    // newscover.alt = data.articles[0].title;
  })
  .catch(error => console.log(error))

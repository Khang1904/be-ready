const newsnt = [document.getElementById('newsn0t'), document.getElementById('newsn1t'), document.getElementById('newsn2t')];
const newsnb = [document.getElementById('newsn0b'), document.getElementById('newsn1b'), document.getElementById('newsn2b')];
const newscover = document.getElementById('newsni')

const url = "https://newsapi.org/v2/everything?q=diseases&pageSize=3&apiKey=7bc06aaa8e314c309652d4e0039e5c44"
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 3; i++) {
      newsnt[i].innerHTML = data.articles[i].title;
      newsnb[i].innerHTML = data.articles[i].description;
  newscover.src = data.articles[0].urlToImage;
  newscover.alt = data.articles[0].title;
  }})
  .catch(error => console.log(error))

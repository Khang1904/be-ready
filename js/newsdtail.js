const newsTitle = document.querySelector('.news-title');
const newsBody = document.querySelector('.news-body');
const newsCover = document.querySelector('.news-cover');
const continueReading = document.querySelector('#continue');
const url = "https://gnews.io/api/v4/search?q=diseases&max=3&apikey=8de1bb755136930300a943b549cc1d1e";
let currentNews = 0;

switch (window.location.pathname) {
  case '/pages/news1.html':
    currentNews = 0;
    break;

  case '/pages/news2.html':
    currentNews = 1;
    break;

  case '/pages/news3.html':
    currentNews = 2;
    break;

  default:
    break;
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    newsTitle.innerHTML = data.articles[currentNews].title;
    newsBody.innerHTML = data.articles[currentNews].content;
    newsCover.src = data.articles[currentNews].image;
    newsCover.alt = data.articles[currentNews].title;
    continueReading.href = data.articles[currentNews].url;
  })
  .catch(error => console.log(error));
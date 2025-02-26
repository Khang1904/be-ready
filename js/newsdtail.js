const newsTitle = document.querySelector('.news-title');
const newsBody = document.querySelector('.news-body');
const newsCover = document.querySelector('.news-cover');
const continueReading = document.querySelector('#continue');
const url = "https://newsapi.org/v2/everything?q=diseases&pageSize=3&apiKey=7bc06aaa8e314c309652d4e0039e5c44";
let currentNews = 0;

switch (window.location.pathname) {
  case '/be-ready/pages/news2.html':
    currentNews = 1;
    break;

  case '/be-ready/pages/news3.html':
    currentNews = 2;
    break;

  default:
    currentNews = 0;
    break;
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    newsTitle.innerHTML = data.articles[currentNews].title;
    newsBody.innerHTML = data.articles[currentNews].content;
    newsCover.src = data.articles[currentNews].urlToImage;
    newsCover.alt = data.articles[currentNews].title;
    continueReading.href = data.articles[currentNews].url;
  })
  .catch(error => console.log(error));
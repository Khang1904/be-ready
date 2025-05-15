const url = "https://gnews.io/api/v4/search?q=diseases&apikey=8de1bb755136930300a943b549cc1d1e";
fetch(url)
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 10; i++) {
      document.getElementById(`newsnt${i}`).innerHTML = data.articles[i].title;
      document.getElementById(`newsnb${i}`).innerHTML = data.articles[i].description;
      document.getElementById(`newsna${i}`).href = data.articles[i].url;
    }
  })
  .catch(error => console.log(error))

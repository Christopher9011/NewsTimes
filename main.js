// const API_KEY = `0c328b291853445b8357c74f52a8e78c`;
let newsList = [];
const getLatestNews = async () => {
  const url = new URL(`https://news-times-v1.netlify.app/top-headlines?`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("success", newsList);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img
      class="news-img-size"
      src=${news.urlToImage}
      alt="news_image"
    />
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>${news.description}</p>
    <div>${news.source.name} * ${news.publishAt}</div>
  </div>
</div>`
    )
    .join("");
  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

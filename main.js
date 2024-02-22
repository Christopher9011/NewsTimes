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

const openNav = () => {
  document.getElementById("sidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("sidenav").style.width = "0";
};

const openSearchBar = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

getLatestNews();

let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(`https://news-times-v1.netlify.app/top-headlines?`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  // console.log("success", newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  const url = new URL(
    `ttps://news-times-v1.netlify.app/top-headlines?category=${category}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
};

const searchNews = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(
    `ttps://news-times-v1.netlify.app/top-headlines?q=${keyword}`
  );

  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
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

const imgError = (image) => {
  image.onerror = null;
  image.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
  const newsHtml = newsList
    .map(
      (news) => `<div class="row news-list">
		<div class="col-lg-4 news-image">
			<img src="${
        news.urlToImage
      }" alt="뉴스 이미지" class="news-img-size" onerror="imgError(this)">
		</div>
		<div class="col-lg-8 news-content">
			<h2 class="news-title">${news.title}</h2>
			<p>${
        news.description == null || news.description == ""
          ? "내용없음"
          : news.description.length > 200
          ? news.description.substring(0, 200) + "..."
          : news.description
      }</p>
			<div>${news.source.name || "no source"}  ${moment(
        news.publishedAt
      ).fromNow()}</div>			
		</div>
	</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHtml;
};

getLatestNews();

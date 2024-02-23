let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);
const sideMenus = document.querySelectorAll(".side-menu-list button");
sideMenus.forEach((sideMenu) =>
  sideMenu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(`https://news-times-v1.netlify.app/top-headlines?`);

const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(`https://news-times-v1.netlify.app/top-headlines?`);

  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(
    `https://news-times-v1.netlify.app/top-headlines?category=${category}`
  );

  getNews();
};

const searchNews = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(`https://news-times-v1.netlify.app/top-headlines?q=${keyword}`);

  getNews();
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

getLatestNews();

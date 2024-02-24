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

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
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

const paginationRender = () => {
  const pageGroup = Math.ceil(page / groupSize);

  const totalPages = Math.ceil(totalResults / pageSize);

  let lastPage = pageGroup * 5;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  const firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4;

  let paginationHTML = ``;

  if (firstPage >= 6) {
    paginationHTML = `<li class="page-item" onclick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li>
      <li class="page-item" onclick="moveToPage(${
        page - 1
      })"><a class="page-link">Previous</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick=moveToPage(${i})><a class="page-link" href="#">${i}</a></li>`;
  }

  if (lastPage < totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${
      page + 1
    })"><a class="page-link">Next</a></li>
  <li class="page-item" onclick="moveToPage(${totalPages})" ><a class="page-link">&gt;&gt;</a></li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("work!", pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();

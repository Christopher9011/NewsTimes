let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://main--news-times-v1.netlify.app/`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("success", news);
};

getLatestNews();

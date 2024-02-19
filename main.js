let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://news-times-v1.netlify.app/top-headlines?`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("success", news);
};

getLatestNews();

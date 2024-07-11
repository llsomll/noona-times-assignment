const API_KEY = `17d92ecdea1142fa964e877d98fa9512`;
let newsList = [];
const noPhoto = "images/no-photo.jpg";
const menus = document.querySelectorAll(".menus");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
const searchInput = document.getElementById("search-input").value;

const getLatestNews = async () => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("dddd", newsList);
};


const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  
  const response = await fetch(url);
  const data = await response.json();
  console.log("ddd", data);
  newsList = data.articles;
  render();

}

const getElementByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
  
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data);
  newsList = data.articles;
  render();

}


const render = () => {
    const newsHTML = newsList.map(news=>`<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src="${news.urlToImage == null ? noPhoto : news.urlToImage}"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${
                news.description == null || news.description == ""
                  ? "No Content"
                  : news.description.length > 200
                  ? news.description.substring(0, 200) + "..."
                  : news.description
              }</p>
            <div>${news.source.name == null?"no source":news.source.name} * ${moment(news.publishedAt).fromNow()}</div>
          </div>
        </div>`).join('');


    document.getElementById('news-board').innerHTML = newsHTML;
}


getLatestNews();


const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
};


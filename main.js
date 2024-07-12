const API_KEY = `17d92ecdea1142fa964e877d98fa9512`;
let newsList = [];
const noPhoto = "images/no-photo.jpg";
const menus = document.querySelectorAll("#menu-list button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)));
const searchInput = document.getElementById("search-input").value;
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);

const getNews = async() => {
  try {
    const response = await fetch(url);
    
    const data = await response.json();
    if(response.status===200){
      if(data.articles.length===0){
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch(error) {
    errorRender(error.message);
  }
}


const getLatestNews = async () => {
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    getNews();
};


const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
  
  getNews();

}

const getElementByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
  
  getNews();

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


const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};


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


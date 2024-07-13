const API_KEY = `17d92ecdea1142fa964e877d98fa9512`;
let newsList = [];
const noPhoto = "images/no-photo.jpg";
const menus = document.querySelectorAll("#menu-list button");
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)));
const searchInput = document.getElementById("search-input");
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;





const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResult =  data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
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
  const keyword = searchInput.value;
  console.log("keyword", keyword);
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);

  getNews();

}


const render = () => {
  const newsHTML = newsList.map(news => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src="${news.urlToImage == null ? noPhoto : news.urlToImage}"
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description == null || news.description == ""
      ? "No Content"
      : news.description.length > 200
        ? news.description.substring(0, 200) + "..."
        : news.description
    }</p>
            <div>${news.source.name == null ? "no source" : news.source.name} * ${moment(news.publishedAt).fromNow()}</div>
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


const paginationRender = () => {
  let totalPages = Math.ceil(totalResult / pageSize);
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  let firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = '';

  if (page > 1) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(1)">
      <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
    </li>
    <li class="page-item" onclick="moveToPage(${page - 1})">
      <a class="page-link" href="#js-bottom" tabindex="-1">&lt;</a>
    </li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${i === page ? 'active' : ''}" onclick="moveToPage(${i})"><a class="page-link" href="#js-bottom">${i}</a></li>`;
  }


  if (page < totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
      <a class="page-link" href='#js-program-detail-bottom'>&gt;</a>
    </li>
    <li class="page-item" onclick="moveToPage(${totalPages})">
      <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
    </li>`;
  }


  document.querySelector(".pagination").innerHTML = paginationHTML;
};


const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}



const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
  scrollToTop();
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


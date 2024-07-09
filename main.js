// const API_KEY = `17d92ecdea1142fa964e877d98fa9512`;
let news = [];

const getLatestNews = async ()=>{
    // const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://legendary-faun-d73167.netlify.app/top-headlines`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("dddd", news);
};

getLatestNews();
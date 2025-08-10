import axios from "axios";

export async function serverCheck(q:string){
  console.log(q);
    if(q===""){
      const res = await axios.get('http://localhost:3000/news');
    //   setNews(res.data.allArticles);
      return res.data.allArticles;
    }
    else{
      const res = await axios.get(`http://localhost:3000/news?q=${q}`);
    //   setNews(res.data.allArticles);
      return res.data.allArticles;
    }
}
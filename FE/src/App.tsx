import React, { useState } from 'react';
import Heading from './Components/Heading';
import Card from './Components/Card';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Article {
  source: { id: string | null; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const App: React.FC = () => {

  const [input,setInput] = useState("");

  const [news, setNews] = useState([]);

  async function serverCheck(q:string){
    if(q===""){
      const res = await axios.get('http://localhost:3000/news');
      setNews(res.data);
      return res.data;
    }
    else{
      const res = await axios.get(`http://localhost:3000/news?q=${q}`);
      setNews(res.data);
      return res.data;
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['news-article'],
    queryFn: ()=>serverCheck(""),
  });

  const clickHandler = async () => {
    const res = await serverCheck(input);
    console.log(res);

    setNews(res);
  }

  return (
    <div className='h-full w-screen bg-black text-white px-8 py-4 '>
      <div className='flex justify-between'>
        <Heading heading='News Letter' />
        <div>
          <input type="text" className='border border-gray-400 rounded px-3 p-1' placeholder='Search Param' onChange={(e)=>{setInput(e.target.value)
            console.log(input);
          }}/>
          <button onClick={clickHandler}>Search</button>
        </div>

      </div>
      <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-15'>
        {!isLoading && data!==undefined && news.map((article:any, index:number) => (
          <div className='px-10'>
            <Card key={index} article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

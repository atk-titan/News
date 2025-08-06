import React, { useState } from 'react';
import Heading from './Components/Heading';
import Card from './Components/Card';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const App: React.FC = () => {

  const [input,setInput] = useState("");

  const [news, setNews] = useState([]);

  async function serverCheck(q:string){
    if(q===""){
      const res = await axios.get('http://localhost:3000/news');
      setNews(res.data.allArticles);
      return res.data.allArticles;
    }
    else{
      const res = await axios.get(`http://localhost:3000/news?q=${q}`);
      setNews(res.data.allArticles);
      return res.data.allArticles;
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
    <div className='h-full w-full bg-gray-100 text-gray-950 px-8 py-4'>
      <div className='relative flex justify-between mb-8 mt-2'>
        <Heading heading='News Letter' />
        <div className='flex items-center gap-4'>
          <input type="text" className='border border-gray-400 rounded px-3 p-1' placeholder='Search Param' onChange={(e)=>{setInput(e.target.value) 
            console.log(input);
          }}
          onKeyDown={(e)=>{
            if(e.key === "Enter")
              clickHandler()
          }}
          />
          <button onClick={clickHandler} className=' bg-gray-950 text-gray-100 px-3 py-1 rounded'>Search</button>
        </div>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
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

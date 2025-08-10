import React, { useState } from 'react';
import Heading from './Components/Heading';
import Card from './Components/Card';
import { useQuery } from '@tanstack/react-query';
import DefaultFilter from './Components/DefaultFilter';
import { serverCheck } from './utils/serverFetch';

const App: React.FC = () => {

  const [filter,setFilter] = useState("");
  const [full,setFull] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['news-article',filter],
    queryFn: async ()=>{
      console.log(filter);

      const res = await serverCheck(filter);

      return res;
    },
  });

  return (
    // px-8 py-4
    <div className={'relative h-full w-full overflow-hidden bg-gray-100 text-gray-950'}>
      <div className="bg-[url('/GateToTruth.png')] h-[60vh] w-full bg-cover bg-center px-8 py-4">
        <div className='max-w-[80vw] h-full mx-auto'>
          <div className='relative flex justify-between'>
            <div className='text-white text-shadow-lg md:text-4xl text-xl md:w-fit w-5'>
              <Heading heading='News Letter'/>
            </div>
          </div>
          <div className='h-full w-full pt-8 flex items-center pb-16'>
            <div className='2xl:w-[35%] w-full'>
              <div className='md:text-7xl text-5xl font-bold'>
                <Heading heading="Welcome to today's ">
                  <span className='md:text-8xl text-6xl text-white text-shadow-lg'>Truth.</span>
                </Heading>
              </div>
              <p className='text-gray-500 text-md mt-8'>
                Stay informed with the latest insights, breaking stories, and in-depth coverage. Our newsletter brings truth to light, helping you see the world with clarity and confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='relative h-full max-w-[90vw] mx-auto'>
        <div className='py-10'>
          <DefaultFilter setFilter={setFilter}/>
        </div>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12'>

          {!isLoading && data!==undefined && data.slice(0,8*full).map((article:any, index:number) => {

            return (
            <div key={index} className=''>
              <Card article={article} />
            </div>
          )})} 
        </div>
        <div className='flex justify-center m-7'>
          <div className='h-fit border px-3 py-2 rounded hover:bg-gray-300 transition-colors duration-200 hover:cursor-pointer font-medium border-gray-700 text-gray-700'
               onClick={()=>setFull(full+1)}
          >
            Load More
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

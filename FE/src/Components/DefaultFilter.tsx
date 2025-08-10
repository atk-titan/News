import { useState } from "react";

const filters = ["All","Politics","Markets","Science","AI","Security","World"]

const DefaultFilter = ({setFilter}:{setFilter:(filter:string)=>void}) => {

    const [ active , setActive ] = useState(0);
    const [input,setInput] = useState("");

    const clickHandler = async () => {
      setInput("");
      setFilter(input);
    }
    
  return (
    <div className='flex items-center text-sm w-full'>
        <h3 className='text-gray-500 text-lg mr-4'>Filter:</h3>
        <div className="w-full flex items-center md:justify-between">
          <ul className='lg:flex lg:gap-5 hidden w-0'>
              {filters.map((filter:string,index:number)=>{
                return (
                  <div className={"border py-2 px-3 rounded font-medium hover:bg-gray-200 hover:shadow hover:cursor-pointer transition-colors duration-200" + (active===index ? "border-blue-400 text-blue-400" : "border-gray-600 text-gray-600")}
                      onClick={async ()=>{
                        setActive(index);
                        setFilter(filter);
                      }} 
                      key={index}  
                  >
                      <li >{filter}</li>
                  </div>
              )  
              })}
          </ul>
          <div className='flex items-center gap-4'>
                <input type="text" className='border border-gray-600 focus:outline-none rounded px-3 py-2'  placeholder='Search Param' value={input} 
                  onChange={(e)=>{setInput(e.target.value) }}
                  onKeyDown={(e)=>{
                    if(e.key === "Enter")
                      clickHandler()
                  }}
                />
                <button onClick={clickHandler} className=' bg-gray-950 text-gray-100 px-3 py-2 font-medium rounded hover:cursor-pointer hover:bg-gray-600 transition-colors duration-200 shadow'>Search</button>
          </div>
        </div>
    </div>
  );
}

export default DefaultFilter;
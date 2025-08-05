import dotenv from 'dotenv';
dotenv.config();

const API = process.env.NEWS_API;

export const getEndpoint = (q?:string,fromDate?:string,toDate?:string) => {
    let from = fromDate || (()=>{
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()+1);
        return lastMonth.toISOString().split('T')[0]; 
    })();
    
    let endpoint;

    if(q===undefined || q===null ){
        endpoint = `https://newsapi.org/v2/everything?from=${from}&sortBy=publishedAt&apiKey=${API}`;
        if(toDate)
            endpoint = `https://newsapi.org/v2/everything?from=${from}&to=${toDate}&sortBy=publishedAt&apiKey=${API}`;
    }else{
        endpoint = `https://newsapi.org/v2/everything?q=${q}&from=${from}&sortBy=publishedAt&apiKey=${API}`;
        if(toDate)
            endpoint = `https://newsapi.org/v2/everything?q=${q}&from=${from}&to=${toDate}&sortBy=publishedAt&apiKey=${API}`;
    }

    const reqUrl = new Request(endpoint);

    return reqUrl;
}
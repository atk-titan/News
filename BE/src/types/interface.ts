export interface Article{
    author: string | null;
    title: string;
    description: string| null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;

    source: Source;
}

interface Source{
    name: string ;
}
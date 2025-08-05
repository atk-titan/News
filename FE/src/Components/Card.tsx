import React from 'react';

export interface Article {
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  source: Source;
}

interface Source {
  id: string | null;
  name: string;
}

const Card = ({ article }: { article: Article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="shadow-md rounded-2xl overflow-hidden hover:shadow-xl border border-white p-2 transition-shadow duration-300">
        {article.urlToImage && (
            <div className='h-full w-full rounded-2xl overflow-hidden'>
                <img
                  src={article.urlToImage}
                  alt="image not found"
                  className='p-4 h-full w-full'
                />
            </div>
        )}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
          {article.description && <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {article.description}
          </p>}
          { article.content && <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {article.content.length > 250 ? article.content.slice(0,200): article.content}
          </p>}
          <div className="flex justify-between items-center text-xs text-gray-500">
            {article.source?.name && <span>{article.source.name}</span>}
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
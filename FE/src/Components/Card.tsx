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
      <div className="relative group h-140 shadow-md rounded-2xl overflow-hidden hover:shadow-xl duration-500 border border-white transition-transform hover:scale-[1.01] flex flex-col">
        {article.author && (
          <div className="absolute top-2 left-3 text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg shadow-md">
            <div className="text-xs text-gray-300 uppercase tracking-wide">
              Author
            </div>
            <div className="text-sm font-semibold">
              {article.author}
            </div>
          </div>
        )}

        <div className="h-88 group-hover:h-48 w-full overflow-hidden transition-all ease-in-out duration-500">
          <img
            src={article.urlToImage || "/road-4348087.jpg"}
            alt="image not found"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 px-4 py-3">
          <div>
            <h2 className="text-lg font-semibold mb-1">{article.title}</h2>
              {article.content && (
                <p className="text-sm text-gray-600 mt-3 line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                  {article.content}
                </p>
              )}

          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
            {article.source?.name && <span>{article.source.name}</span>}
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Card;
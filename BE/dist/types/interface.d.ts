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
export {};
//# sourceMappingURL=interface.d.ts.map
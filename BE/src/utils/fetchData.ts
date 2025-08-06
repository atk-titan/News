import Bottleneck from 'bottleneck';
import { getEndpoint } from "./endpoint.js";

const limitter = new Bottleneck({
  minTime: 864000
});

export const fetchData = async (
    qStr: string,
    from: string,
    to: string
) => {
        const reqUrl = getEndpoint(qStr, from, to);
        const response = await limitter.schedule(() => fetch(reqUrl));
        // const response = await fetch(reqUrl);
        const data = await response.json();

        return data.articles;
}
import axios from 'axios';

const USER_AGENT = 
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const baseURL = `https://api.consumet.org`;

const api = axios.create({
    baseURL: baseURL,
    headers: {
      "User-Agent": USER_AGENT,
    },
  });

export const getTrending = async (page=1, perPage=20) => {
    const {
        data: { results },
    } = await api.get(`/anilist/trending?page=${page}&perPage=${perPage}`)

    if (!results) return {
        error: "No data",
    }
}

export const getPopular = async (page = 1, perPage = 20) => {
    const {
      data: { results },
    } = await api.get(`/anilist/popular?page=${page}&perPage=${perPage}`);
  
    if (!results)
      return {
        error: "No data",
    }
};

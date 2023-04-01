import axios from 'axios';

const baseURL = `https://api.consumet.org`;

const api = axios.create({
    baseURL: baseURL,
  });

export const getTrending = async (page=1, perPage=20) => {
    const {
        data: { results },
    } = await api.get(`/meta/anilist/trending?page=${page}&perPage=${perPage}`)

    if (!results) return {
        error: "No data",
    }
    return results
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

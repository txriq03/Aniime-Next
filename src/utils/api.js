import axios from 'axios';

const baseURL = `https://consumet-gules.vercel.app`;

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
    } = await api.get(`/meta/anilist/popular?page=${page}&perPage=${perPage}`);
  
    if (!results)
      return {
        error: "No data"
    }
    return results
};

export const getRecentlyUpdated = async  (page = 1, perPage = 20) => {
  const {
    data: { results }
  } = await api.get(`/meta/anilist/recent-episodes?page=${page}&perPage=${perPage}`)

  if (!results)
  return {
    error: "No data"
  }
  return results 
};

export const getSource = async (episodeId, server) => {
  let { data } = await api.get(`/meta/anilist/watch/${episodeId}`);

  if (!data)
    return {
      error: "No data",
    };

  return data;
};

export const getInfo = async (id) => {
  try {
    let { data } = await api.get(`/meta/anilist/info/${id}`)
    console.log(data)

    if (!data)
    return {
      error: "No data"
    };
    return data
    
  } catch (err) {
    throw new Error(err.message)
  }

}

export const searchQuery = async (query) => {
  let { data } = await api.get(`/meta/anilist/${query}?page=1`)
  console.log(query)
  if (!data) return {
    error: "No data"
  };
  return data 
}
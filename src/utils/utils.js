export const chooseTitle = (english, romaji) => {
    if (english != null) {
    return english
    } else {
    return romaji
    }
  }

export const changeRatingColor = (rating) => {
    if (rating < 40) {
        return 'red'
    } else if (rating >= 70) {
      return 'lightgreen'
    } else {
        return 'orange'
    }
  }
  
//Function to display number of episodes each page
export const episodesEachPage = (arr, eachPage, setTotalPages) => {
  const res = [];
  if (arr != null) {
      for (let i = 0; i < arr.length; i += eachPage) {
          const page = arr.slice(i, i + eachPage);
          res.push(page);
      }
  }
  setTotalPages(res.length)
}

export const showMore = (isShowMore) => {
  if (isShowMore == false) {
      return 6
  } else {
      return null
  }
}

export const moreOrLess = (isShowMore) => {
  if (isShowMore == false) {
    return 'More'
  } else {
    return 'Less'
  }
}
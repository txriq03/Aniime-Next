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
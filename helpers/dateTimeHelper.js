
export const secondToMinute = (sec) => {
    let useSec = sec
    if (useSec < 0) {
        useSec = 60 + useSec % 60
    }
    let ansMin = Math.floor(useSec / 60)
    if (ansMin < 10) {
        ansMin = `0${ansMin}`
    } else {
        ansMin = `${ansMin}`
    }
    let ansSec = Math.floor(useSec % 60)
    if (ansSec < 10) {
        ansSec = `0${ansSec}`
    } else {
        ansSec = `${ansSec}`
    }
    return { min: ansMin, sec: ansSec }
}
import { distanceMap } from '../constants/Maps'


export const transferSliderToDistance = (value) => {
    return (distanceMap?.[parseInt(value)] ?? 50)
}

export const transferDistanceToSlider = (value) => {
    return (distanceMap?.indexOf(parseInt(floorDiscreteDistance(value))) >= 0 ? distanceMap?.indexOf(floorDiscreteDistance(value)) : 0)
}

export const formatDistanceText = (value, language = 'ch') => {
    if (parseInt(value) >= 1000) {
        return { value: parseInt(value) / 1000, unit: language === 'ch' ? '公里' : 'km' }
    } else {
        return { value: parseInt(value), unit: language === 'ch' ? `公尺` : 'm' }
    }
}

export const transferSliderToZoom = (value) => {
    let zoomMap = [19, 17, 16, 16, 15, 14, 13, 13, 12, 11, 10, 9, 9, 8, 7, 6, 5]
    return (zoomMap?.[parseInt(value)] ?? 16)
}

export const floorDiscreteDistance = (value) => {
    let ans = distanceMap[0]
    distanceMap.forEach((item, index, array) => {
        if (parseInt(value) >= item && parseInt(value) <= array[index + 1])
            ans = item
        else if (parseInt(value) >= item && index === array.length - 1)
            ans = item
    })
    return ans
}
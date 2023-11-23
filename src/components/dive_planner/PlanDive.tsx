import { DiveFormState, DivePlan } from './DivePlanner';
import { DEPTHS, DEPTH_TIMES, SAFETY_STOP_DECO_LIMITS, SI_TIMES_PG_MATRIX, RNT_NDL_MATRIX } from './DiveTables';


/* 1. Get Depth index to get list of times */
const getDepthIndex = (depth: number) => {
    /*
        Looks for matching depth or next value higher
        Depth index required to find array of times
    */
    const depthIndex = DEPTHS.findIndex(arrDepth => arrDepth >= depth)
    const lastIndex = DEPTHS.findIndex(depth => depth === 140)

    return depthIndex !== -1 ? depthIndex : lastIndex;
}

/* 2. Get Time index */
const getTimeIndex = (depthIndex: number, time: number) => {
    // Returns timeIndex
    // Get list of times according to depth
    const times = DEPTH_TIMES[depthIndex]

    const timeIndex = times.findIndex(arrTime => arrTime >= time)
    const lastIndex = times.length - 1

    return timeIndex !== -1 ? timeIndex : lastIndex;
}


/* 3. Get Pressure group */
export const planDive = (data: DiveFormState, previousDive: DivePlan | null) => {
    /*
        Use depth to get depthIndex
        Use depthIndex and time to get timeIndex
        Convert timeIndex to letter which is the pressure group
    */
    const depth = data.depth
    const actualBottomTime = data.time
    let totalBottomTime = actualBottomTime

    // Depth index
    const depthIndex = getDepthIndex(depth)
    let startingPressureGroupIndex = 0

    let residualNitrogenTime = 0
    // Handle secondary dives
    if (previousDive) {
        // Get starting pressure group after surface interval
        const prevDivePressureGroup = previousDive.postDivePressureIndex
        const surfaceIntervalTime = data.surfaceInterval
        const PGafterSurfaceInterval = getPgAfterSurfaceInterval(prevDivePressureGroup, surfaceIntervalTime)
        startingPressureGroupIndex = PGafterSurfaceInterval

        // Residual nitrogen time- add to actual bottom time to get total bottom time
        const RNT_NDL = getResidualNitrogenTime(depth, actualBottomTime, PGafterSurfaceInterval)
        residualNitrogenTime = RNT_NDL[0] 
        totalBottomTime = residualNitrogenTime + actualBottomTime
    }

    const timeIndex = getTimeIndex(depthIndex, totalBottomTime)

    // Safety Stop, Deco Limit
    const minSafetyStopTime_decoLimit = SAFETY_STOP_DECO_LIMITS[depthIndex]
    const safetyStopRequired = totalBottomTime >= minSafetyStopTime_decoLimit[0]
    const decoLimit = minSafetyStopTime_decoLimit[1]

    // Matches or exceeds deco limit?
    const minToNDL = totalBottomTime - decoLimit
    const exceedsDecoLimit = totalBottomTime > decoLimit
    const matchesDecoLimit = totalBottomTime === decoLimit
    console.log("Safety stop required?", safetyStopRequired)
    console.log("Minutes to deco limit: ", minToNDL)

    if (exceedsDecoLimit) {
        console.log(`No Deco Limit exceeded by ${Math.abs(minToNDL)} minutes`)
    }
    if (matchesDecoLimit) {
        console.log(`Dive time meets No Deco Limit.`)
    }

    // timeIndex points to the correct letter for pressure group
    const postDivePressureGroup = String.fromCharCode('A'.charCodeAt(0) + timeIndex)
    console.log(`Dive to ${depth} feet for ${actualBottomTime} minutes.`)
    console.log("Pressure Group After Dive: ", postDivePressureGroup, "\n")

    const divePlan = {
        "postDivePressureGroup": postDivePressureGroup,
        "postDivePressureIndex": timeIndex,
        "startingPressureGroup": String.fromCharCode('A'.charCodeAt(0) + startingPressureGroupIndex),
        "startingPressureIndex": startingPressureGroupIndex,
        "safetyStopRequired": safetyStopRequired,
        "minToNDL": minToNDL,
        "residualNitrogenTime": residualNitrogenTime,
        "totalBottomTime": totalBottomTime
    }
    return divePlan
}

const getPgAfterSurfaceInterval = (startGroupIndex: number, surfaceIntervalTime: number) => {
    const startPressureGroup = String.fromCharCode('A'.charCodeAt(0) + startGroupIndex)
    console.log(`Pressure Group after previous dive: ${startPressureGroup}`)
    console.log(`Surface Interval Time: ${surfaceIntervalTime} minutes`)

    const times = SI_TIMES_PG_MATRIX[startGroupIndex]
    const timeIndex = times.findIndex(arr => surfaceIntervalTime >= arr[0] && surfaceIntervalTime <= arr[1])

    // const PGafterSurfaceInterval = timeIndex !== -1 ? String.fromCharCode('A'.charCodeAt(0) + timeIndex) : 'A'
    return timeIndex !== -1 ? timeIndex : 0;

}

const getResidualNitrogenTime = (depth: number, actualBottomTime: number, pgIndex: number) => {
    const startPressureGroup = String.fromCharCode('A'.charCodeAt(0) + pgIndex)
    console.log("Starting group", startPressureGroup)

    // Use depth to get [residual nitrogen time, no deco limit] from matrix
    const depthIndex = getDepthIndex(depth)
    const times = RNT_NDL_MATRIX[depthIndex]
    return times[pgIndex]
    // const totalBottomTime = actualBottomTime + residualNitrogenTime

    // console.log("Actual Bottom Time", actualBottomTime)
    // console.log("Residual Nitrogen Time", residualNitrogenTime)
    // console.log("Total Bottom time", totalBottomTime)
    // console.log("No Deco Limit", noDecoLimit)

    // if (totalBottomTime > noDecoLimit) {
    //     console.log("EXCEEDS DECO LIMITS")
    // } else {
    //     console.log("Total Bottom time within deco limits")
    // }
}
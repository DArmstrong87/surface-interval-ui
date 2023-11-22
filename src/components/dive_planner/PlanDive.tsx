import { DiveFormState, DivePlan } from './DivePlanner';
import { DEPTHS, DEPTH_TIMES, SAFETY_STOP_DECO_LIMITS } from './DiveTables';


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
    const time = data.time

    // Depth and time indexes
    const depthIndex = getDepthIndex(depth)
    const timeIndex = getTimeIndex(depthIndex, time)

    console.log("Previous dive", previousDive)

    // Safety Stop, Deco Limit
    const minSafetyStopTime_decoLimit = SAFETY_STOP_DECO_LIMITS[depthIndex]
    const safetyStopRequired = time >= minSafetyStopTime_decoLimit[0]
    const decoLimit = minSafetyStopTime_decoLimit[1]
    console.log("Safety stop required?", safetyStopRequired)
    const minToNDL = decoLimit - time
    const exceedsDecoLimit = time > decoLimit
    const matchesDecoLimit = time === decoLimit
    console.log("Minutes to deco limit: ", minToNDL)

    if (exceedsDecoLimit){
        console.log(`No Deco Limit exceeded by ${Math.abs(minToNDL)} minutes`)
    }
    if (matchesDecoLimit){
        console.log(`Dive time meets No Deco Limit.`)
    }

    // timeIndex points to the correct letter for pressure group
    const pressureGroup = String.fromCharCode('A'.charCodeAt(0) + timeIndex)
    console.log(`Dive to ${depth} feet for ${time} minutes.`)
    console.log("Pressure Group After Dive: ", pressureGroup, "\n")

    const divePlan = {
        "group": pressureGroup,
        "index": timeIndex,
        "safetyStopRequired": safetyStopRequired,
        "minToNDL": minToNDL,
    }
    return divePlan
}
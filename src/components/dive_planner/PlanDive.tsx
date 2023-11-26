import { DiveFormState, DivePlan } from './DivePlanner';
import { AIR_DEPTHS, AIR_DEPTH_TIMES, AIR_SAFETY_STOP_DECO_LIMITS, SI_TIMES_PG_MATRIX, AIR_RNT_NDL_MATRIX, EANx32_DEPTHS, EANx32_DEPTH_TIMES, EANx32_SAFETY_STOP_DECO_LIMITS, EANx32_PPO, AIR, EANx32, EANx36_DEPTHS, EANx36_DEPTH_TIMES, EANx36_PPO, EANx36_SAFETY_STOP_DECO_LIMITS, EANx32_RNT_NDL_MATRIX, EANx36_RNT_NDL_MATRIX } from './DiveTables';


/* Primary function to return dive plan */
export const planDive = (data: DiveFormState, previousDive: DivePlan | null) => {
    /*
        Use depth to get depthIndex
        Use depthIndex and time to get timeIndex
        Convert timeIndex to letter which is the pressure group
    */
    const depth = data.depth
    const air = data.air
    const actualBottomTime = data.time
    let totalBottomTime = actualBottomTime

    // Depth index
    const depthIndex = getDepthIndex(depth, air)

    // Oxygen partial pressure if diving nitrox
    const ppo = air !== AIR ? getOxygenPartialPressure(depthIndex, air, depth) : null

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
        const RNT_NDL = getResidualNitrogenTime(depth, PGafterSurfaceInterval, air)
        residualNitrogenTime = RNT_NDL[0]
        totalBottomTime = residualNitrogenTime + actualBottomTime
    }

    // Get Safety Stop and No Decompression Limit information
    const safetyStop_NDL = getSafetyStopAndNDL(totalBottomTime, depthIndex, air)
    const safetyStop = safetyStop_NDL.safetyStop
    const noDecoLimit = safetyStop_NDL.ndl
    const preFlightSI = safetyStop_NDL.preFlightSI

    const timeIndex = getTimeIndex(depthIndex, totalBottomTime, air)

    // timeIndex points to the correct letter for pressure group
    const postDivePressureGroup = String.fromCharCode('A'.charCodeAt(0) + timeIndex)

    const divePlan = {
        "postDivePressureGroup": postDivePressureGroup,
        "postDivePressureIndex": timeIndex,
        "startingPressureGroup": String.fromCharCode('A'.charCodeAt(0) + startingPressureGroupIndex),
        "startingPressureIndex": startingPressureGroupIndex,
        "safetyStop": safetyStop,
        "decoLimit": noDecoLimit,
        "preFlightSI": preFlightSI,
        "ppo": ppo,
        "residualNitrogenTime": residualNitrogenTime,
        "totalBottomTime": totalBottomTime
    }
    return divePlan
}

/* Get Depth index to get list of times */
const getDepthIndex = (depth: number, air: string) => {
    /*
        Looks for matching depth or next value higher
        Depth index required to find array of times
    */
    const DEPTHS = air === AIR ? AIR_DEPTHS : air === EANx32 ? EANx32_DEPTHS : EANx36_DEPTHS
    const depthIndex = DEPTHS.findIndex(arrDepth => arrDepth >= depth)
    const lastItem = DEPTHS[DEPTHS.length - 1]
    const lastIndex = DEPTHS.findIndex(depth => depth === lastItem)

    return depthIndex !== -1 ? depthIndex : lastIndex;
}

/* Get Time index */
const getTimeIndex = (depthIndex: number, time: number, air: string) => {
    // Returns timeIndex
    // Get list of times according to depth
    const DEPTH_TIMES = air === AIR ? AIR_DEPTH_TIMES : air === EANx32 ? EANx32_DEPTH_TIMES : EANx36_DEPTH_TIMES

    const times = DEPTH_TIMES[depthIndex]

    const timeIndex = times.findIndex(arrTime => arrTime >= time)
    const lastIndex = times.length - 1

    return timeIndex !== -1 ? timeIndex : lastIndex;
}

/* Get partial pressure of oxygen if nitrox selected */
const getOxygenPartialPressure = (depthIndex: number, air: string, depth: number) => {

    const PPOS = air === EANx32 ? EANx32_PPO : EANx36_PPO
    let ppo = PPOS[depthIndex]
    const lastItem = PPOS[PPOS.length - 1]
    ppo = ppo !== undefined ? ppo : lastItem;

    // 32 warning
    let maximumDepth = air === EANx32 ? 110 : 90
    let warning = `❗ ppO2 exceeded. This dive is highly discouraged.
    The maximum depth for ${air} is exceeded by ${depth - maximumDepth} feet which greatly increases the risk of oxygen toxicity, convulsions and drowning.
    Do not descend past the maximum depth of ${maximumDepth} feet.`

    const partialPressure = {
        "value": ppo,
        "warning": warning
    }

    return partialPressure
}

const getPgAfterSurfaceInterval = (startGroupIndex: number, surfaceIntervalTime: number) => {
    const times = SI_TIMES_PG_MATRIX[startGroupIndex]
    const timeIndex = times.findIndex(arr => surfaceIntervalTime >= arr[0] && surfaceIntervalTime <= arr[1])

    return timeIndex !== -1 ? timeIndex : 0;
}

const getResidualNitrogenTime = (depth: number, pgIndex: number, air: string) => {
    // Use depth to get [residual nitrogen time, no deco limit] from matrix
    const depthIndex = getDepthIndex(depth, air)
    const RNT_NDL_MATRIX = air === AIR ? AIR_RNT_NDL_MATRIX : air === EANx32 ? EANx32_RNT_NDL_MATRIX : EANx36_RNT_NDL_MATRIX
    const times = RNT_NDL_MATRIX[depthIndex]
    return times[pgIndex]
}

const getSafetyStopAndNDL = (totalBottomTime: number, depthIndex: number, air: string) => {

    const SAFETY_STOP_DECO_LIMITS = air === AIR ? AIR_SAFETY_STOP_DECO_LIMITS : air === EANx32 ? EANx32_SAFETY_STOP_DECO_LIMITS : EANx36_SAFETY_STOP_DECO_LIMITS

    // Safety Stop, Deco Limit
    const minSafetyStopTime_decoLimit = SAFETY_STOP_DECO_LIMITS[depthIndex]
    const safetyStopRequired = totalBottomTime >= minSafetyStopTime_decoLimit[0]
    const minDecoLimit = minSafetyStopTime_decoLimit[1]
    const decoLimit = minSafetyStopTime_decoLimit[2]

    // Matches or exceeds deco limit?
    const meetsDecoLimit = totalBottomTime >= minDecoLimit
    const minToAbsNDL = totalBottomTime - decoLimit

    // No Deco Scenarios
    const roundUpToNDL = meetsDecoLimit && totalBottomTime < decoLimit
    const meetsNDL = totalBottomTime === decoLimit
    const exceedsNDL = totalBottomTime > decoLimit

    // Length of safety stop depends on minutes exceeding NDL
    const safetyStopLength = (
        roundUpToNDL || meetsNDL ? 3
            : minToAbsNDL >= 0 && minToAbsNDL <= 5 ? 8
                : 15
    )

    // Warning message depends on scenario
    let noDecoLimitWarning = ""
    if (roundUpToNDL) {
        noDecoLimitWarning = `❗ No Decompression limit met. The total time of this dive requires rounding up to the next pressure group which meets the No Decompression Limit of ${decoLimit} minutes.
        This dive is highly discouraged.
        This dive requires an 8 minute decompression stop (air supply permitting).
        The diver must remain out of the water for 6 hours before the next dive.`
    } else if (meetsNDL) {
        noDecoLimitWarning = `❗ No Decompression limit met at ${decoLimit} minutes. This dive is highly discouraged.
        This dive requires an 8 minute decompression stop (air supply permitting).
        The diver must remain out of the water for 6 hours before the next dive.`
    } else if (exceedsNDL) {
        noDecoLimitWarning = ` ❗ No Decompression limit exceeded by ${minToAbsNDL} ${minToAbsNDL > 1 ? 'minutes' : 'minute'}.
            This dive is highly discouraged.
            This dive requires ${safetyStopLength} minute decompression stop (air supply permitting).
            The diver must remain out of the water for ${minToAbsNDL <= 5 ? "6" : "24"} hours before the next dive.`
    }

    // Pre-Flight Surface Interval
    let preFlightSI = roundUpToNDL || meetsNDL ? " 18 hours" : exceedsNDL ? " 24 hours" : " 12 hours. If this dive follows multi-day dives, the minimum pre-flight surface interval is 18 hours."

    const safetyStop = {
        "required": safetyStopRequired,
        "length": safetyStopLength
    }

    const noDecoLimit = {
        "met": meetsDecoLimit,
        "warning": noDecoLimitWarning
    }

    const ss_ndl = {
        "safetyStop": safetyStop,
        "ndl": noDecoLimit,
        "preFlightSI": preFlightSI
    }

    return ss_ndl

}

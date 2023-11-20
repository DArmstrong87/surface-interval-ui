const getPressureGroup = (data) => {
    const depth = data.depth
    const time = data.time
    const surfaceInterval = data.surfaceInterval

    const depthIndex = getDepthIndex(depth)
    const timeIndex = getTimeIndex(depthIndex, time)

    // timeIndex points to the correct letter for pressure group
    const pressureGroup = String.fromCharCode('A'.charCodeAt(0) + timeIndex)
    console.log(pressureGroup)
}

const depths = [35, 40, 50, 60, 70, 80, 90, 110, 120, 130, 140]
const MATRIX = [
    /*35*/[10, 19, 25, 29, 32, 36, 40, 44, 48, 52, 57, 62, 67, 73, 79, 85, 92, 100, 108, 117, 127, 139, 152, 168, 188, 205],
    /*40*/[9, 16, 22, 25, 27, 31, 34, 37, 40, 44, 48, 51, 55, 60, 64, 69, 74, 85, 91, 97, 104, 111, 120, 129, 140],
    /*50*/[7, 13, 17, 19, 21, 24, 26, 28, 31, 33, 36, 39, 41, 44, 47, 50, 53, 57, 60, 63, 67, 71, 75, 80],
    /*60*/[6, 11, 14, 16, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 42, 44, 47, 49, 52, 54, 55],
    /*70*/[5, 9, 12, 13, 15, 16, 18, 19, 21, 22, 24, 26, 27, 29, 31, 33, 35, 36, 38, 40],
    /*80*/[4, 8, 10, 11, 13, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29, 30],
    /*90*/[4, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25],
    /*100*/[3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    /*110*/[3, 6, 7, 8, 9, 10, 11, 12, 12, 13, 14, 15, 16],
    /*120*/[3, 5, 6, 7, 8, 9, 10, 10, 11, 12, 13],
    /*130*/[3, 5, 6, 6, 7, 8, 9, 10],
    /*140*/[0, 4, 5, 6, 7, 8],
]

const getDepthIndex = (depth) => {
    const index = depths.findIndex(arrDepth => arrDepth >= depth)
    const lastIndex = depths.findIndex(depth => depth === 140)

    return index !== -1 ? index : lastIndex;
}

const getTimeIndex = (depthIndex, time) => {
    const times = MATRIX[depthIndex]
    const index = times.findIndex(arrTime => arrTime >= time)
    const lastIndex = times.length - 1

    return index !== -1 ? index : lastIndex;
}

getPressureGroup({
    depth: 80,
    time: 20,
    surfaceInterval: 0
})

/*
Get Pressure group after surface interval
Starting Pressure Group
Time
Returns ending pressure group
*/

// Starting pressure group: [start, end]
const SI_MATRIX = [
    /*A*/[0, 180],
    /*B*/[[48, 228], [0, 47]],
    /*C*/[[70, 250], [22, 69], [0, 21]],
    /*D*/[[79, 259], [31, 78], [9, 30], [0, 8]],
    /*E*/[[88, 268], [39, 87], [17, 38], [8, 16], [0, 7]],
    /*F*/[[95, 275], [47, 94], [25, 46], [16, 24], [8, 15], [0, 7]],
    /*G*/[[102, 282], [54, 101], [32, 53], [23, 31], [14, 22], [7, 13], [0, 6]],
    /*H*/[[108, 288], [60, 107], [38, 59], [29, 37], [21, 28], [13, 20], [6, 12], [0, 5]],
    /*I*/[[114, 294], [66, 113], [44, 65], [35, 43], [27, 34], [19, 26], [12, 18], [6, 11], [0, 5]],
    /*J*/[[120, 300], [72, 119], [50, 71], [41, 49], [32, 40], [25, 31], [18, 24], [12, 17], [6, 11], [0, 5]],
    /*K*/[[125, 305], [77, 124], [55, 76], [46, 54], [38, 45], [30, 37], [23, 29], [17, 22], [11, 16], [5, 10], [0, 4]],
    /*L*/[[130, 310], [82, 129], [60, 81], [51, 59], [43, 50], [35, 42], [28, 34], [22, 27], [16, 21], [10, 15], [5, 9], [0, 4]],
    /*M*/[[135, 315], [86, 134], [65, 85], [56, 64], [47, 55], [40, 46], [33, 39], [26, 32], [20, 25], [15, 19], [10, 14], [5, 9], [0, 4]],
    /*N*/[[139, 319], [91, 138], [69, 90], [60, 68], [52, 59], [44, 51], [37, 43], [31, 36], [25, 30], [19, 24], [14, 18], [9, 13], [4, 8], [0, 3]],
    /*O*/[[144, 324], [95, 143], [73, 94], [64, 72], [56, 63], [48, 55], [42, 47], [35, 41], [29, 34], [24, 28], [18, 23], [13, 17], [9, 12], [4, 8], [0, 3]],
    /*P*/[[148, 328], [99, 147], [77, 98], [68, 76], [60, 67], [52, 59], [46, 51], [39, 45], [33, 38], [28, 32], [22, 27], [17, 21], [13, 16], [6, 12], [4, 7], [0, 3]],
    /*Q*/[[151, 331], [103, 150], [81, 102], [72, 80], [64, 71], [56, 63], [49, 55], [43, 48], [37, 42], [31, 35], [26, 30], [21, 25], [17, 20], [12, 16], [8, 11], [4, 7], [0, 3]],
    /*R*/[[155, 335], [107, 154], [85, 106], [76, 84], [68, 75], [60, 67], [53, 59], [47, 52], [41, 46], [35, 40], [30, 34], [25, 29], [20, 24], [16, 19], [12, 15], [8, 11], [4, 7], [0, 3]],
    /*S*/[[149, 339], [110, 158], [88, 109], [79, 87], [71, 78], [64, 70], [57, 63], [50, 56], [44, 49], [39, 43], [33, 38], [28, 32], [24, 27], [19, 23], [15, 18], [11, 14], [7, 10], [4, 6], [0, 3]],
    /*T*/[[162, 342], [114, 161], [92, 113], [83, 91], [74, 82], [37, 73], [60, 66], [54, 59], [48, 53], [42, 47], [37, 41], [32, 36], [27, 31], [23, 26], [18, 22], [14, 17], [11, 13], [7, 10], [3, 6], [0, 2]],
    /*U*/[[165, 345], [117, 164], [95, 116], [86, 94], [78, 85], [70, 77], [63, 69], [57, 62], [51, 56], [45, 50], [40, 44], [35, 39], [30, 34], [26, 29], [22, 25], [18, 21], [14, 17], [10, 13], [7, 9], [3, 6], [0, 2]],
    /*V*/[[168, 348], [120, 167], [98, 119], [89, 97], [81, 88], [73, 80], [66, 72], [60, 65], [54, 59], [48, 53], [43, 47], [38, 42], [34, 37], [29, 33], [25, 28], [21, 24], [17, 20], [13, 16], [10, 12], [6, 9], [3, 5], [0, 2]],
    /*W*/[[171, 351], [123, 170], [101, 122], [92, 100], [84, 91], [76, 83], [69, 75], [63, 68], [57, 62], [51, 56], [46, 50], [41, 45], [37, 40], [32, 36], [28, 31], [24, 27], [20, 23], [16, 19], [13, 15], [9, 12], [6, 8], [3, 5], [0, 2]],
    /*X*/[[174, 354], [126, 173], [104, 125], [95, 103], [87, 94], [79, 86], [72, 78], [66, 71], [60, 65], [54, 59], [49, 53], [44, 48], [40, 43], [35, 39], [31, 34], [27, 30], [23, 26], [19, 22], [16, 18], [12, 15], [9, 11], [6, 8], [3, 5], [0, 2]],
    /*Y*/[[177, 357], [129, 176], [107, 128], [98, 106], [90, 97], [82, 89], [75, 81], [69, 74], [63, 68], [57, 62], [52, 56], [47, 51], [42, 46], [38, 41], [34, 37], [30, 33], [26, 29], [22, 25], [19, 21], [15, 18], [12, 14], [9, 11], [6, 8], [3, 5], [0, 2]],
    /*Z*/[[180, 360], [132, 179], [110, 131], [101, 109], [92, 100], [85, 91], [78, 84], [72, 77], [66, 71], [60, 65], [55, 59], [50, 54], [45, 49], [41, 44], [36, 40], [32, 35], [29, 31], [25, 28], [21, 24], [18, 20], [15, 17], [12, 14], [9, 11], [6, 8], [3, 5], [0, 2]],
]

const getPgAfterSurfaceInterval = (startGroup, time) => {
    const startPressureGroup = String.fromCharCode('A'.charCodeAt(0) + startGroup)
    console.log("starting group", startPressureGroup)
    console.log("time", time)


    const times = SI_MATRIX[startGroup]
    const timeIndex = times.findIndex(arr => time >= arr[0] && time <= arr[1])


    const PGafterSurfaceInterval = timeIndex !== -1 ? String.fromCharCode('A'.charCodeAt(0) + timeIndex) : 'A'
    console.log("ending group", PGafterSurfaceInterval)
    return timeIndex !== -1 ? PGafterSurfaceInterval : 'A';

}

// getPgAfterSurfaceInterval(22, 95)

/*
Pressure Group at end of SI
Depth
Time
*/
// [residual nitrogen time, no decompression limits]
// Add RNT to actual bottom time
const residualNitrogenTimeMatrix = [
    /*35*/[[10,195],[19,186]],
    /*40*/[]
]

const getResidualNitrogenTime = (depth, actualBottomTime, pg) => {
    console.log("Actual Bottom Time", actualBottomTime)

    const depthIndex = getDepthIndex(depth)
    console.log("Depth index", depthIndex)
    const times = residualNitrogenTimeMatrix[depthIndex]
    console.log(times)
    const rnt_NDL = times[pg]
    const residualNitrogenTime = rnt_NDL[0]
    const noDecoLimit = rnt_NDL[1]
    console.log("Residual Nitrogen Time", residualNitrogenTime)
    console.log("No Deco Limit", noDecoLimit)

    console.log("Total Bottom time", actualBottomTime + residualNitrogenTime )
}


getResidualNitrogenTime(30, 40, 0)

/*
    DIVE TABLES
    Values are constants
*/
export const AIR = "air"
export const EANx32 = "EANx32"
export const EANx36 = "EANx36"

// Entered depth returns index of the matching value or next highest
export const AIR_DEPTHS = [35, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140]
export const EANx32_DEPTHS = [45, 50, 55, 60, 70, 80, 90, 100, 110, 120, 130]
export const EANx36_DEPTHS = [50, 55, 60, 65, 70, 80, 90, 100, 110]

// Partial Pressures of Oxygen
export const EANx32_PPO = [0.76, 0.80, 0.85, 0.90, 1.00, 1.10, 1.19, 1.29, 1.39, 1.48, 1.58]
export const EANx36_PPO = [0.91, 0.96, 1.01, 1.07, 1.12, 1.23, 1.34, 1.45, 1.56]

/*
    These are arrays of times.
    The depth entered returns a depth index,
    used to return the matching array of times.
    The entered time is used to return the index of the matching time value or next highest.
    This time index is essentially the pressure group as a number.
    Example: Index 2 is pressure group C
*/
export const AIR_DEPTH_TIMES = [
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
    /*140*/[0, 4, 5, 6, 7, 8]
]

export const EANx32_DEPTH_TIMES = [
    /*45*/[10, 20, 26, 30, 34, 37, 41, 46, 50, 55, 60, 65, 71, 77, 83, 90, 98, 106, 115, 126, 138, 151, 167, 187, 213, 220],
    /*50*/[9, 17, 23, 26, 29, 32, 36, 39, 43, 47, 51, 55, 59, 64, 69, 74, 80, 85, 92, 99, 106, 114, 123, 133, 145, 155],
    /*55*/[8, 15, 20, 23, 26, 28, 31, 34, 37, 41, 44, 47, 51, 55, 59, 63, 67, 72, 77, 82, 87, 93, 99, 106, 110],
    /*60*/[7, 14, 18, 20, 23, 25, 28, 30, 33, 36, 39, 42, 45, 48, 51, 55, 58, 62, 66, 70, 74, 79, 84, 90],
    /*70*/[6, 11, 15, 17, 19, 21, 23, 25, 27, 29, 32, 34, 36, 39, 41, 44, 46, 49, 52, 55, 58, 60],
    /*80*/[5, 10, 13, 14, 16, 18, 19, 21, 23, 25, 27, 28, 30, 32, 34, 36, 38, 41, 43, 45],
    /*90*/[5, 8, 11, 13, 14, 15, 17, 18, 20, 21, 23, 24, 26, 28, 29, 31, 33, 34, 35],
    /*100*/[4, 7, 10, 11, 12, 14, 15, 16, 17, 19, 20, 22, 23, 24, 26, 27, 29, 30],
    /*110*/[4, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 22, 23, 24, 25],
    /*120*/[3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    /*130*/[3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
]

export const EANx36_DEPTH_TIMES = [
    /*50*/[10, 20, 26, 30, 33, 37, 41, 46, 50, 55, 60, 65, 71, 77, 83, 90, 97, 106, 115, 125, 137, 150, 166, 186, 211, 220],
    /*55*/[9, 17, 23, 26, 29, 32, 36, 39, 43, 47, 51, 55, 60, 64, 69, 75, 80, 86, 93, 100, 107, 115, 125, 135, 146, 155],
    /*60*/[8, 15, 20, 23, 26, 29, 32, 35, 38, 41, 45, 48, 52, 56, 60, 64, 68, 73, 78, 83, 89, 95, 101, 108, 115],
    /*65*/[7, 14, 18, 21, 23, 26, 28, 31, 34, 37, 40, 43, 46, 49, 52, 56, 60, 64, 68, 72, 76, 81, 86, 90],
    /*70*/[7, 13, 17, 19, 21, 23, 26, 28, 31, 33, 36, 38, 41, 44, 47, 50, 53, 56, 60, 63, 67, 71, 75],
    /*80*/[6, 11, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 39, 41, 43, 46, 48, 51, 53, 55],
    /*90*/[5, 9, 12, 14, 15, 17, 19, 20, 22, 24, 25, 27, 29, 31, 33, 35, 37, 38, 39, 40],
    /*100*/[4, 8, 11, 12, 14, 15, 16, 18, 19, 21, 22, 24, 25, 27, 29, 30, 32, 34, 35],
    /*110*/[4, 7, 10, 11, 12, 13, 15, 16, 17, 18, 20, 21, 22, 24, 25, 27, 28, 29]
]

/*
    Uses DepthIndex to return the minimum value for
    safety stop requirement and decompression limit.
    [safety stop min, deco limit min, absolute deco limit]
*/
export const AIR_SAFETY_STOP_DECO_LIMITS = [
    /*35*/[140, 189, 205],
    /*40*/[105, 130, 140],
    /*50*/[64, 76, 80],
    /*60*/[48, 55, 55],
    /*70*/[34, 39, 40],
    /*80*/[26, 30, 30],
    /*90*/[22, 25, 25],
    /*100*/[0, 20, 20],
    /*110*/[0, 16, 16],
    /*120*/[0, 13, 13],
    /*130*/[0, 10, 10],
    /*140*/[0, 8, 8]
]
export const EANx32_SAFETY_STOP_DECO_LIMITS = [
    /*45*/[152, 214, 220],
    /*50*/[115, 146, 155],
    /*55*/[88, 107, 110],
    /*60*/[71, 85, 90],
    /*70*/[50, 59, 60],
    /*80*/[37, 44, 45],
    /*90*/[30, 35, 35],
    /*100*/[0, 30, 30],
    /*110*/[0, 25, 25],
    /*120*/[0, 20, 20],
    /*130*/[0, 18, 18]
]
export const EANx36_SAFETY_STOP_DECO_LIMITS = [
    /*50*/[151, 212, 220],
    /*55*/[116, 147, 155],
    /*60*/[90, 109, 115],
    /*65*/[73, 87, 90],
    /*70*/[61, 72, 75],
    /*80*/[47, 54, 55],
    /*90*/[36, 40, 40],
    /*100*/[0, 35, 35],
    /*110*/[0, 29, 29]
]

/*
    Values are time ranges [low, high]
    Pressure group at end of dive is used as the index to get array of time range arrays.
        Example: Pressure group C is index 2 and would return [[70, 250], [22, 69], [0, 21]]
    When the entered times is equal to or between these values, the index of this time range array is returned
    Higher time ranges are listed first, as the longer a diver is out of the water,
    the lower their pressure group after the surface interval.
    Example:
        Starting group B, with a time of 90 minutes
        Returns index 0 which is Pressure Group A
*/
export const SI_TIMES_PG_MATRIX = [
    /*A*/[[0, 180]],
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
    /*Z*/[[180, 360], [132, 179], [110, 131], [101, 109], [92, 100], [85, 91], [78, 84], [72, 77], [66, 71], [60, 65], [55, 59], [50, 54], [45, 49], [41, 44], [36, 40], [32, 35], [29, 31], [25, 28], [21, 24], [18, 20], [15, 17], [12, 14], [9, 11], [6, 8], [3, 5], [0, 2]]
]


/*
    Given the depth of the next planned dive,
    use the depth index to return array of [residual nitrogen time, no decompression limit] arrays
    Use the pressure group after surface interval (index) to return
    the [residual nitrogen time, no decompression limit] array
*/
export const AIR_RNT_NDL_MATRIX = [
    /*35*/[[10, 195], [19, 186], [25, 180], [29, 176], [32, 173], [36, 169], [40, 165], [44, 161], [48, 157], [52, 153], [57, 148], [62, 143], [67, 138], [73, 132], [79, 126], [85, 120], [92, 113], [100, 105], [108, 97], [117, 88], [127, 78], [139, 66], [152, 53], [168, 37], [188, 17], [205, 0]],
    /*40*/[[9, 131], [16, 124], [22, 118], [25, 115], [27, 113], [31, 109], [34, 106], [37, 103], [40, 100], [44, 96], [48, 92], [51, 89], [55, 85], [60, 80], [64, 76], [69, 71], [74, 66], [79, 61], [85, 55], [91, 49], [97, 43], [104, 36], [111, 29], [120, 20], [129, 11], [140, 0]],
    /*50*/[[7, 73], [13, 67], [17, 63], [19, 61], [21, 59], [24, 56], [26, 54], [28, 52], [31, 49], [33, 47], [36, 44], [38, 42], [41, 39], [44, 36], [47, 33], [50, 30], [43, 27], [57, 23], [60, 20], [63, 17], [67, 13], [71, 9], [75, 5], [80, 0]],
    /*60*/[[6, 49], [11, 44], [14, 41], [16, 39], [17, 38], [19, 36], [21, 34], [23, 32], [25, 30], [27, 28], [29, 26], [31, 24], [33, 22], [35, 20], [37, 18], [39, 16], [42, 13], [44, 11], [47, 8], [49, 6], [52, 3], [54, 1], [55, 0]],
    /*70*/[[5, 35], [9, 31], [12, 28], [13, 27], [15, 25], [16, 24], [18, 22], [19, 21], [21, 19], [22, 18], [24, 16], [26, 14], [27, 13], [29, 11], [31, 9], [33, 7], [34, 6], [36, 4], [38, 2], [40, 0]],
    /*80*/[[4, 26], [8, 22], [10, 20], [11, 19], [13, 17], [14, 16], [15, 15], [17, 13], [18, 12], [19, 11], [21, 9], [22, 8], [23, 7], [25, 5], [26, 4], [28, 2], [29, 0], [30, 0]],
    /*90*/[[4, 21], [7, 18], [9, 16], [10, 15], [11, 14], [12, 13], [13, 12], [15, 10], [16, 9], [17, 8], [18, 7], [19, 6], [21, 4], [22, 3], [23, 2], [24, 0], [25, 0]],
    /*100*/[[3, 17], [6, 14], [8, 12], [9, 11], [10, 10], [11, 9], [12, 8], [13, 7], [14, 6], [15, 5], [16, 4], [17, 3], [18, 2], [19, 0], [20, 0]],
    /*110*/[[3, 13], [6, 10], [7, 9], [8, 8], [9, 7], [10, 6], [11, 5], [12, 4], [13, 3], [14, 2], [14, 2], [15, 0], [16, 0]],
    /*120*/[[3, 10], [5, 8], [6, 7], [7, 6], [8, 5], [9, 4], [10, 3], [11, 2], [12, 0], [12, 0], [13, 0]],
    /*130*/[[3, 7], [5, 5], [6, 4], [7, 3], [8, 0], [9, 0], [10, 0]]
]
export const EANx32_RNT_NDL_MATRIX = [
    /*45*/[[10, 210], [20, 200], [26, 194], [30, 190], [34, 186], [37, 183], [41, 179], [46, 174], [50, 170], [55, 165], [60, 160], [65, 155], [71, 149], [77, 143], [83, 137], [90, 130], [98, 122], [106, 114], [115, 105], [126, 94], [137, 82], [151, 69], [167, 53], [187, 33], [213, 7], [220, 0]],
    /*50*/[[9, 146], [17, 138], [23, 132], [26, 129], [29, 126], [32, 123], [36, 119], [39, 116], [43, 112], [47, 108], [51, 104], [55, 100], [59, 96], [64, 91], [69, 86], [74, 81], [80, 75], [85, 70], [92, 63], [99, 56], [106, 49], [114, 41], [123, 32], [133, 22], [145, 10], [155, 0]],
    /*55*/[[8, 102], [15, 95], [20, 90], [23, 87], [26, 84], [28, 82], [31, 79], [34, 76], [37, 73], [41, 69], [44, 66], [47, 63], [51, 59], [55, 55], [59, 51], [63, 47], [67, 43], [72, 38], [77, 33], [82, 28], [87, 23], [93, 17], [99, 11], [106, 4], [110, 0]],
    /*60*/[[7, 83], [14, 76], [18, 72], [20, 70], [23, 67], [25, 65], [28, 62], [30, 60], [33, 57], [36, 54], [39, 51], [42, 48], [45, 45], [48, 42], [51, 39], [55, 35], [58, 32], [63, 28], [66, 24], [70, 20], [74, 16], [79, 11], [84, 6], [90, 0]],
    /*70*/[[6, 54], [11, 59], [15, 45], [17, 43], [19, 41], [21, 39], [23, 37], [25, 35], [27, 33], [29, 31], [32, 28], [34, 26], [36, 24], [39, 21], [41, 19], [44, 16], [46, 14], [49, 11], [52, 8], [55, 5], [58, 0], [60, 0]],
    /*80*/[[5, 40], [10, 35], [13, 32], [14, 31], [16, 29], [18, 27], [19, 26], [21, 24], [23, 22], [25, 20], [27, 18], [28, 17], [30, 15], [32, 13], [34, 11], [36, 9], [38, 7], [41, 0], [43, 0], [45, 0]],
    /*90*/[[5, 30], [8, 27], [11, 24], [13, 22], [14, 21], [15, 20], [17, 18], [18, 17], [20, 15], [21, 14], [23, 12], [24, 11], [26, 9], [28, 7], [29, 6], [31, 4], [33, 0], [34, 0], [35, 0]],
    /*100*/[[4, 26], [7, 23], [10, 20], [11, 19], [12, 18], [14, 16], [15, 15], [16, 14], [17, 13], [19, 11], [20, 10], [22, 8], [23, 7], [24, 6], [26, 4], [27, 3], [29, 0], [30, 0]],
    /*110*/[[4, 21], [7, 18], [9, 16], [10, 15], [11, 14], [12, 13], [13, 12], [14, 11], [16, 9], [17, 8], [18, 7], [19, 6], [20, 5], [22, 3], [23, 0], [24, 0], [25, 0]],
    /*120*/[[3, 17], [6, 14], [8, 12], [9, 11], [10, 10], [11, 9], [12, 8], [13, 7], [14, 6], [15, 5], [16, 4], [17, 3], [18, 0], [19, 0], [20, 0]],
    /*130*/[[3, 15], [6, 12], [7, 11], [8, 10], [9, 9], [10, 8], [11, 7], [12, 6], [13, 5], [14, 4], [15, 3], [16, 0], [17, 0], [18, 0]]
]

export const EANx36_RNT_NDL_MATRIX = [
    /*50*/[[10, 210], [20, 200], [26, 194], [30, 190], [33, 187], [37, 183], [41, 179], [46, 174], [50, 170], [55, 165], [60, 160], [65, 155], [71, 149], [77, 143], [83, 137], [90, 130], [97, 123], [106, 114], [115, 105], [125, 95], [137, 83], [150, 70], [166, 54], [186, 34], [211, 9], [220, 0]],
    /*55*/[[9, 146], [17, 138], [23, 132], [26, 129], [29, 126], [32, 123], [36, 119], [39, 116], [43, 112], [47, 108], [51, 104], [55, 100], [60, 95], [64, 91], [69, 86], [75, 80], [80, 75], [86, 69], [93, 62], [100, 55], [107, 48], [115, 40], [125, 30], [135, 20], [146, 9], [155, 0]],
    /*60*/[[8, 107], [15, 100], [20, 95], [23, 92], [26, 89], [29, 86], [32, 83], [35, 80], [38, 77], [41, 74], [45, 70], [48, 67], [56, 63], [60, 59], [64, 55], [68, 51], [73, 47], [78, 42], [83, 32], [89, 26], [95, 20], [101, 14], [108, 7], [115, 0]],
    /*65*/[[7, 83], [14, 76], [18, 72], [21, 69], [23, 67], [26, 64], [28, 62], [31, 59], [34, 56], [37, 53], [40, 50], [43, 47], [46, 44], [49, 41], [52, 38], [56, 34], [60, 30], [64, 26], [68, 22], [72, 18], [76, 14], [81, 9], [86, 4], [90, 0]],
    /*70*/[[7, 68], [13, 62], [17, 58], [19, 56], [21, 54], [23, 52], [26, 49], [28, 47], [31, 44], [33, 42], [36, 39], [38, 37], [41, 34], [44, 31], [47, 28], [50, 25], [53, 22], [56, 19], [60, 15], [63, 12], [67, 8], [71, 4], [75, 0]],
    /*80*/[[6, 49], [11, 44], [14, 41], [16, 39], [18, 37], [20, 35], [22, 33], [24, 31], [26, 29], [28, 27], [30, 25], [32, 23], [34, 21], [36, 19], [39, 16], [41, 14], [43, 12], [46, 9], [48, 7], [51, 4], [53, 0], [55, 0]],
    /*90*/[[5, 35], [9, 31], [12, 28], [14, 26], [15, 25], [17, 23], [19, 21], [20, 20], [22, 18], [24, 16], [25, 15], [27, 13], [29, 11], [31, 9], [33, 7], [35, 5], [37, 3], [38, 0], [39, 0], [40, 0]],
    /*100*/[[4, 31], [8, 27], [11, 24], [12, 23], [14, 21], [15, 20], [16, 19], [18, 17], [19, 16], [21, 14], [22, 13], [24, 11], [25, 10], [27, 8], [29, 6], [30, 5], [32, 3], [34, 0], [35, 0]],
    /*110*/[[4, 25], [7, 22], [10, 19], [11, 18], [12, 17], [13, 16], [15, 14], [16, 13], [17, 12], [18, 11], [20, 9], [21, 8], [22, 7], [24, 5], [25, 4], [27, 0], [28, 0], [29, 0]]
]

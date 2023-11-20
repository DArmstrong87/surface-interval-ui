import { DiveFormState } from './DivePlanner';

export const getPressureGroup = (data: DiveFormState) => {
    const depth = data.depth
    const time = data.time
    const surfaceInterval = data.surfaceInterval


    debugger
}

const DIVETABLE = {
    35: {
        10: "A",
        19: "B",
        25: "C",
        29: "D"
    }
}

const MATRIX = {
    "depth": [35, 40, 50, 60, 70, 80, 90, 110, 120, 130, 140]
}

const getDepthIndex = (depth: number) => {
    const index = MATRIX.depth.findIndex(element => element >= depth)
    if (index !== -1) {
        return MATRIX.depth[index];
    } else {
        // If the number is not found, return the first element in the list (next value)
        return MATRIX.depth[0];
    }
}
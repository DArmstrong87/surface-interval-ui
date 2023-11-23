import React, { useState, useEffect, useCallback } from 'react';
import { planDive } from './PlanDive';


export interface DiveFormState {
    depth: number;
    time: number;
    surfaceInterval: number;
}

export interface DivePlan {
    depth: number,
    startingPressureGroup: string,
    startingPressureIndex: number,
    postDivePressureGroup: string,
    postDivePressureIndex: number,
    safetyStopRequired: boolean,
    minToNDL: number,
    surfaceInterval: number,
    actualBottomTime: number,
    residualNitrogenTime: number,
    totalBottomTime: number,
}

const initialDiveFormState = {
    depth: 0,
    time: 0,
    surfaceInterval: 0
}

function DivePlanner() {

    const [currentDives, setCurrentDives] = useState<DivePlan[]>([])
    const [diveFormState, setFormState] = useState<DiveFormState>(initialDiveFormState)
    const [prevDivePG, setPrevDivePG] = useState<string>("")

    useEffect(() => {
        console.log('Listing dives in current plan')
    }, [currentDives])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Prevent NaN
        let value = parseInt(e.target.value)
        if (isNaN(value)) {
            value = 0
        }
        // Set form state
        setFormState({
            ...diveFormState,
            [e.target.name]: value,
        });
    };


    const handleSubmit = useCallback(() => {
        const previousDive = currentDives.length > 0 ? currentDives[currentDives.length - 1] : null
        const plannedDive = planDive(diveFormState, previousDive)
        const dive = {
            "depth": diveFormState.depth,
            "startingPressureGroup": plannedDive.startingPressureGroup,
            "startingPressureIndex": plannedDive.startingPressureIndex,
            "postDivePressureGroup": plannedDive.postDivePressureGroup,
            "postDivePressureIndex": plannedDive.postDivePressureIndex,
            "safetyStopRequired": plannedDive.safetyStopRequired,
            "minToNDL": plannedDive.minToNDL,
            "surfaceInterval": diveFormState.surfaceInterval,
            "actualBottomTime": diveFormState.time,
            "residualNitrogenTime": plannedDive.residualNitrogenTime,
            "totalBottomTime": plannedDive.totalBottomTime
        }
        setPrevDivePG(plannedDive.postDivePressureGroup)
        let resetFormState = { ...initialDiveFormState }
        if (['Y', 'Z'].includes(plannedDive.postDivePressureGroup)) {
            resetFormState['surfaceInterval'] = 180
        }
        setFormState(resetFormState)
        setCurrentDives([...currentDives, dive])
    }, [currentDives, diveFormState])

    const handleReset = useCallback(() => {
        setCurrentDives([]);
        setFormState(initialDiveFormState);
    }, [])

    return (<>
        <h1>Dive Planner</h1>
        <article>
            <section>
                <h1>Plan the dive, dive the plan.</h1>
                <p>
                    This dive planner uses the PADI Recreational Dive Planner. It is designed for new Open Water students to practice their dive planning skills as well as anyone planning a single dive or multiple dives. The dive planner informs the diver if a planned dive is relatively safe regarding nitrogen exposure only.
                </p>
                <p>
                    Other factors can increase risk of developing decompression illness beyond depth, time and ascent rate, including dehydration, thermal stress, exertion, general fitness, post-dive air travel, etc. The dive planner can NOT predict diver behavior, dive conditions or in any way ensure dive safety prior to or during a dive. Remember to use a reliable dive computer and always dive within your limits.
                </p>
            </section>

            {currentDives.length > 0 ?
                currentDives.map((dive, index) =>
                    <React.Fragment key={`diveFrag-${index}`}>
                        <section key={`dive-${index}`}>
                            {/* Subsequent dives will display surface interval and starting pressure group */}
                            {index !== 0 ?
                                <>
                                    <p key={`diveSI-${index}`}>Surface Interval: {dive.surfaceInterval} minutes</p>
                                    <p key={`diveStartPG-${index}`}>Starting Pressure Group: {dive.startingPressureGroup}</p>
                                </>
                                : ""
                            }
                            <p key={`diveDepth-${index}`}>Depth: {dive.depth}</p>
                            {/* Subsequent dives will show addition of ABT and RNT for TBT */}
                            {
                                index !== 0 ?
                                    <React.Fragment key={`diveTimesFrag-${index}`}>
                                        <p key={`diveABT-${index}`}>Actual Bottom Time: {dive.actualBottomTime} minutes</p>
                                        <p key={`diveRNT-${index}`}>+ Residual nitrogen time: {dive.residualNitrogenTime} minutes</p>
                                        <p key={`diveTBT-${index}`}>= Total bottom time: {dive.totalBottomTime} minutes</p>
                                    </React.Fragment>
                                    :
                                    <p key={`diveTime-${index}`}>Total Bottom Time: {dive.totalBottomTime}</p>
                            }

                            <p key={`divePG-${index}`}>Pressure Group: {dive.postDivePressureGroup}</p>
                            <p key={`diveSSRequired-${index}`}>
                                Safety Stop Required:
                                {
                                    dive.safetyStopRequired && dive.minToNDL < 0 ? " 3 minutes"
                                        : dive.safetyStopRequired && dive.minToNDL <= 5 && dive.minToNDL >= 0 ? " 8 minutes"
                                            : dive.safetyStopRequired && dive.minToNDL > 5 ? " 15 minutes"
                                                : " No"
                                }
                            </p>
                            {/* Decompression Limit */}
                            <p key={`diveMinToNDL-${index}`}>
                                {dive.minToNDL > 0 ?
                                    <b>
                                        ❗ No Decompression limit exceeded by {dive.minToNDL} minutes.
                                        This dive is highly discouraged.
                                        This dive requires {dive.minToNDL <= 5 ? "an 8" : "a 15"} minute decompression stop (air supply permitting).
                                        The diver must remain out of the water for {dive.minToNDL <= 5 ? "6" : "24"} hours before the next dive.
                                    </b>
                                    : dive.minToNDL < 0 ? `Minutes to No Decompression Limit: ${Math.abs(dive.minToNDL)}`
                                        :
                                        <b>
                                            ❗ No Decompression limit met at {dive.totalBottomTime} minutes.
                                            This dive is highly discouraged.
                                            This dive requires an 8 minute decompression stop (air supply permitting).
                                            The diver must remain out of the water for 6 hours before the next dive.
                                        </b>
                                }
                            </p>
                            {/* Pre-flight surface interval minimums */}
                            <p key={`diveFlightSI-${index}`}>
                                Pre-flight surface interval:
                                {index === 0 && dive.minToNDL < 0 ?
                                    " 12 hour minimum. If this dive follows multi-day dives, the minimum pre-flight surface interval is 18 hours."
                                    :
                                    index === 0 && dive.minToNDL >= 0 ? " 18 hour minimum"
                                        :
                                        " 18 hour minimum"}
                            </p>
                            <hr />
                        </section>
                    </React.Fragment>
                )
                : ""
            }

            <section>
                {currentDives.length > 0 ?
                    <>
                        {prevDivePG === 'Y' || prevDivePG === 'Z' ?
                            `Previous dive's pressure group is "${prevDivePG}". The minimum suggested surface interval is 3 hours (180 minutes)`
                            :
                            ""}
                        <fieldset>
                            <label key={'surfaceIntervalLabel'} htmlFor="inputSurfaceInterval">Surface Interval (mins)</label>
                            <input key={'surfaceIntervalInput'} id="inputSurfaceInterval" name="surfaceInterval" type="number"
                                min={prevDivePG === 'Y' || prevDivePG === 'Z' ? 180 : ""} value={diveFormState.surfaceInterval}
                                required onChange={handleInputChange} />
                        </fieldset>
                    </>
                    : ""
                }

                <fieldset>
                    <label key={'depthLabel'} htmlFor="inputDepth">Depth</label>
                    <input key={'depthInput'} id="inputDepth" name="depth" type="text" value={diveFormState.depth}
                        required onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <label key={'timeLabel'} htmlFor="inputTime">Time (mins)</label>
                    <input key={'timeInput'} id="inputTime" name="time" type="text" value={diveFormState.time} required onChange={handleInputChange} />
                </fieldset>

                <button onClick={handleSubmit}>Dive</button>
                <button onClick={handleReset}>Reset</button>

            </section>



        </article>

    </>
    );
}

export default DivePlanner;

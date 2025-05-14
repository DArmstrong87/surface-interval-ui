import React, { useState, useEffect, useCallback } from 'react';
import { planDive } from './PlanDive';
import { AIR, EANx32, EANx36 } from './DiveTables';


export interface DiveFormState {
    depth: number;
    time: number;
    surfaceInterval: number;
    air: string;
}

export interface DivePlan {
    depth: number;
    startingPressureGroup: string;
    startingPressureIndex: number;
    postDivePressureGroup: string;
    postDivePressureIndex: number;
    safetyStop: { required: boolean; length: number; };
    decoLimit: {
        met: boolean;
        warning: string
    };
    preFlightSI: string;
    ppo: null | {
        "value": number,
        "warning": string
    };
    surfaceInterval: number;
    actualBottomTime: number;
    residualNitrogenTime: number;
    totalBottomTime: number;
}

const initialDiveFormState = {
    depth: 0,
    time: 0,
    surfaceInterval: 0,
    air: AIR
}


function DivePlanner() {

    const [currentDives, setCurrentDives] = useState<DivePlan[]>([])
    const [diveFormState, setFormState] = useState<DiveFormState>(initialDiveFormState)
    const [prevDivePG, setPrevDivePG] = useState<string>("")

    useEffect(() => {
        console.log('Listing dives in current plan')
    }, [currentDives])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let intValue = parseInt(e.target.value) || 0;

        // Set form state
        setFormState({
            ...diveFormState,
            [e.target.name]: intValue,
        });
    };


    const handleSubmit = useCallback(() => {
        // Pass null or the previous dive to factor in the plan
        const previousDive = currentDives.length > 0 ? currentDives[currentDives.length - 1] : null
        const plannedDive = planDive(diveFormState, previousDive)

        const dive = {
            "depth": diveFormState.depth,
            "startingPressureGroup": plannedDive.startingPressureGroup,
            "startingPressureIndex": plannedDive.startingPressureIndex,
            "postDivePressureGroup": plannedDive.postDivePressureGroup,
            "postDivePressureIndex": plannedDive.postDivePressureIndex,
            "safetyStop": plannedDive.safetyStop,
            "decoLimit": plannedDive.decoLimit,
            "preFlightSI": plannedDive.preFlightSI,
            "ppo": plannedDive.ppo,
            "surfaceInterval": diveFormState.surfaceInterval,
            "actualBottomTime": diveFormState.time,
            "residualNitrogenTime": plannedDive.residualNitrogenTime,
            "totalBottomTime": plannedDive.totalBottomTime
        }

        // Set Previous dive PG to display for Surface Interval
        setPrevDivePG(plannedDive.postDivePressureGroup)

        // Reset form state, but persist air selection for subsequent dives
        let resetFormState = { ...initialDiveFormState }
        resetFormState["air"] = diveFormState.air
        if (['Y', 'Z'].includes(plannedDive.postDivePressureGroup)) {
            resetFormState['surfaceInterval'] = 180
        }
        setFormState(resetFormState)

        // Update dive list
        setCurrentDives([...currentDives, dive])
    }, [currentDives, diveFormState])

    const handleReset = useCallback(() => {
        setCurrentDives([]);
        setFormState(initialDiveFormState);
    }, [])

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...diveFormState,
            air: e.target.value,
        });
    }

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
                                    dive.safetyStop.required ? ` ${dive.safetyStop.length} minutes` : " No"
                                }
                            </p>
                            {
                                dive.ppo !== null ?
                                    <>
                                        <p> ppO2: {dive.ppo.value} </p>
                                        {dive.ppo.value > 1.40 ? <b> {dive.ppo.warning} </b> : ""}
                                    </>
                                    : ""
                            }
                            {/* Decompression Limit */}
                            {dive.decoLimit.met ?
                                <>
                                    <p key={`diveMinToNDL-${index}`}>
                                        <b>{dive.decoLimit.warning}</b>
                                    </p>
                                </>
                                : ""
                            }
                            {/* Pre-flight surface interval minimums */}
                            <p key={`diveFlightSI-${index}`}>
                                Pre-flight surface interval:
                                {index === 0 && !dive.decoLimit.met ?
                                    " 12 hours. If this dive follows multi-day dives, the minimum pre-flight surface interval is 18 hours."
                                    :
                                    dive.preFlightSI
                                }
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
                            <input key={'surfaceIntervalInput'} id="inputSurfaceInterval" name="surfaceInterval" type="text" inputMode="numeric" pattern="[0-9]*"
                                min={prevDivePG === 'Y' || prevDivePG === 'Z' ? 180 : 0} value={diveFormState.surfaceInterval || 0}
                                required onChange={handleInputChange} />
                        </fieldset>
                    </>
                    : ""
                }
                {/* Air Selection */}
                {currentDives.length === 0 ?
                    <>
                        <fieldset>
                            <input key={'airRadio'} id="air" type="radio" value={AIR} checked={diveFormState.air === AIR} onChange={handleRadioChange} />
                            <label key={'airLabel'} htmlFor="air">Air</label>
                            <input key={`${EANx32}Radio`} id={EANx32} type="radio" value={EANx32} checked={diveFormState.air === EANx32} onChange={handleRadioChange} />
                            <label key={`${EANx32}Label`} htmlFor={EANx32}>{EANx32}</label>
                            <input key={`${EANx36}Radio`} id={EANx36} type="radio" value={EANx36} checked={diveFormState.air === EANx36} onChange={handleRadioChange} />
                            <label key={`${EANx36}Label`} htmlFor={EANx36}>{EANx36}</label>
                        </fieldset>
                    </>
                    : ""}

                <fieldset>
                    <label key={'depthLabel'} htmlFor="inputDepth">Depth</label>
                    <input key={'depthInput'} id="inputDepth" name="depth" type="text" inputMode="numeric" pattern="[0-9]*" value={diveFormState.depth || 0}
                        required onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <label key={'timeLabel'} htmlFor="inputTime">Time (mins)</label>
                    <input key={'timeInput'} id="inputTime" name="time" type="text" inputMode="numeric" pattern="[0-9]*" value={diveFormState.time || 0}  min="0" required onChange={handleInputChange} />
                </fieldset>

                <button onClick={handleSubmit} id='diveBtn' disabled={diveFormState.depth <= 0  || diveFormState.time <= 0}>Dive</button>
                <button onClick={handleReset} id='resetBtn'>Reset</button>

            </section>



        </article>

    </>
    );
}

export default DivePlanner;

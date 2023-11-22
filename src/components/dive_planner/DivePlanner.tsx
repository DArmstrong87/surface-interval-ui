import React, { useState, useEffect, useCallback } from 'react';
import { planDive } from './PlanDive';


export interface DiveFormState {
    depth: number;
    time: number;
    surfaceInterval: number;
}
const initialDiveFormState = {
    depth: 0,
    time: 0,
    surfaceInterval: 0
}

export interface DivePlan {
    depth: number,
    time: number,
    pressureGroup: string,
    pressureGroupIndex: number,
    safetyStopRequired: boolean,
    minToNDL: number
}

function DivePlanner() {

    const [currentDives, setCurrentDives] = useState<DivePlan[]>([])
    const [formState, setFormState] = useState<DiveFormState>(initialDiveFormState)

    useEffect(() => {
        console.log('Listing dives in current plan')
    }, [currentDives])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value)
        if (isNaN(value)) {
            value = 0
        }
        setFormState({
            ...formState,
            [e.target.name]: value,
        });
    };

    const handleSubmit = useCallback(() => {
        const previousDive = currentDives.length > 0 ? currentDives[currentDives.length - 1] : null
        const plannedDive = planDive(formState, previousDive)
        const dive = {
            "depth": formState.depth,
            "time": formState.time,
            "pressureGroup": plannedDive.group,
            "pressureGroupIndex": plannedDive.index,
            "safetyStopRequired": plannedDive.safetyStopRequired,
            "minToNDL": plannedDive.minToNDL
        }
        setCurrentDives([...currentDives, dive])
    }, [currentDives, formState])

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
                            <p key={`diveDepth-${index}`}>Depth: {dive.depth}</p>
                            <p key={`diveTime-${index}`}>Time: {dive.time}</p>
                            <p key={`divePG-${index}`}>Pressure Group: {dive.pressureGroup}</p>
                            <p key={`diveSSRequired-${index}`}>Safety Stop Required: {String(dive.safetyStopRequired)}</p>
                            <p key={`diveMinToNDL-${index}`}>
                                {dive.minToNDL < 0 ? `No Decompression limit exceeded by ${Math.abs(dive.minToNDL)} minutes`
                                : dive.minToNDL > 0 ? `Minutes to No Decompression Limit: ${Math.abs(dive.minToNDL)}`
                                : `No Decompression level met at ${Math.abs(dive.minToNDL)} minutes`
                                }
                            </p>
                        </section>
                    </React.Fragment>
                )
                : ""
            }

            <section>
                <fieldset>
                    <label key={'depthLabel'} htmlFor="depth">Depth</label>
                    <input key={'depthInput'} name="depth" type="text" value={formState.depth} required onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <label key={'timeLabel'} htmlFor="time">Time</label>
                    <input key={'timeInput'} name="time" type="text" value={formState.time} required onChange={handleInputChange} />
                </fieldset>

                {currentDives.length > 0 ?
                    <fieldset>
                        <label key={'surfaceIntervalLabel'} htmlFor="surfaceInterval">Surface Interval (mins)</label>
                        <input key={'surfaceIntervalInput'} name="surfaceInterval" type="number" value={formState.surfaceInterval} required onChange={handleInputChange} />
                    </fieldset>
                    : ""
                }

                <button onClick={handleSubmit}>Dive</button>

            </section>



        </article>

    </>
    );
}

export default DivePlanner;

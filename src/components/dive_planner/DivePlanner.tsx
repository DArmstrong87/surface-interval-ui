import React, { useState } from 'react';
import { getPressureGroup } from './GetPressureGroup';


export interface DiveFormState {
    depth: number;
    time: number;
    surfaceInterval: number;
}

function DivePlanner() {

    const currentDives = []

    const [formState, setFormState] = useState<DiveFormState>({
        depth: 0,
        time: 0,
        surfaceInterval: 0
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: parseInt(e.target.value),
        });
    };

    const handleSubmit = () => {
        getPressureGroup(formState)
    }

    return (<>
        <h1>Dive Planner</h1>
        <article>
            <section className="divePlannerHeading">
                <h1>Plan the dive, dive the plan.</h1>
                <p>
                    This dive planner uses the PADI Recreational Dive Planner. It is designed for new Open Water students to practice their dive planning skills as well as anyone planning a single dive or multiple dives. The dive planner informs the diver if a planned dive is relatively safe regarding nitrogen exposure only.
                </p>
                <p>
                    Other factors can increase risk of developing decompression illness beyond depth, time and ascent rate, including dehydration, thermal stress, exertion, general fitness, post-dive air travel, etc. The dive planner can NOT predict diver behavior, dive conditions or in any way ensure dive safety prior to or during a dive. Remember to use a reliable dive computer and always dive within your limits.
                </p>
            </section>


            <section>
                <fieldset>
                    <label key={'depthLabel'} htmlFor="depth">Depth</label>
                    <input key={'depthInput'} name="depth" type="text" value={formState.depth} required onChange={handleInputChange} />
                </fieldset>

                <fieldset>
                    <label key={'timeLabel'} htmlFor="time">Time</label>
                    <input key={'timeInput'} name="time" type="text" value={formState.time} required onChange={handleInputChange} />
                </fieldset>

                {currentDives.length > 1 ?
                    <fieldset>
                        <label key={'surfaceIntervalLabel'} htmlFor="surfaceInterval">Surface Interval (mins)</label>
                        <input key={'surfaceIntervalInput'} name="surfaceInterval" type="text" value={formState.surfaceInterval} required onChange={handleInputChange} />
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

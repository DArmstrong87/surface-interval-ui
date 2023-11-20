import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../../api/APIService';

interface GearSet {
    id: number,
    name: string,
    bcd: object,
    regulator: object,
    octopus: object,
    mask: object,
    fins: object,
    boots: object,
    computer: object,
    exposure_suit: object,
    weights: number,
    tank: number,
}

interface LogDiveFormState {
    date: string;
    location: string;
    site: string;
    water: string;
    depth: number;
    time: number;
    description: string;
    startPressure: number;
    endPressure: number;
    tankVol: number;
    gearSet: number;
}

const initialFormState = {
    date: "",
    location: "",
    site: "",
    water: "Fresh",
    depth: 0,
    time: 0,
    description: "",
    startPressure: 0,
    endPressure: 0,
    gearSet: 0,
    tankVol: 80
}


function LogDive() {

    // STATE
    const [gearSets, setGearSets] = useState<GearSet[]>([])
    const [formState, setFormState] = useState<LogDiveFormState>(initialFormState)


    const navigate = useNavigate();

    // Set gear sets to populate options
    useEffect(() => {
        APIService.fetchData("/gear-sets")
            .then(gearSets => setGearSets(gearSets))
    }, [])

    function listGearSetOptions(gearSets: GearSet[]) {
        return gearSets.map((gearSet, index) =>
            <option key={`gearSetOption-${index}`} value={gearSet.id}>{gearSet.name}</option>
        )
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.type === "number" ? parseInt(e.target.value) : e.target.value
        setFormState({
            ...formState,
            [e.target.name]: value,
        });
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            water: e.target.value,
        });
    }

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            description: e.target.value,
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormState({
            ...formState,
            water: e.target.value,
        });
    }

    const handleLogDiveSubmit = (e: React.FormEvent) => {
        APIService.sendData("dives", formState).then(res => res.json()).then(data => {
            if(data.status === 201){
                debugger
                navigate("../dives")
            }
        })
    }


    return (<>
        <h1>Log Dive</h1>

        <form onSubmit={handleLogDiveSubmit}>
            <fieldset>
                <label key={'dateLabel'} htmlFor="date">Date</label>
                <input key={'dateInput'} name="date" type="date" value={formState.date} required onChange={handleInputChange} />
            </fieldset>

            <fieldset>
                <label key={'locationLabel'} htmlFor="location">Location</label>
                <input key={'locationInput'} name="location" type="text" value={formState.location} required onChange={handleInputChange} />
            </fieldset>

            <fieldset>
                <label key={'siteLabel'} htmlFor="site">Site</label>
                <input key={'siteInput'} name="site" type="text" value={formState.site} required onChange={handleInputChange} />
            </fieldset>

            <fieldset id="waterOptions">
                <label key={'waterLabelFresh'} htmlFor="waterRadioFresh">Fresh</label>
                <input key={'waterRadioFresh'} name="waterRadioFresh" type="radio" value="Fresh" checked={formState.water === 'Fresh'} onChange={handleRadioChange} />
                <label key={'waterLabelSalt'} htmlFor="waterRadioSalt">Salt</label>
                <input key={'waterRadioSalt'} name="waterRadioSalt" type="radio" value="Salt" checked={formState.water === 'Salt'} onChange={handleRadioChange} />
            </fieldset>

            <fieldset>
                <label key={'depthLabel'} htmlFor="depth">Depth</label>
                <input key={'depthInput'} name="depth" type="number" step={1} value={String(formState.depth)} required onChange={handleInputChange} />
            </fieldset>

            <fieldset>
                <label key={'timeLabel'} htmlFor="time">Time (mins)</label>
                <input key={'timeInput'} name="time" type="number" step={1} value={String(formState.time)} required onChange={handleInputChange} />
            </fieldset>

            <fieldset>
                <label key={'descriptionLabel'} htmlFor="description">Description</label>
                <textarea key={'descriptionInput'} name="description" value={formState.description} onChange={handleTextareaChange} />
            </fieldset>

            <fieldset>
                <label key={'startPressureLabel'} htmlFor="startPressure">Starting Tank Pressure</label>
                <input key={'startPressureInput'} name="startPressure" type="number" step={1} value={String(formState.startPressure)} onChange={handleInputChange} />
                <label key={'endPressureLabel'} htmlFor="endPressure">Ending Tank Pressure</label>
                <input key={'endPressureInput'} name="endPressure" type="number" step={1} value={String(formState.endPressure)} onChange={handleInputChange} />
            </fieldset>

            <fieldset>
                <label key={'tankVolLabel'} htmlFor="tankVol">Tank volume (cubic feet)</label>
                <input key={'tankVolInput'} name="tankVol" type="number" step={1} value={String(formState.tankVol)} onChange={handleInputChange} />
            </fieldset>

            <fieldset>
                <select key={"gearSetSelect"} name="gearSetSelect" id="gearSetSelect" value={formState.gearSet} onChange={handleSelectChange}>
                    <option value={0} disabled>Gear Set Used</option>
                    {listGearSetOptions(gearSets)}
                </select>
            </fieldset>

            <button type="submit">Log Dive</button>

        </form>
    </>
    );
}

export default LogDive;

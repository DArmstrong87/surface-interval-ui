import React, { useState, useEffect, useCallback } from 'react';
import APIService from '../../api/APIService';

interface GearType {
    id: number;
    name: string;
}

interface CustomGearType {
    id: number;
    name: string;
    diver: {
        id: number;
        name: string;
    };
}

interface NewGearItemFormState {
    gearType: string;
    customGearType: string;
    name: string;
}

interface GearItemService {
    purchaseDate: string;
    lastServiced: string;
    diveInterval: number;
    daysInterval: number;
}

const newGearItemInitial: NewGearItemFormState = {
    gearType: "",
    customGearType: "",
    name: "",
}

const newGearItemServiceInitial: GearItemService = {
    purchaseDate: "",
    lastServiced: "",
    diveInterval: 0,
    daysInterval: 0
}

function AddGear() {

    const [gearTypes, setGearTypes] = useState<GearType[]>([]);
    const [customGearTypes, setCustomGearTypes] = useState<CustomGearType[]>([]);
    const [trackService, setTrackService] = useState(false);
    const [newGearItemFormState, setNewGearItemForm] = useState<NewGearItemFormState>(newGearItemInitial);
    const [newGearItemServiceState, setNewGearItemService] = useState<GearItemService>(newGearItemServiceInitial);

    useEffect(() => {
        APIService.fetchData("/gear-types")
            .then(gearTypes => setGearTypes(gearTypes))
        APIService.fetchData("/custom-gear-types")
            .then(customGearTypes => setCustomGearTypes(customGearTypes))
    }
        , [])

    const today = new Date().toISOString().split("T")[0];

    const handleTrackServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setTrackService(isChecked);

    };

    const handleGearTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedGearType = e.target.value;
        const updatedNewGearItemFormState = { ...newGearItemFormState, gearType: selectedGearType, customGearType: "" };
        setNewGearItemForm(updatedNewGearItemFormState);
        console.log("Selected gear type:", selectedGearType);
        console.log("New gear item form state:", updatedNewGearItemFormState);
    };

    const handleCustomGearTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedGearType = e.target.value;
        const updatedNewGearItemFormState = { ...newGearItemFormState, customGearType: selectedGearType, gearType: "" };
        setNewGearItemForm(updatedNewGearItemFormState);
        console.log("Selected gear type:", selectedGearType);
        console.log("New gear item form state:", updatedNewGearItemFormState);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedNewGearItemFormState = { ...newGearItemFormState, name: e.target.value };
        setNewGearItemForm(updatedNewGearItemFormState);
        console.log("New gear item form state:", updatedNewGearItemFormState);
    }

    const handleDateInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedNewGearItemServiceState = { ...newGearItemServiceState, [name]: value };
        setNewGearItemService(updatedNewGearItemServiceState);
        console.log("New gear item service state:", updatedNewGearItemServiceState);
    }

    const handleNumberInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const updatedNewGearItemServiceState = { ...newGearItemServiceState, [name]: value };
        setNewGearItemService(updatedNewGearItemServiceState);
        console.log("New gear item service state:", updatedNewGearItemServiceState);
    }

    return (<>
        <div>
            <h1>Add Gear</h1>
            <form>
                <label htmlFor="gearType">Gear Type: </label>
                <select id="gearType" name="gearType" onChange={handleGearTypeChange} value={newGearItemFormState.gearType}>
                    <option value="">Select Gear Type</option>
                    {gearTypes.map((gearType) => (
                        <option key={gearType.id} value={gearType.id}>
                            {gearType.name}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="customGearType">Add Custom Gear Type: </label>
                <input type="text" id="customGearType" name="customGearType" onInput={handleCustomGearTypeChange} value={newGearItemFormState.customGearType} />
                <br />
                {customGearTypes.length > 0 &&
                    <>
                        <label htmlFor="customGearType">Custom Gear Type: </label>
                        <select id="customGearType" name="customGearType">
                            <option value="">Select Custom Gear Type</option>
                            {customGearTypes.map((customGearType) => (
                                <option key={customGearType.id} value={customGearType.id}>
                                    {customGearType.name}
                                </option>
                            ))}
                        </select>
                    </>
                }
                <br />
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={newGearItemFormState.name} onInput={handleInput} />
                <br />
                <label htmlFor="trackService">Track Service: </label>
                <input type="checkbox" id="trackService" name="trackService" onChange={handleTrackServiceChange} />
                <br />
                {trackService &&
                    <>
                        <hr />
                        <h2>Service Tracking</h2>
                        <label htmlFor="purchaseDate">Purchase Date: </label>
                        <input type="date" id="purchaseDate" max={today} name="purchaseDate" value={newGearItemServiceState.purchaseDate} onChange={handleDateInputs} />
                        <br />
                        <label htmlFor="lastServiced">Last Serviced: </label>
                        <input type="date" id="lastServiced" max={today} name="lastServiced" value={newGearItemServiceState.lastServiced} onChange={handleDateInputs} />
                        <br />
                        <label htmlFor="diveInterval">Dives before next service: </label>
                        <input type="number" id="diveInterval" name="diveInterval" value={newGearItemServiceState.diveInterval} onInput={handleNumberInputs} />
                        <br />
                        <label htmlFor="daysInterval">Days before next service: </label>
                        <input type="number" id="daysInterval" name="daysInterval" value={newGearItemServiceState.daysInterval} onInput={handleNumberInputs} />
                        <br />
                    </>
                }
            </form>
        </div>
    </>
    );
}

// name
// gear_type or custom gear_type
// purchase_date
// last_serviced

export default AddGear;
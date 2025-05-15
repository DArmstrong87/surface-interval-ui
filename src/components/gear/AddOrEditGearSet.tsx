import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import APIService from '../../api/APIService';
import { GearType, CustomGearType, GearItem } from '../../interfaces';

interface NewGearSetFormState {
    name: string;
    weight: number;
    gearItemIds: number[];
}

const newGearSetInitial: NewGearSetFormState = {
    name: "",
    weight: 0,
    gearItemIds: [],
}


function AddOrEditGearSet() {
    const { gearSetId } = useParams();

    const navigate = useNavigate();
    const [gearTypes, setGearTypes] = useState<GearType[]>([]);
    const [customGearTypes, setCustomGearTypes] = useState<CustomGearType[]>([]);
    const [newGearSetForm, setNewGearSetForm] = useState<NewGearSetFormState>(newGearSetInitial);
    const [gearItems, setGearItems] = useState<GearItem[]>([]);


    useEffect(() => {
        APIService.fetchData("/gear-items")
            .then(gearItems => setGearItems(gearItems))
        APIService.fetchData("/gear-types")
            .then(gearTypes => setGearTypes(gearTypes))
        APIService.fetchData("/custom-gear-types")
            .then(customGearTypes => setCustomGearTypes(customGearTypes))
        if (gearSetId) {
            console.log(gearSetId);
            APIService.fetchData(`/gear-sets/${gearSetId}`)
                .then(gearSet => {
                    const formData = {
                        name: gearSet.name,
                        weight: gearSet.weight,
                        gearItemIds: gearSet.gear_items.map((item: GearItem) => item.id),
                    }
                    setNewGearSetForm(formData);
                })
        }
    }
        , [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewGearSetForm({ ...newGearSetForm, [name]: value });
        console.log(name, value);
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        const gearItemId = parseInt(name.split('-')[1]);
        let gearItemIds = newGearSetForm.gearItemIds;
        if (checked) {
            gearItemIds.push(gearItemId);
        } else {
            gearItemIds = gearItemIds.filter(id => id !== gearItemId);
        }
        setNewGearSetForm({ ...newGearSetForm, gearItemIds: gearItemIds });
        console.log(gearItemIds);
    }

    const handleSubmit = (event: React.FormEvent) => {

        const gearSet = {
            name: newGearSetForm.name,
            weight: newGearSetForm.weight,
            gearItemIds: newGearSetForm.gearItemIds,
        }

        if (gearSetId) {
            APIService.updateData(`/gear-sets/${gearSetId}`, gearSet)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            APIService.sendData("/gear-sets", gearSet)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        console.log("Gear set submitted");
        navigate("/gear");
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this gear set?")) {
            APIService.deleteData(`/gear-sets/${gearSetId}`)
                .then(response => {
                    console.log(response);
            })
            .catch(error => {
                    console.error(error);
                });
            navigate("/gear");
        }
    }

    return (<>
        <div>
            <h1>{gearSetId ? "Edit" : "Add"} Gear Set</h1>
            <form onSubmit={handleSubmit}>

                <label htmlFor="gearSetName">Gear Set Name: </label>
                <input type="text" id="gearSetName" name="name" value={newGearSetForm.name} onInput={handleInputChange} />
                <br />

                <label htmlFor="gearSetWeight">Weight: </label>
                <input type="number" id="gearSetWeight" name="weight" value={newGearSetForm.weight} onInput={handleInputChange} />
                <br />

                <h3>Select Gear Items</h3>
                {/* Organize by gear_type or custom_gear_type */}
                {gearTypes &&
                    gearTypes
                        .filter(gearType => gearItems.some(item => item.gear_type?.name === gearType.name))
                        .map((gearType) => (
                            <div key={gearType.id}>
                                <h4>{gearType.name}</h4>
                                {gearItems.filter((gearItem) => gearItem.gear_type?.name === gearType.name).map((gearItem) => (
                                    <div key={gearItem.id}>
                                        <input type="checkbox" id={`gearItem-${gearItem.id}`} name={`gearItem-${gearItem.id}`} checked={newGearSetForm.gearItemIds.includes(gearItem.id)} onChange={handleCheckboxChange} />
                                        <label htmlFor={`gearItem-${gearItem.id}`}>{gearItem.name}</label>
                                    </div>
                                ))}
                            </div>
                        ))
                }
                {customGearTypes &&
                    customGearTypes
                        .filter(customGearType => gearItems.some(item => item.custom_gear_type?.id === customGearType.id))
                        .map((customGearType) => (
                            <div key={customGearType.id}>
                                <h4>{customGearType.name}</h4>
                                {gearItems.filter((gearItem) => gearItem.custom_gear_type?.id === customGearType.id).map((gearItem) => (
                                    <div key={gearItem.id}>
                                        <input type="checkbox" id={`gearItem-${gearItem.id}`} name={`gearItem-${gearItem.id}`} checked={newGearSetForm.gearItemIds.includes(gearItem.id)} onChange={handleCheckboxChange} />
                                        <label htmlFor={`gearItem-${gearItem.id}`}>{gearItem.name}</label>
                                    </div>
                                ))}
                            </div>
                        ))
                }


                <button id="addGearSetBtn">{gearSetId ? "Save" : "Add"} Gear Set</button>
                {gearSetId && <button id="deleteGearSetBtn" onClick={handleDelete}>Delete Gear Set</button>}
            </form>
        </div>
    </>
    );
}

export default AddOrEditGearSet;
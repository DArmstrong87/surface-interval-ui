import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../../api/APIService';

interface GearItem {
    id: number;
    gear_type: {
        name: string;
    };
    custom_gear_type: {
        name: string;
    } | null;
    name: string;
    dives_since_last_service: number;
    days_since_last_service: number;
    due_for_service_days: number;
    due_for_service_dives: number;
}

interface GearSet {
    id: number;
    name: string;
    weight: number;
    gear_items: GearItem[];
}

function Gear() {

    const navigate = useNavigate();
    const [gearSets, setGearSets] = useState<GearSet[]>([])
    const [gearItems, setGearItems] = useState<GearItem[]>([])


    useEffect(() => {
        APIService.fetchData("/gear-sets")
            .then(gearSets => setGearSets(gearSets))
        APIService.fetchData("/gear-items")
            .then(gearItems => setGearItems(gearItems))
    }, [])

    // function gearSetList(gearSets: GearSet[]) {
    //     return gearSets.map((gearSet, index) =>
    //         <tr key={index}>
    //             <td key={`${index}-id`}>{gearSet.id}</td>
    //             <td key={`${index}-name`}>{gearSet.name}</td>
    //             <td key={`${index}-weight`}>{gearSet.weight}</td>
    //         </tr>
    //     )
    // }

    function gearSetCards(gearSets: GearSet[]) {
        return gearSets.map((gearSet, index) =>
            <div key={`${index}-gear-set-card`}>
                <h2>{gearSet.name}</h2>
                <div key={`${index}-gear-card-div`}>
                    <h3>Gear List</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>Item</td>
                                <td>Type</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                gearSet.gear_items.map((gearItem, index) =>
                                    <tr key={`${index}-gear-item-table-row`}>
                                        <td>
                                            {gearItem.name}
                                        </td>
                                        <td>
                                            {gearItem.gear_type.name}
                                        </td>
                                    </tr>
                                )
                            }
                            <tr key={`${index}-gear-item-weight`}>
                                <td>
                                    Weight: {gearSet.weight}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    function gearItemList(gearItems: GearItem[]) {
        return gearItems.map((gearItem, index) =>
            <tr key={`${index}-gear-items-table-row`}>
                <td>{gearItem.name}</td>
                <td>{gearItem.gear_type.name}</td>
            </tr>
        )
    }

    return (<>
        <h1>Gear</h1>

        <button onClick={() => navigate('./add')}>Add Gear Set</button>

        <div>
            {gearSetCards(gearSets)}
        </div>


        <table>
            <thead>
                <tr>
                    <th>
                        All Gear Items
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>Type</td>
                </tr>
                {gearItemList(gearItems)}
            </tbody>
        </table>
    </>
    );
}

export default Gear;

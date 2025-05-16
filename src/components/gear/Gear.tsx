import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIService from '../../api/APIService';
import { GearItem, GearSet } from '../../interfaces';


function Gear() {

    const navigate = useNavigate();
    const [gearSets, setGearSets] = useState<GearSet[]>([])
    const [gearItems, setGearItems] = useState<GearItem[]>([])


    useEffect(() => {
        const fetchData = async () => {
            const [gearSets, gearItems] = await Promise.all([
                APIService.fetchData("/gear-sets"),
                APIService.fetchData("/gear-items")
            ])
            setGearSets(gearSets)
            setGearItems(gearItems)
        }
        fetchData()
    }, [])

    function gearSetCards(gearSets: GearSet[]) {

        return gearSets.map((gearSet, index) =>
            <div key={`${index}-gear-set-card`}>
                <h2 onClick={() => navigate(`/gear/gear-set/${gearSet.id}`)}>{gearSet.name}</h2>
                <div key={`${index}-gear-card-div`}>
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
                                    <tr key={`${index}-gear-item-table-row`} onClick={() => navigate(`/gear/${gearItem.id}`)}>
                                        <td>
                                            {gearItem?.name}
                                        </td>
                                        <td>
                                            {gearItem?.gear_type?.name}
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
            <tr key={`${index}-gear-items-table-row`} onClick={() => navigate(`/gear/${gearItem.id}`)}>
                <td>{gearItem.name}</td>
                {/* Look for gear type or custom gear type name, else "Unknown" */}
                <td>{gearItem.gear_type?.name || gearItem.custom_gear_type?.name || "Unknown Type"}</td>
            </tr>
        )
    }

    return (<>
        <h1>Gear</h1>

        <button onClick={() => navigate('./add')}>Add Gear</button>
        {gearItems.length > 0 && <button onClick={() => navigate('./add-gear-set')}>Add Gear Set</button>}

        <div>
            {gearSetCards(gearSets)}
        </div>

        <hr />

        {gearItems && gearItems.length > 0 &&
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
        }
        {gearItems && gearItems.length === 0 &&
            <p>No gear items created.</p>
        }
    </>
    );
}

export default Gear;

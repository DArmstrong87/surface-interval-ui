import React, { useState, useEffect } from "react";
import APIService from "../../api/APIService";
import { GearItem, GearItemServiceInterval } from "../../interfaces";
import { useParams } from "react-router-dom";


function GearItemDetail() {
    const { gearItemId } = useParams();
    const [gearItem, setGearItem] = useState<GearItem | null>(null);
    const [gearItemServiceInterval, setGearItemServiceInterval] = useState<GearItemServiceInterval | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        APIService.fetchData(`/gear-items/${gearItemId}`)
            .then(gearItem => setGearItem(gearItem))
            .catch(error => {
                console.warn("Error fetching gear item:", error);
                setGearItem(null);
            });

        APIService.fetchData(`/gear-item-service-intervals/${gearItemId}`)
            .then(gearItemServiceInterval => setGearItemServiceInterval(gearItemServiceInterval))
            .catch(error => {
                console.warn("Error fetching gear item service interval:", error);
                setGearItemServiceInterval(null);
            })
            .finally(() => setIsLoading(false));
    }, [gearItemId]);

    return <>
        {isLoading && <p>Loading...</p>}

        {!isLoading && gearItem &&
            <div>
                <h1>Gear Item Detail</h1>
                <h2>{gearItem.name}</h2>
                <p>Type: {gearItem.gear_type.name || gearItem.custom_gear_type?.name || "Unknown Type"}</p>

                {gearItem.service_tracking && gearItemServiceInterval && <>
                    <h3>Service Tracking</h3>
                    <p>Purchase Date: {gearItemServiceInterval.purchase_date}</p>

                    {gearItem.days_since_last_service > 0 ?
                        <p>This item is overdue for service by {gearItem.days_since_last_service} days</p>
                        :
                        <p>Days until next service: {gearItem.due_for_service_days}</p>
                    }

                    {gearItem.dives_since_last_service > 0 ?
                        <p>This item is overdue for service by {gearItem.dives_since_last_service} dives</p>
                        :
                        <p>Dives until next service: {Math.abs(gearItem.due_for_service_dives)}</p>
                    }
                </>}
            </div>
        }

        {!isLoading && !gearItem &&
            <p>No gear item found.</p>
        }
    </>
}

export default GearItemDetail;
export interface Dive {
    id: number;
    date: string;
    gear_set: any;
    location: string;
    site: string;
    water: string;
    depth: number;
    time: number;
    description: string;
    start_pressure: number;
    end_pressure: number;
    tank_vol: number;
    air_consumption: number;
    favorite: boolean;
    dive_number: number;
}

export interface GearType {
    id: number;
    name: string;
}

export interface CustomGearType {
    id: number;
    name: string;
    diver: {
        id: number;
        name: string;
    };
}

export interface GearItem {
    id: number;
    gear_type: {
        id: number;
        name: string;
    };
    custom_gear_type: {
        id: number;
        name: string;
    } | null;
    name: string;
    service_tracking: boolean;
    dives_since_last_service: number;
    days_since_last_service: number;
    due_for_service_days: number;
    due_for_service_dives: number;
}

export interface GearSet {
    id: number;
    name: string;
    weight: number;
    gear_items: GearItem[];
}

export interface GearItemService {
    purchaseDate: string;
    serviceDate: string;
    diveInterval: number;
    dayInterval: number;
}

export interface GearItemServiceInterval {
    id: number;
    gear_item: GearItem;
    purchase_date: string;
    dive_interval: number;
    day_interval: number;
}

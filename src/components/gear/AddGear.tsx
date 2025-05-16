import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIService from "../../api/APIService";
import { GearType, CustomGearType, GearItemService } from "../../interfaces";

interface NewGearItemFormState {
	gearTypeId: number | null;
	customGearTypeId: number | null;
	newCustomGearType: string;
	name: string;
}

const newGearItemInitial: NewGearItemFormState = {
	gearTypeId: null,
	customGearTypeId: null,
	newCustomGearType: "",
	name: "",
};

const newGearItemServiceInitial: GearItemService = {
	purchaseDate: "",
	serviceDate: "",
	diveInterval: 0,
	dayInterval: 0,
};

function AddGear() {
	const navigate = useNavigate();
	const [gearTypes, setGearTypes] = useState<GearType[]>([]);
	const [customGearTypes, setCustomGearTypes] = useState<CustomGearType[]>([]);
	const [trackService, setTrackService] = useState(false);
	const [newGearItemFormState, setNewGearItemForm] = useState<NewGearItemFormState>(newGearItemInitial);
	const [newGearItemServiceState, setNewGearItemService] = useState<GearItemService>(newGearItemServiceInitial);
	const [gearTypeError, setGearTypeError] = useState(false);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const [gearTypes, customGearTypes] = await Promise.all([
			APIService.fetchData("/gear-types"),
			APIService.fetchData("/custom-gear-types"),
		]);
		setGearTypes(gearTypes);
		setCustomGearTypes(customGearTypes);
	};

	const postGearItem = async (formData: NewGearItemFormState): Promise<number | null> => {
		try {
			const createdGearItem = await APIService.sendData("/gear-items", formData);
			return createdGearItem.id;
		} catch (error) {
			console.error("Error creating gear item:", error);
			return null;
		}
	};

	const postGearItemServiceInterval = async (gearItemId: number) => {
		try {
			const data = { ...newGearItemServiceState, gearItemId: gearItemId };
			await APIService.sendData("/gear-item-service-interval", data);
		} catch (error) {
			console.error("Error creating service interval:", error);
		}
	};

	const postGearItemService = async (gearItemId: number, serviceDate: string) => {
		try {
			const data = {
				gearItemId: gearItemId,
				serviceDate: serviceDate,
			};
			await APIService.sendData("/gear-item-service", data);
		} catch (error) {
			console.error("Error creating service record:", error);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const formIsValid = validateFormData(newGearItemFormState);
		debugger;
		if (!formIsValid) {
			return;
		}

		try {
			const createdGearItemId = await postGearItem(newGearItemFormState);

			if (trackService && createdGearItemId) {
				await postGearItemServiceInterval(createdGearItemId);

				const serviceDate = newGearItemServiceState.serviceDate;
				if (serviceDate && serviceDate !== "") {
					await postGearItemService(createdGearItemId, serviceDate);
				}
			}
			navigate(`/gear/${createdGearItemId}`);
		} catch (error) {
			console.error("Error submitting gear item:", error);
			alert("Error submitting gear item");
		}
	};

	const validateFormData = (newGearItemFormState: NewGearItemFormState): boolean => {
		const gearTypes = [
			newGearItemFormState.customGearTypeId,
			newGearItemFormState.gearTypeId,
			newGearItemFormState.newCustomGearType,
		];
		const onlyOne =
			(gearTypes.filter((item) => item === null).length === 1 && newGearItemFormState.newCustomGearType === "") ||
			(gearTypes.filter((item) => item === null).length === 2 && newGearItemFormState.newCustomGearType !== "");
		if (!onlyOne) {
			setGearTypeError(true);
		}
		return onlyOne;
	};

	const today = new Date().toISOString().split("T")[0];

	const handleTrackServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		setTrackService(isChecked);
	};

	const handleGearTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedGearType = e.target.value;
		const custom = e.target.name === "customGearType";
		let updatedNewGearItemFormState = null;

		if (custom) {
			updatedNewGearItemFormState = {
				...newGearItemFormState,
				customGearTypeId: parseInt(selectedGearType),
				gearTypeId: null,
			};
		} else {
			updatedNewGearItemFormState = {
				...newGearItemFormState,
				gearTypeId: parseInt(selectedGearType),
				customGearTypeId: null,
			};
		}

		setNewGearItemForm(updatedNewGearItemFormState);
		setGearTypeError(false);
		console.log("Selected gear type:", selectedGearType);
		console.log("New gear item form state:", updatedNewGearItemFormState);
	};

	const handleNewCustomGearTypeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedGearType = e.target.value;
		const updatedNewGearItemFormState = {
			...newGearItemFormState,
			newCustomGearType: selectedGearType,
			gearTypeId: null,
			customGearTypeId: null,
		};
		setNewGearItemForm(updatedNewGearItemFormState);
		setGearTypeError(false);
		console.log("Selected gear type:", selectedGearType);
		console.log("New gear item form state:", updatedNewGearItemFormState);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const updatedNewGearItemFormState = { ...newGearItemFormState, name: e.target.value };
		setNewGearItemForm(updatedNewGearItemFormState);
		setGearTypeError(false);
		console.log("New gear item form state:", updatedNewGearItemFormState);
	};

	const handleDateInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		const updatedNewGearItemServiceState = { ...newGearItemServiceState, [name]: value };
		setNewGearItemService(updatedNewGearItemServiceState);
		console.log("New gear item service state:", updatedNewGearItemServiceState);
	};

	const handleNumberInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = parseInt(e.target.value);
		const updatedNewGearItemServiceState = { ...newGearItemServiceState, [name]: value };
		setNewGearItemService(updatedNewGearItemServiceState);
		console.log("New gear item service state:", updatedNewGearItemServiceState);
	};

	return (
		<>
			<div>
				<h1>Add Gear</h1>
				<form onSubmit={handleSubmit}>
					{gearTypeError && (
						<>
							<div style={{ color: "red" }}>Select 1 of gear type, custom gear type or add a new custom gear type.</div>
						</>
					)}
					<label htmlFor="gearType">Gear Type: </label>
					<select
						id="gearType"
						name="gearType"
						onChange={handleGearTypeChange}
						value={newGearItemFormState.gearTypeId || ""}
					>
						<option value="">Select Gear Type</option>
						{gearTypes.map((gearType) => (
							<option key={gearType.id} value={gearType.id}>
								{gearType.name}
							</option>
						))}
					</select>
					<br />
					{customGearTypes.length > 0 && (
						<>
							<label htmlFor="customGearType">Custom Gear Type: </label>
							<select
								id="customGearType"
								name="customGearType"
								onChange={handleGearTypeChange}
								value={newGearItemFormState.customGearTypeId || ""}
							>
								<option value="">Select Custom Gear Type</option>
								{customGearTypes.map((customGearType) => (
									<option key={customGearType.id} value={customGearType.id}>
										{customGearType.name}
									</option>
								))}
							</select>
						</>
					)}
					<br />
					<label htmlFor="newCustomGearType">Add Custom Gear Type: </label>
					<input
						type="text"
						id="newCustomGearType"
						name="newCustomGearType"
						onInput={handleNewCustomGearTypeInput}
						value={newGearItemFormState.newCustomGearType || ""}
					/>
					<br />
					<label htmlFor="name">Name: </label>
					<input type="text" id="name" name="name" required value={newGearItemFormState.name} onInput={handleInput} />
					<br />
					<label htmlFor="trackService">Track Service: </label>
					<input type="checkbox" id="trackService" name="trackService" onChange={handleTrackServiceChange} />
					<br />
					{trackService && (
						<>
							<hr />
							<h2>Service Tracking</h2>
							<label htmlFor="purchaseDate">Purchase Date: </label>
							<input
								type="date"
								id="purchaseDate"
								required
								max={today}
								name="purchaseDate"
								value={newGearItemServiceState.purchaseDate}
								onChange={handleDateInputs}
							/>
							<br />
							<label htmlFor="serviceDate">Last Serviced (optional): </label>
							<input
								type="date"
								id="serviceDate"
								max={today}
								name="serviceDate"
								value={newGearItemServiceState.serviceDate}
								onChange={handleDateInputs}
							/>
							<br />
							<label htmlFor="diveInterval">Dives before next service: </label>
							<input
								type="number"
								id="diveInterval"
								required
								name="diveInterval"
								value={newGearItemServiceState.diveInterval}
								onInput={handleNumberInputs}
							/>
							<br />
							<label htmlFor="dayInterval">Days before next service: </label>
							<input
								type="number"
								id="dayInterval"
								required
								name="dayInterval"
								value={newGearItemServiceState.dayInterval}
								onInput={handleNumberInputs}
							/>
							<br />
						</>
					)}
					<button id="addGearBtn">Add Gear</button>
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

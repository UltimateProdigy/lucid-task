import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import useStore from "../store";
import fetchSuggestions from "../api";
import { getRandomColor } from "../utils";

const FormulaInput = () => {
	const { formula, addTag, removeTag, updateTag, setFormula } = useStore(
		(state) => state
	);
	const [inputValue, setInputValue] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// fetching the autocomplete suggestions
	const { data: suggestions = [] } = useQuery({
		queryKey: ["suggestions", inputValue],
		queryFn: async () => {
			try {
				const response = await fetchSuggestions({ query: inputValue });
				return response.map((item: any) => item.name);
			} catch (error) {
				console.error("Error fetching suggestions:", error);
				return [];
			}
		},
		enabled: !!inputValue,
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setInputValue(value);
		setShowSuggestions(true);
	};

	const handleAddTag = (tag: string) => {
		const randomColor = getRandomColor();
		addTag(tag, randomColor);
		setInputValue("");
		setShowSuggestions(false);
		inputRef.current?.focus();
	};

	// handling adding a number or operand
	const handleAddNumberOrOperand = (value: string) => {
		setFormula([...formula, { type: "number", value }]);
		setInputValue("");
		inputRef.current?.focus();
	};

	// use of backspace to remove the last tag
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace" && inputValue === "" && formula.length > 0) {
			removeTag(formula.length - 1);
		}
	};

	const handleEditTag = (index: number, newValue: string) => {
		updateTag(index, newValue);
	};

	const renderInputContent = () => {
		return (
			<div
				className="input-container"
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "4px",
					alignItems: "center",
				}}
			>
				{formula.map((item, index) => (
					<React.Fragment key={index}>
						{item.type === "tag" ? (
							<Menu
								as="div"
								style={{
									position: "relative",
									display: "inline-block",
								}}
							>
								<Menu.Button
									style={{
										backgroundColor: item.color,
										border: "1px solid #CBD5E0",
										borderRadius: "4px",
										padding: "2px 6px",
										marginRight: "4px",
										cursor: "pointer",
									}}
								>
									{item.value}
								</Menu.Button>
								<Transition
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items
										style={{
											position: "absolute",
											backgroundColor: "white",
											border: "1px solid #CBD5E0",
											borderRadius: "4px",
											boxShadow:
												"0px 2px 4px rgba(0, 0, 0, 0.1)",
											zIndex: 10,
											minWidth: "120px",
										}}
									>
										<Menu.Item>
											{({ active }) => (
												<button
													onClick={() =>
														handleEditTag(
															index,
															prompt(
																"Edit tag",
																item.value
															) || item.value
														)
													}
													style={{
														width: "100%",
														textAlign: "left",
														padding: "4px 8px",
														backgroundColor: active
															? "#F7FAFC"
															: "transparent",
													}}
												>
													Edit
												</button>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													onClick={() =>
														removeTag(index)
													}
													style={{
														width: "100%",
														textAlign: "left",
														padding: "4px 8px",
														backgroundColor: active
															? "#F7FAFC"
															: "transparent",
													}}
												>
													Remove
												</button>
											)}
										</Menu.Item>
									</Menu.Items>
								</Transition>
							</Menu>
						) : (
							<span>{item.value}</span>
						)}
					</React.Fragment>
				))}
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					ref={inputRef}
					placeholder="Type a formula..."
					style={{
						flex: 1,
						border: "none",
						outline: "none",
						minWidth: "50px",
					}}
				/>
			</div>
		);
	};

	// handling adding of numbers or operands
	useEffect(() => {
		const operands = ["+", "-", "*", "/", "(", ")", "^"];
		if (inputValue && operands.includes(inputValue)) {
			handleAddNumberOrOperand(inputValue);
		} else if (!isNaN(Number(inputValue))) {
			handleAddNumberOrOperand(inputValue);
		}
	}, [inputValue]);

	return (
		<div
			style={{
				border: "1px solid #CBD5E0",
				borderRadius: "4px",
				padding: "8px",
			}}
		>
			{renderInputContent()}
			{showSuggestions && suggestions.length > 0 && (
				<div
					className="suggestions"
					style={{
						marginTop: "8px",
						border: "1px solid #CBD5E0",
						borderRadius: "4px",
						maxHeight: "150px",
						overflowY: "auto",
					}}
				>
					{suggestions
						.filter((suggestion: string) =>
							suggestion
								.toLowerCase()
								.includes(inputValue.toLowerCase())
						)
						.map((suggestion: string, index: number) => (
							<div
								key={index}
								onClick={() => handleAddTag(suggestion)}
								style={{
									padding: "4px 8px",
									cursor: "pointer",
								}}
							>
								{suggestion}
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default FormulaInput;

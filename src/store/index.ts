import { create } from "zustand";

type FormulaItem = {
	type: "tag" | "operand" | "number";
	value: string;
    color?: string;
};

type FormulaStore = {
	formula: FormulaItem[];
	setFormula: (formula: FormulaItem[]) => void;
	addTag: (tag: string, color: string) => void;
	removeTag: (index: number) => void;
	updateTag: (index: number, newValue: string) => void;
};

const useStore = create<FormulaStore>((set) => ({
	formula: [],
	setFormula: (formula) => set({ formula }),
	addTag: (tag, color) =>
		set((state) => ({
			formula: [...state.formula, { type: "tag", value: tag, color: color }],
		})),
	removeTag: (index) =>
		set((state) => ({
			formula: state.formula.filter((_, i) => i !== index),
		})),
	updateTag: (index, newValue) =>
		set((state) => ({
			formula: state.formula.map((item, i) =>
				i === index ? { ...item, value: newValue } : item
			),
		})),
}));

export default useStore;

interface fetchProps {
	query: string;
}
const fetchSuggestions = async (query: fetchProps) => {
	try {
		const response = await fetch(
			`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?search=${query}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch suggestions");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching suggestions:", error);
		return [];
	}
};

export default fetchSuggestions;

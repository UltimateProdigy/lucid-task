export const getRandomColor = () => {
	const colors = [
		"#FFCC99",
		"#FF9999",
		"#99CCFF",
		"#99FF99",
		"#FF99CC",
		"#CC99FF",
		"#FFFF99",
	];
	return colors[Math.floor(Math.random() * colors.length)];
};

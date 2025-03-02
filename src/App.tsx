import FormulaInput from "./components/formula-input";

function App() {
	return (
		<div className="min-h-screen bg-black flex justify-center items-center p-6">
			<div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						Formula Input
					</h1>
					<p className="text-gray-600 mt-2">
						Lucid Financials Task - Hybrid Input with Autocomplete
					</p>
				</div>

				<div className="bg-gray-100 p-6 rounded-lg shadow-inner">
					<FormulaInput />
				</div>

				<div className="text-center mt-8 text-sm text-gray-500">
					<p>
						Built with ❤️ by{" "}
						<a
							href="https://github.com/UltimateProdigy"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							Akinola Ayobami
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;

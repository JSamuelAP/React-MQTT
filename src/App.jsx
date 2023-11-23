import Header from "./components/Header";
import Camara from "./components/Camara";
import Botones from "./components/Botones";
import "./App.css";

function App() {
	return (
		<>
			<Header />
			<main>
				<Botones />
				<Camara />
			</main>
		</>
	);
}

export default App;

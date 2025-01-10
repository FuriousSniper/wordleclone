import "./App.less";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import ScorePage from "./pages/ScorePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<MainPage />} />
				<Route path="/" element={<MainPage />} />
				<Route path="/game" element={<GamePage />} />
				<Route path="/scores" element={<ScorePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

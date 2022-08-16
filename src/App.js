import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Interviews from "./Pages/Interviews";
import Interview from "./Pages/Interview";
import AddInterview from "./Pages/AddInterview";
import NotFound from "./Pages/NotFound";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/interviews" element={<Interviews />} />
				<Route path="/interview/:id" element={<Interview />} />
				<Route path="/add-interview" element={<AddInterview />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;

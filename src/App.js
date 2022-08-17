import "./Styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Pages/Home";
import Interviews from "./Pages/Interviews";
import Interview from "./Pages/Interview";
import AddInterview from "./Pages/AddInterview";
import NotFound from "./Pages/NotFound";
import Store from "./Store";

const App = () => {
	return (
		<Provider store={Store}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/interviews" element={<Interviews />} />
					<Route path="/interview/:id" element={<Interview />} />
					<Route path="/add-interview" element={<AddInterview />} />
					<Route path="/add-rounds/:interviewId" element={<AddInterview />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;

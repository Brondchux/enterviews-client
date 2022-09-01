import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./Pages/Home";
import Interviews from "./Pages/Interviews";
import Interview from "./Pages/Interview";
import AddInterview from "./Pages/AddInterview";
import NotFound from "./Pages/NotFound";
import Store from "./Store";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Account from "./Pages/Account";

const App = () => {
	return (
		<Provider store={Store}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/interviews" element={<Interviews />} />
					<Route path="/interview/:id" element={<Interview />} />
					<Route path="/add-interview" element={<AddInterview />} />
					<Route path="/add-rounds/:id" element={<AddInterview />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/account" element={<Account />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
			<ToastContainer />
		</Provider>
	);
};

export default App;

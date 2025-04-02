import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserIndex from "./pages/user";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import Login from "./pages/user/authentication/Login";
import Registration from "./pages/user/authentication/Registration";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardUserIndex from "./pages/user/Dashboard/Dashboard";
import DogBreed from "./pages/user/Dashboard/DogBreed";
import Prediction from "./pages/user/Dashboard/Prediction";
import TopDogPrediction from "./pages/user/Dashboard/TopDogPrediction";
import Profile from "./pages/user/Dashboard/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AuthenticationLayout />}>
          <Route path="/" element={<UserIndex />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route path="" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardUserIndex />} />
          <Route path="/edit/profile/:id" element={<Profile />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/dog-breed" element={<DogBreed />} />
          <Route
            path="/top-dog-breed-prediction"
            element={<TopDogPrediction />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

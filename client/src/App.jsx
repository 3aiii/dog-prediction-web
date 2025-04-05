import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserIndex from "./pages/user";
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import Login from "./pages/user/authentication/Login";
import Registration from "./pages/user/authentication/Registration";
import DashboardLayout from "./layouts/DashboardLayout";
import DogBreed from "./pages/user/Dashboard/DogBreed";
import Prediction from "./pages/user/Dashboard/Prediction";
import TopDogPrediction from "./pages/user/Dashboard/TopDogPrediction";
import Profile from "./pages/user/Dashboard/Profile";
import AdminIndex from "./pages/admin/Dashboard/user/Index";
import UsedIndex from "./pages/admin/Dashboard/Used";
import CreateUser from "./pages/admin/Dashboard/user/Create";
import EditUser from "./pages/admin/Dashboard/user/Edit";
import View from "./pages/admin/Dashboard/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserIndex />} />
        <Route path="" element={<AuthenticationLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>
        <Route path="" element={<DashboardLayout />}>
          <Route path="/edit/profile/:id" element={<Profile />} />
          <Route path="/predict" element={<Prediction />} />
          <Route path="/dog-breed" element={<DogBreed />} />
          <Route path="/admin/user" element={<AdminIndex />} />
          <Route path="/admin/user/edit/:id" element={<EditUser />} />
          <Route path="/admin/user/create" element={<CreateUser />} />
          <Route path="/admin/used" element={<UsedIndex />} />
          <Route path="/admin/used/:id" element={<View />} />
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

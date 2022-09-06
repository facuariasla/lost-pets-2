import { Navigate, Route, Routes } from "react-router-dom";
import HeaderOne from "./components/Header";
import EditPet from "./pages/EditPet";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import MyPets from "./pages/MyPets";
import NewPet from "./pages/NewPet";
import PasswordChange from "./pages/PasswordChange";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

function App() {

  return (
    <div className="App">
      <HeaderOne />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/newpet" element={<NewPet />} />
        <Route path="/editpet/:objectID" element={<EditPet />} />
        <Route path="/passwordchange" element={<PasswordChange />} />
        <Route path="*" element={<Navigate replace to ='/'/>} />
      </Routes>
    </div>
  );
}

export default App;

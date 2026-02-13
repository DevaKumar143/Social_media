import { Routes, Route } from "react-router-dom";
import Navbar from '../components/layouts/Navbar'
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Index = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default Index

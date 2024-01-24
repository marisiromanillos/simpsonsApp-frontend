import { useState } from "react";
import Register from "../pages/signUp/register";
import axios from "axios";
const NavBar = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegisterBtn, setShowRegisterBtn] = useState(true);
  const handleRegistration = async (userName, lastName, email, password) => {
    const { data } = await axios.post(
      "https://api.fullstack-simpsons.co.uk/account/register",
      { userName, lastName, email, password }
    );
    console.log(userName, lastName);
    setShowRegister(false);
  };
  const registerBtnHandler = () => {
    setShowRegister(true);
    setShowRegisterBtn(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <p>Home</p>
        <p>Login</p>
        {showRegister && <Register handleRegistration={handleRegistration} />}
        {showRegisterBtn && (
          <button onClick={() => registerBtnHandler()}>Register</button>
        )}
      </div>
    </>
  );
};
export default NavBar;

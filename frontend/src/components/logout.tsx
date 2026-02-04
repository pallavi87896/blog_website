import {useNavigate
 } from "react-router-dom";
 const navigate=useNavigate();
export const Logout=()=>{
    localStorage.removeItem("token");
    navigate("/signin")
}
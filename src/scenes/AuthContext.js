// // AuthContext.js
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userData, setUserData] = useState({
//     company_name: localStorage.getItem("company_name") || "",
//     branch: localStorage.getItem("branch") || "",
//     invtype: localStorage.getItem("invtype") || "",
//   });

//   const login = (data) => {
//     localStorage.setItem("company_name", data.company_name);
//     localStorage.setItem("branch", data.branch);
//     localStorage.setItem("invtype", data.invtype);

//     setUserData(data);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUserData({
//       company_name: "",
//       branch: "",
//       invtype: "",
//     });
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// // CompanyContext.js

// import React, { createContext, useContext, useState } from "react";

// const CompanyContext = createContext();

// export const CompanyProvider = ({ children }) => {
//   const [companyName, setCompanyName] = useState("");

//   const updateCompanyName = (newCompanyName) => {
//     setCompanyName(newCompanyName);
//   };

//   // Add a function to clear the company name
//   const clearCompanyName = () => {
//     setCompanyName("");
//   };

//   return (
//     <CompanyContext.Provider
//       value={{
//         companyName,
//         updateCompanyName,
//         clearCompanyName,
//       }}
//     >
//       {children}
//     </CompanyContext.Provider>
//   );
// };

// export const useCompany = () => {
//   const context = useContext(CompanyContext);
//   if (!context) {
//     throw new Error("useCompany must be used within a CompanyProvider");
//   }
//   return context;
// };

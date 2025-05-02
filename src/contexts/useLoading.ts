// import { useState, useEffect } from "react";
// import Preloading from "./Preloading"; // Correct import for Preloading component

// // Custom hook to handle loading state and return Preloading when loading
// export const useLoading = (delay: number = 2000): JSX.Element | null => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setLoading(false); // Set loading to false after the specified delay
//     }, delay);

//     return () => clearTimeout(timeout);
//   }, [delay]);

//   return loading ? <Preloading /> : null;
// };

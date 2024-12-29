import { createContext } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const calculateAge = (dob) => {
    const today = new Date()
    const birthDate = new Date(dob)
     
    let age = today.getFullYear() - birthDate.getFullYear()
 return age
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", " Oct", "Nov", "Dec"]
    const slotDateFormat = (slotDate) => {
     // Split the slotDate string into day, month, and year
     const [day, month, year] = slotDate.split("_");
   
     // Convert the month to the appropriate month name from the `months` array
     const formattedMonth = months[Number(month) - 1];
   
     // Return the formatted date
     return `${day} ${formattedMonth} ${year}`;
   };
   

    const value = {
        calculateAge,
        slotDateFormat
    }
     return (
         <AppContext.Provider value={value}>
             {props.children}
         </AppContext.Provider>
     )
}

export default AppContextProvider;
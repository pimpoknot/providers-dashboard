import axios from "axios";
import { useEffect, useState } from "react";
import { options } from "../../services/api";


export const CitiesPages = () => {
    const [cities, setCities] = useState();
    
    useEffect(() => {
         axios.request(options).then(function (response) {
            setCities(response.data)
         }).catch(function (error) {
             console.error(error);
         });
    },[])

    console.log(cities)
    
    return (
        <p>2</p>
    )
}
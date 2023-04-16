import client from "../api";
import { useEffect, useState } from "react";

// custom hook
export default function useFetch(query) {
    const [getData, setData] = useState({apiData: undefined})

    useEffect(() => {

        const fetchData = async () => {
            try {                
                const { data } = await client(`/reports/report/${query}`);
                setData({ apiData: data });

            } catch (error) {
                console.log("Error...");
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}

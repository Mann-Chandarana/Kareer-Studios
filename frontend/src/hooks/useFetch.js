import client from "../api";
import { useEffect, useState } from "react";

// custom hook
export default function useFetch(id) {
  const [getData, setData] = useState({ apiData: undefined });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client(`/reports/report/${id}`);
        console.log(data);
        setData({apiData: data});
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return [getData, setData];
}

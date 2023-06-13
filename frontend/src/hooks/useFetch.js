import client from "../api";
import { useEffect, useState } from "react";

// custom hook
export default function useFetch(id, type) {
  const [getData, setData] = useState({ apiData: undefined });

  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (type) {
          case "report":
            const { report } = await client(`/reports/report/${id}`);
            setData({ apiData: report });
            break;

          case "academic":
            const { academic } = await client(`/records/academic/${id}`);
            setData({ apiData: academic });
            break;

          case "ielts":
            const { ielts } = await client(`/records/ielts/${id}`);
            setData({ apiData: ielts });
            break;

          case "pte":
            const { pte } = await client(`/records/pte/${id}`);
            setData({ apiData: pte });
            break;

          case "gre":
            const { gre } = await client(`/records/gre/${id}`);
            setData({ apiData: gre });
            break;

          case "sat":
            const { sat } = await client(`/records/sat/${id}`);
            setData({ apiData: sat });
            break;

          case "gmat":
            const { gmat } = await client(`/records/gmat/${id}`);
            setData({ apiData: gmat });
            break;

          default:
            throw new Error("Invalid type.");
        }
      } catch (error) {
        console.log("Error...");
      }
    };
    fetchData();
  }, [id]);

  return [getData, setData];
}

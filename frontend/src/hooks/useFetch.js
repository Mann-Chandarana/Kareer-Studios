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
            const { data: reportData } = await client(`/reports/report/${id}`);            
            setData({ apiData: reportData });
            break;

          case "academic":
            const { data: academicData } = await client(`/records/academic/${id}`);
            console.log(academicData);
            setData({ apiData: academicData });
            break;

          case "ielts":
            const { data: ieltsData } = await client(`/records/ielts/${id}`);
            console.log(ieltsData);
            setData({ apiData: ieltsData });
            break;

          case "pte":
            const { data: pteData } = await client(`/records/pte/${id}`);
            setData({ apiData: pteData });
            break;

          case "gre":
            const { data: greData } = await client(`/records/gre/${id}`);
            setData({ apiData: greData });
            break;

          case "sat":
            const { data: satData } = await client(`/records/sat/${id}`);
            setData({ apiData: satData });
            break;

          case "gmat":
            const { data: gmatData } = await client(`/records/gmat/${id}`);
            setData({ apiData: gmatData });
            break;

          default:
            throw new Error("Invalid type.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, type]);

  return [getData, setData];
}

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import useFetch from "../../../hooks/useFetch";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function TPchart(props) {
  console.log(props.id);

  // get report
  let flag = false;
  const [{ apiData }] = useFetch(props.id, 'report');
  if (apiData) {
    flag = true;
  }

  const tp_right = apiData?.rows?.[0]?.tp_right;
  console.log(tp_right);
  const tp_left = apiData?.rows?.[0]?.tp_left;

  const right = String(tp_right).split(" + ");
  const tpr_val = right[0];
  const tpr_count = right[1];
  console.log(tpr_val);
  console.log(tpr_count);

  const left = String(tp_left).split(" + ");
  const tpl_val = left[0];
  const tpl_count = left[1];
  console.log(tpl_val);
  console.log(tpl_count);

  const data = {
    labels: ["Right", "Left"],
    datasets: [
      {
        label: "",
        data: [tpr_val, tpl_val],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 0.75,
      },
    ],
  };

  return (
    <div className="App" style={{ width: "300px", height: "300px" }}>
      <Doughnut data={data} />
    </div>
  );
}
export default TPchart;

import styles from "./PieChart.module.css";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  // ChartDataLabels
);

const PieChart = ({ pieChartData }: { pieChartData: { openTickets: number, closeTickets: number, cancelTickets: number } }) => {

  // const overAllTickets = pieChartData.openTickets + pieChartData.closeTickets + pieChartData.cancelTickets

  const data = {
    labels: ["Open Tickets", "Closed Tickets", "Cancelled Tickets"],
    datasets: [{
      data: [pieChartData.openTickets, pieChartData.closeTickets, pieChartData.cancelTickets],
      backgroundColor: [
        "#8280FF",
        "#4AD991",
        "#FF9066"
      ],
      hoverBackgroundColor: [
        "#8280FF",
        "#4AD991",
        "#FF9066"
      ]
    }]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as 'top',
        labels: {
          boxWidth: 10,
          fontStyle: 'bold',
        },
      },
      // title: {
      //   display: true,
      //   text: 'Overall tickets',
      // },
      // datalabels: {
      //   formatter: (value, context) => {
      //     const total = context.dataset.data.reduce((acc: number, val: number) => acc + val, 0);
      //     const percentage = ((value / total) * 100).toFixed(1);
      //     return `${percentage}%`;
      //   },
      //   color: "#fff",
      //   font: {
      //     size: 16,
      //     weight: "bold",
      //   },
      //   anchor: "center",
      //   align: "center",
      // },
    },
  }

  return (
    <div className={styles.pieChart_containerr}>
      <div className={styles.pieChart_heading}>Overall tickets</div>
      <Pie data={data} options={options} />
    </div>
  )
}

export default PieChart
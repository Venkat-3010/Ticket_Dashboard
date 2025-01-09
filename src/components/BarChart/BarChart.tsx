import styles from "./BarChart.module.css";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const BarChart = ({ BarChartData }) => {
  return (
    <div className={styles.barChart_container}>
        
    </div>
  )
}

export default BarChart
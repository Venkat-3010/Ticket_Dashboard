import styles from "./LineChart.module.css";
import { Line } from "react-chartjs-2";
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
import { useEffect, useState } from "react";

ChartJS.register(
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

interface ChartData {
    month: string;
    year: number;
    openTickets: number;
    closeTickets: number;
}

const LineChart = ({ lineChartData = [] }: { lineChartData: ChartData[] }) => {
    const [visibleData, setVisibleData] = useState<ChartData[]>([]);

    const totalData = lineChartData || []; 
    const windowSize = 6; 
    const scrollSpeed = 2000; 

    useEffect(() => {
        if (!totalData.length) return;

        let startIndex = 0;

        setVisibleData(totalData.slice(startIndex, startIndex + windowSize));

        const interval = setInterval(() => {
            startIndex = (startIndex + 1) % totalData.length; 

            const newVisibleData = [
                ...totalData.slice(startIndex, startIndex + windowSize),
                ...totalData.slice(0, Math.max(0, startIndex + windowSize - totalData.length)),
            ];

            setVisibleData(newVisibleData);
        }, scrollSpeed);

        return () => clearInterval(interval);
    }, [totalData]);

    const months = visibleData?.map(item => item?.month + " " + item?.year);
    const openTickets = visibleData?.map(item => item?.openTickets);
    const closedTickets = visibleData?.map(item => item?.closeTickets);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Open Tickets',
                data: openTickets,
                backgroundColor: '#8280FF',
                borderColor: '#8280FF',
                borderWidth: 1,
            },
            {
                label: 'Closed Tickets',
                data: closedTickets,
                backgroundColor: '#FF9066',
                borderColor: '#FF9066',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as 'top',
            },
            title: {
                display: true,
                text: 'Open & close tickets based on month',
            }
        }
    }
    return (
        <div className={styles.lineChart_container}>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart
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
    const [yaxisMax, setYaxisMax] = useState<number>();
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

    useEffect(() => {
        const maxTickets = Math.max(...lineChartData?.map(item => Math.max(item.openTickets, item.closeTickets)));
        setYaxisMax(maxTickets);
    }, [lineChartData])

    const months = visibleData?.map(item => item?.month + " " + item?.year);
    const openTickets = visibleData?.map(item => item?.openTickets);
    const closedTickets = visibleData?.map(item => item?.closeTickets);

    const data = {
        labels: months,
        datasets: [
            {
                label: 'Tickets Opened',
                data: openTickets,
                backgroundColor: '#8280FF',
                borderColor: '#8280FF',
                tension: 0.4,
                borderWidth: 1,
            },
            {
                label: 'Tickets Closed',
                data: closedTickets,
                backgroundColor: '#FF9066',
                borderColor: '#FF9066',
                tension: 0.4,
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as 'top',
                labels: {
                    boxWidth: 10,
                    fontStyle: 'bold',
                }
            },
            // title: {
            //     display: true,
            //     text: 'Open & close tickets based on month',
            // },
        },
        scales: {
            x: {
                ticks: {
                    color: "#848A9C",
                    font: {
                        size: 12
                    }
                },
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#848A9C",
                    font: {
                        size: 12
                    }
                },
                grid: {
                    display: false
                },
                suggestedMax: `${yaxisMax}`
            }
        }
    }
    return (
        <div className={styles.lineChart_container}>
        <div className={styles.lineChart_heading}>Open & close tickets based on month</div>
            <Line data={data} options={options} />
        </div>
    )
}

export default LineChart
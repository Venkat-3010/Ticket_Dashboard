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
  scales,
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
  scales,
);

interface BarChartData {
  employeeName: string;
  openTickets: number;
  closeTickets: number;
  cancelTickets: number;
}

const BarChart = ({ barChartData }: { barChartData: BarChartData[] }) => {
  const [visibleData, setVisibleData] = useState<BarChartData[]>([]);
  const [yaxisMax, setYaxisMax] = useState<number>();
  const totalData = barChartData || [];
  const windowSize = 6;
  const scrollSpeed = 2000;

  useEffect(() => {
    if (!totalData.length) return;

    let startIndex = 0;

    const interval = setInterval(() => {
      const newData = totalData.slice(startIndex, startIndex + windowSize);
      if (startIndex + windowSize > totalData.length) {
        newData.push(...totalData.slice(0, (startIndex + windowSize) % totalData.length));
      }
      setVisibleData(newData);
      startIndex = (startIndex + 1) % totalData.length;
    }, scrollSpeed);

    return () => clearInterval(interval);
  }, [totalData]);

  useEffect(() => {
    let max = Math.max(...barChartData?.map(item => Math.max(item.openTickets, item.closeTickets, item.cancelTickets)));
    setYaxisMax(max);
  }, [barChartData])

  const data = {
    labels: visibleData.map(item => item.employeeName),
    datasets: [
      {
        label: "Tickets Opened",
        data: visibleData.map(item => item.openTickets),
        backgroundColor: "#8280FF",
        borderColor: "#8280FF",
        borderWidth: 1,
      },
      {
        label: "Tickets Closed",
        data: visibleData.map(item => item.closeTickets),
        backgroundColor: "#4AD991",
        borderColor: "#4AD991",
        borderWidth: 1,
      },
      {
        label: "Tickets Cancelled",
        data: visibleData.map(item => item.cancelTickets),
        backgroundColor: "#FF9066",
        borderColor: "#FF9066",
        borderWidth: 1,
      },
    ],
  };


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
      //   display: true,
      //   text: 'Tickets based on user',
      // },
    },
    scales: {
      x: {
        ticks: {
          color: '#848A9C',
          font: {
            size: 10,
          },
          callback: function (value: any): string[] {
            const label = data.labels[value];
            return label?.split(' ')?.reduce((lines, word) => {
              const lastLine = lines[lines.length - 1] || '';
              if ((lastLine + word).length > 10) {
                lines.push(word);
              } else {
                lines[lines.length - 1] = `${lastLine} ${word}`.trim();
              }
              return lines;
            }, ['']);
          },
        },
      },
      y: {
        ticks: {
          color: '#848A9C',
          font: {
            size: 10,
          },
        },
        grid: {
          display: true,
          drawBorder: false,
        },
        suggestedMax: `${yaxisMax}`
      }
    },
  };
  
  return (
    <div className={styles.barChart_container}>
    <div className={styles.barChart_heading}>Tickets based on controllers</div>
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart
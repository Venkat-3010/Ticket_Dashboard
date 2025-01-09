import styles from "./DashboardPage.module.css";
import logo from "../assets/logo.png"
import controllerImg from "../assets/controller.png";
import openTicketsImg from "../assets/openTickets.png";
import closetTicketsImg from "../assets/closedTickets.png";
import cancelledTicketsImg from "../assets/cancelledTickets.png";
import CustomCard from "../components/CustomCard/CustomCard";
import { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import LineChart from "../components/LineChart/LineChart";
import BarChart from "../components/BarChart/BarChart";
import PieChart from "../components/PieChart/PieChart";

const DashboardPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://taliceplannerapi.azurewebsites.net/Dashboard/Init');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000);

    return () => clearInterval(interval);
  }, []);


  console.log(data);

  return (
    <main className={styles.dashboadPage_container}>
      <div>
        <div>
          <div className={styles.dashboardPage_logo}>
            <img src={logo} alt="Logo" />
          </div>
          <div className={styles.dashboadPage_header}>
            Ticketing System
          </div>
        </div>
        <div className={styles.dashboadPage_cards_container}>
          <CustomCard title={'Controller'} color='#8280FF' countColor='#ECECF9' count={data?.totalControllers || 0} img={controllerImg} />
          <CustomCard title={'Open Tickets'} color='#FF9066' countColor='#FFE3D9' count={data?.openTickets || 0} img={openTicketsImg} />
          <CustomCard title={'Closed Tickets'} color='#4AD991' countColor='#D1F5E3' count={data?.closeTickets || 0} img={closetTicketsImg} />
          <CustomCard title={'Cancelled Tickets'} color='#FEC53D' countColor='#FEF0CE' count={data?.cancelTickets || 0} img={cancelledTicketsImg} />
        </div>
        <div>
          <PieChart pieChartData={data}/>
        </div>
      </div>
      <div>
        <Table tableData={data?.openTicketsList} />
        <div className={styles.pie_bar_charts} style={{ display: 'flex', gap: '0.5rem'}}>
          <LineChart lineChartData={data?.lineChart}/>
          <BarChart barChartData={data?.barChart}/>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
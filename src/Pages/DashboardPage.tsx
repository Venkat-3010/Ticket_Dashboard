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
  interface DashboardData {
    totalControllers: number[]|any;
    openTickets: number;
    closeTickets: number;
    cancelTickets: number;
    openTicketsList: any[];
    lineChart: any;
    barChart: any;
  }

  const [data, setData] = useState<DashboardData | null|any>(null);

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
    const interval = setInterval(fetchData, 1800000 );

    return () => clearInterval(interval);
  }, []);

const customeCardData=[
  { title:"Controller",color:"#8280FF",countColor:"#ECECF9",countKey:"totalControllers",img:controllerImg},
  { title:"Open Tickets",color:"#FF9066",countColor:"#FFE3D9",countKey:"openTickets",img:openTicketsImg},
  { title:"Closed Tickets",color:"#4AD991",countColor:"#D1F5E3",countKey:"closeTickets",img:closetTicketsImg},
  { title:"Cancelled Tickets",color:"#FEC53D",countColor:"#FEF0CE",countKey:"cancelTickets",img:cancelledTicketsImg}
]

  return (
    <main className={styles.dashboadPage_container}>
      <div className={styles.dashboardPage_leftContainer}>
        <div className={styles.dashboadPage_logo_container}>
          <div className={styles.dashboardPage_logo}>
            <img src={logo} alt="Logo" />
          </div>
          {/* <div className={styles.dashboadPage_header}>
            Ticketing System
          </div> */}
        </div>
        <div className={styles.dashboardpage_customeCard_continer}>
          {
            customeCardData?.map((obj:any,index:number)=>(
              <div className={styles.customeCard_Continer_space}>
              <CustomCard key={index} title={obj?.title} color={obj?.color} countColor={obj?.countColor} count={data ? data[obj?.countKey] || 0 : 0} img={obj?.img} />
              {/* <CustomCard key={index} title={obj?.title} color={obj?.color} countColor={obj?.countColor} count={ 0} img={obj?.img} /> */}
           </div>
            ))
          }
        </div>
        <div className={styles.dashboadPage_pieChart_container}>
          {data ? <PieChart pieChartData={{ openTickets: data?.openTickets, closeTickets: data?.closeTickets, cancelTickets: data?.cancelTickets }} /> : <></>}
        </div>
      </div>
      <div className={styles.dashboardPage_rightContainer}>
        <Table tableData={data?.openTicketsList || []} />
        <div className={styles.dashboadPage_charts_container} >
          <LineChart lineChartData={data?.lineChart || []} />
          <BarChart barChartData={data?.barChart || []} />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage
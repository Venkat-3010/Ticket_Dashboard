import styles from "./DashboardPage.module.css";
import logo from "../assets/logo.png"
import controllerImg from "../assets/controller.png";
import openTicketsImg from "../assets/openTickets.png";
import closetTicketsImg from "../assets/closedTickets.png";
import cancelledTicketsImg from "../assets/cancelledTickets.png";
import CustomCard from "../components/Card";

const DashboardPage = () => {
  return (
    <main className={styles.dashboadPage_container}>
      <div>
        <div className={styles.dashboardPage_logo}>
          <img src={logo} alt="Logo" />
        </div>
        <div className={styles.dashboadPage_header}>
          Ticketing System
        </div>
      </div>
      <div className={styles.dashboadPage_cards_container}>
        <CustomCard title={'Controller'} color='#8280FF' countColor='#ECECF9' count={15} img={controllerImg}/>
        <CustomCard title={'Open Tickets'} color='#FF9066' countColor='#FFE3D9' count={15} img={openTicketsImg}/>
        <CustomCard title={'Closed Tickets'} color='#4AD991' countColor='#D1F5E3' count={15} img={closetTicketsImg}/>
        <CustomCard title={'Cancelled Tickets'} color='#FEC53D' countColor='#FEF0CE' count={15} img={cancelledTicketsImg}/>
      </div>
    </main>
  )
}

export default DashboardPage
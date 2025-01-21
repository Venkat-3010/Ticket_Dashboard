import './App.css'
import "primereact/resources/primereact.min.css"
import DashboardPage from './Pages/DashboardPage/DashboardPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import { useCookies } from 'react-cookie'

function App() {
  const [cookie, ] = useCookies();

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />}/> */}
        <Route path="/home" element={cookie.loginToken ? <DashboardPage /> : <LoginPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

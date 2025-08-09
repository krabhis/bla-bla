import React from 'react'
import TopBar from '../components/TopBar/TopBar'
import SideBar from '../components/Sidebar/Sidebar'
import './Home.css'

function Home() {
  return (
     <>
     <TopBar />
     <div className="home-container">
       <SideBar/>
       <div className="home-main">
         <h1>Welcome to SocialEcho</h1>
         <p>Your social media dashboard</p>
       </div>
     </div>
     </>
  )
}

export default Home

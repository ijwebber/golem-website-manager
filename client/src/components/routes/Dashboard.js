import './Dashboard.css';

import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/Login";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="Dashboard">
            <h1>GOLEM</h1>
            <h1>PROJECTS</h1>
            <h1>PROFILE</h1>
            <SiteComponent site={{siteName: "ZephyrHillMusic", siteAddress: "zephyrhillmusic.com"}}></SiteComponent>
            <SiteComponent site={{siteName: "Louie Taylor Music", siteAddress: "louietaylor.co.uk"}}></SiteComponent>
            <button className='logout' onClick={() => {logout(); navigate(0);}}>LOGOUT</button>
        </div>
    );
} 

function SiteComponent(props) {
    const site = props.site;
    
    return (
        <div className="SiteComponent">
            <div>{site.siteName}</div>
            <a href={"https://www." + site.siteAddress} target="_blank" rel="noreferrer noopener"><div className='link'>{site.siteAddress}</div></a>
            <div className='button-container'>
                <button className='view'>VIEW</button>
                <button className='edit'>EDIT</button>
            </div>

        </div>
    );

}

export default Dashboard;
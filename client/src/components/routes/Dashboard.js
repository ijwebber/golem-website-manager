import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/Login";

function Dashboard() {
    const navigate = useNavigate();

    return (<div>
        Dashboard
        <button onClick={() => {logout(); navigate(0);}}>Logout</button>
    </div>);
} 

export default Dashboard;
import { useContext } from "react";
import { UserContext } from "../context";

const Dashboard = () => {
    const [state, setState] = useContext(UserContext);


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                        {JSON.stringify(state)}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
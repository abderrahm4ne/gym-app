import { NavLink } from "react-router"
import { Outlet } from "react-router"
import Dashboard from "./routesComponents/Dashboard";

// mui imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';


export default function NavBar(){

    return(
        <div className="h-[100vh] w-[100vw] p-4">
            
            
            <div className="flex flex-row justify-between items-center mb-6 px-5">

                        <div className="flex flex-row gap-3 items-center ">
                            <AdminPanelSettingsIcon className="text-[#B0B7C4]" style={{fontSize:"2.5rem"}} />
                            <p className="text-[#FFFFFF] text-xl">ADMIN SALIM</p>
                            <div className="bg-[#4CAF50] w-[10px] h-[10px] rounded-2xl"></div>
                        </div>

                        <div className="flex flex-row gap-3 items-center pr-4">
                            <FitnessCenterIcon className="text-[#B0B7C4]" style={{fontSize:"2.5rem"}} />
                            <div className="felx flex-col items-start">
                                <p className="text-[#FFFFFF] text-2xl" >GYM </p>
                                <p className="text-[#FFFFFF] text-sm relative bottom-2 left-4">SYSTEM MANAGEMENT</p>                    
                                <p className="text-[#00E676] text-[10px] relative bottom-2 left-8">SALIM GYM</p>   
                            </div>
                        </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div style={{backgroundImage: "linear-gradient(to bottom, #1a1f2e, #131621)", position:"sticky", boxShadow:"0px 2px 5px rgba(0, 0, 0, 0.2)"}} className="rounded-lg flex flex-col p-4 w-[70%] h-[70vh] overflow-hidden">
                    <NavLink to="/" className=" box flex flex-col items-center justify-center self-center w-[20%] h-[100px] rounded-lg ">
                        <DashboardIcon className="text-[#00C4FF]" style={{fontSize:"2rem"}} />
                        <p className="text-[#00C4FF] text-lg">DASHBOARD</p>
                    </NavLink>

                    <Dashboard />
                </div>
            </div>
            
        </div>
    )
}
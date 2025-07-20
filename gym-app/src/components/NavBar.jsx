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
        <div className="h-[100vh] w-[100vw] p-4 overflow-x-hidden">
            
            
            <div className="flex flex-row justify-between items-center px-5">

                        <div className="flex flex-row gap-3 items-center ">
                            <AdminPanelSettingsIcon className="text-[#B0B7C4]" style={{fontSize:"2.5rem"}} />
                            <p className="text-[#FFFFFF] text-xl">ADMIN SALIM</p>
                            <div className="bg-[#4CAF50] w-[10px] h-[10px] rounded-2xl"></div>
                        </div>

                        <div className="flex flex-row gap-3 items-center pr-4">
                            <div className="text-white text-xl pr-4 hover:cursor-pointer">EN/AR</div>
                            <FitnessCenterIcon className="text-[#B0B7C4]" style={{fontSize:"2.5rem"}} />
                            <div className="felx flex-col items-start">
                                <p className="text-[#FFFFFF] text-2xl" >GYM </p>
                                <p className="text-[#FFFFFF] text-sm relative bottom-2 left-4">SYSTEM MANAGEMENT</p>                    
                                <p className="text-[#00E676] text-[10px] relative bottom-2 left-8">SALIM GYM</p>   
                            </div>
                        </div>
            </div>

            <div className="">
                

                    <Outlet />


            </div>
            
        </div>
    )
}
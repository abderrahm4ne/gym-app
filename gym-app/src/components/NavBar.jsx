import { NavLink } from "react-router"
import { Outlet } from "react-router"

// mui imports
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';


export default function NavBar(){

    return(
        <div className="h-[100vh] w-[100vw] flex flex-col">
            

                <div className="navbar flex flex-row w-full bg-[#1f1e1e] py-5.5 px-30 relative items-center" style={{ borderBottomLeftRadius: "60px", borderBottomRightRadius: "60px" }}>
  
                    <div className="flex flex-row items-center gap-4 flex-1">
                        <p className="text-[#8CCDEB] text-2xl">ADMIN SALIM</p>
                        <div className="w-[8px] h-[8px] rounded-2xl bg-[#07b335]" />
                    </div>

                    <div className="flex justify-center flex-1">
                        <p className="text-[#8CCDEB] text-2xl" >
                        GYM SYSTEM MANAGEMENT
                        </p>
                    </div>

                    <div className="flex justify-end flex-1">
                        <NavLink to="/" className="text-[#8CCDEB] dashboard">
                        <DashboardIcon style={{ fontSize: "2rem" }} />
                        </NavLink>
                    </div>

                </div>

                    <Outlet />
                

        </div>
    )
}
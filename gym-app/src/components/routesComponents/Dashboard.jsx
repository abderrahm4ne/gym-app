import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import CreateIcon from '@mui/icons-material/Create';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NotesIcon from '@mui/icons-material/Notes';


import { NavLink, Outlet } from 'react-router';

export default function Dashboard(){

    return(
        <div className="p-4 w-[100%] h-[90vh] flex flex-row gap-3">

            <div className='w-[25%] h-[100%] px-4 py-5 rounded-2xl flex flex-col gap-1' style={{backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)', boxShadow:"1px 4px 5px rgba(0, 0, 0, 0.3)"}}>

                <div className='text-xl flex flex-row items-center rounded-2xl px-3 py-2.5 bg-[#4CAF50] text-white w-fit hover:cursor-pointer'>
                    <DashboardIcon style={{fontSize:"1.5rem"}} />
                    <p className='ml-2'>Dashboard</p>
                </div>

                <div className='flex flex-col gap-2 mt-4'>

                    <NavLink to="/view-all-members" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                    <GroupIcon style={{fontSize:"1.5rem"}} />
                    <p className="text-lg">View All Members</p>
                </NavLink>

                <NavLink to="/add-member" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                    <PersonAddAlt1Icon style={{fontSize:"1.5rem"}} />
                    <p className="text-lg">Add Member</p>
                </NavLink>

                <NavLink to="/memberships-ends-today" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                    <BlockIcon style={{fontSize:"1.5rem"}} />
                    <p className="text-lg">Memberships Ends Today</p>
                </NavLink>

                <NavLink to="/memberships-ended" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                    <BlockIcon style={{fontSize:"1.5rem"}} />
                    <p className="text-lg">Memberships Ended</p>
                </NavLink>

                <NavLink to="/basic-statistics" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                    <SignalCellularAltIcon style={{fontSize:"1.5rem"}} />
                    <p className="text-lg">Basic Statistics</p>
                </NavLink>

                <NavLink to="/take-note" className="flex flex-row gap-2 items-center text-[#B0B7C4] hover:text-white hover:bg-[#4CAF50] px-3 py-2 rounded-lg transition duration-300">
                    <NotesIcon style={{fontSize:"1.5rem"}} />
                    <p className="text-lg">Take Note</p>
                </NavLink>

                </div>



            </div>


            <div className='w-[75%] h-[100%] px-4 py-5 rounded-2xl flex flex-col gap-1' style={{backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)', boxShadow:"1px 4px 5px rgba(0, 0, 0, 0.3)"}}>
                <Outlet />
            </div>

        </div>
    )
}
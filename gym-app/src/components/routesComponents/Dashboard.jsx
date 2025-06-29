import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import AddIcon from '@mui/icons-material/Add';
import BlockIcon from '@mui/icons-material/Block';
import { NavLink } from 'react-router';

export default function Dashboard(){

    return(
        <div className="w-full h-full flex flex-col mt-4 gap-3">

                <NavLink to="/view-all-member" className="w-full py-4 px-20 flex flex-row justify-between items-center box-nav font-bold" style={{border:"1px solid #2A3042", borderRadius:"10px"}}>
                <p className='text-[#2A3042] text-2xl'>VIEW ALL MEMBERS</p>
                <GroupIcon className='text-[#2A3042]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/add-member" className="w-full py-4 px-20 flex flex-row justify-between items-center box-nav font-bold" style={{border:"1px solid #2A3042", borderRadius:"10px"}}>
                <p className='text-[#2A3042] text-2xl'>ADD NEW MEMBER</p>
                <PersonAddAlt1Icon className='text-[#2A3042]' style={{fontSize:"2.5rem"}} />
                </NavLink>

                <NavLink to="/renew-membership" className="w-full py-4 px-20 flex flex-row justify-between items-center box-nav font-bold" style={{border:"1px solid #2A3042", borderRadius:"10px"}}>
                <p className='text-[#2A3042] text-2xl'>RENEW MEMBERSHIP</p>
                <AutorenewIcon className='text-[#2A3042]' style={{fontSize:"2.5rem"}} />
                </NavLink>
            
        </div>
    )
}
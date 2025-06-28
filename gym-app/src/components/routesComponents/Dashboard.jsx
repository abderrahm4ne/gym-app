import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';


export default function Dashboard(){

    return(
        <div className="w-full h-[100vh] px-3 py-2 bg-[#383636]">

            <div style={{backgroundImage:"linear-gradient( #1a1919 40% , #1f1e1e 60%)", boxShadow:"0px 5px 10px #1f1e1e"}} className='border-1 border-white text-3xl text-[#8CCDEB] bg-black py-6 px-6 rounded-lg'>
                <h1>DASHBOARD</h1>
            </div>

            <div className='text-3xl text-[#8CCDEB] py-5 px-6 w-[13.2798%]'>
                <p style={{borderBottom:"2px solid #8CCDEB"}}>Gym Control</p>
            </div>
            
            <div className='grid grid-cols-4 p-4 '>

                    <div className='bg-[#1f1e1e] box height-[30%] text-[#8CCDEB] flex flex-col items-center justify-center rounded-lg border-1 border-black m-2 h-[280px]' style={{borderShadow:"20px 20px 20px white"}}>
                        <GroupIcon sx={{fontSize:"10rem", height:"60%"}} />
                        <div className='height-[40%]'>
                            <p className='text-2xl'>VIEW ALL MEMBERS</p>
                        </div>
                        
                    </div>

                    <div className='bg-[#1f1e1e] box height-[30%] text-[#8CCDEB] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                        <PersonAddAlt1Icon sx={{fontSize:"10rem", height:"60%"}} />
                        <div className='height-[40%]'>
                            <p className='text-2xl'>ADD NEW MEMBER</p>
                        </div>
                        
                    </div>

                    <div className='bg-[#1f1e1e] box height-[30%] text-[#8CCDEB] flex flex-col items-center justify-center rounded-lg m-2 h-[280px]'>
                        <div className='relative h-[60%]'>
                            <PersonIcon sx={{fontSize:"10rem"}} />
                            <AutorenewIcon sx={{fontSize:"5.5rem", position:"absolute", top:"25px", right:"-25px", color:"#8CCDEB", zIndex:"1"}} />
                        </div>
                        <div className='height-[40%]'>
                            <p className='text-2xl'>RENEW MEMBERSHIP</p>
                        </div>

                  </div>
            </div>
            
        </div>
    )
}
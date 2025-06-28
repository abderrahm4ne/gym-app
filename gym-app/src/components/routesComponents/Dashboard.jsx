import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function Dashboard(){

    return(
        <div className="w-full h-[100vh] px-3 py-2 bg-[#383636]">

            <div style={{backgroundImage:"linear-gradient( #1a1919 40% , #1f1e1e 60%)", boxShadow:"0px 5px 10px #1f1e1e"}} className='text-3xl text-[#8CCDEB] bg-black py-5 px-6 rounded-lg'>
                <h1>DASHBOARD</h1>
            </div>

            <div className='text-3xl text-[#8CCDEB] py-5 px-6 w-[14%]'>
                <p style={{borderBottom:"2px solid #8CCDEB"}}>Gym Control</p>
            </div>
            
            <div className='grid grid-cols-4 p-4 '>
                    <div className='bg-[#1f1e1e] height-[30%] text-[#8CCDEB] flex flex-col items-center justify-center rounded-lg shadow-lg m-2 h-[280px] hover:cursor-pointer' style={{borderShadow:"20px 20px 20px white"}}>
                        <GroupIcon sx={{fontSize:"10rem", height:"60%"}} />
                        <div className='height-[40%]'>
                            <p className='text-2xl'>VIEW ALL MEMBERS</p>
                        </div>
                        
                  </div>

                    <div className='bg-[#1f1e1e] height-[30%] text-[#8CCDEB] flex flex-col items-center justify-center rounded-lg shadow-lg m-2 h-[280px] hover:cursor-pointer'>
                        <PersonAddAlt1Icon sx={{fontSize:"10rem", height:"60%"}} />
                        <div className='height-[40%]'>
                            <p className='text-2xl'>ADD NEW MEMBER</p>
                        </div>
                        
                  </div>
            </div>
            
        </div>
    )
}
import { useState, useEffect } from 'react';

export default function AddMember(){

      const [infos, setInfos] = useState({
          lastname:"",
          firstname:"",
          membership:"",
          phonenumber:"",
          monthsOfMemberShips:1,
          startDate:"",
          endDate:""
        });

      function generateMembershipDates(monthsToAdd) {
        const now = new Date();
        const startdate = now.toISOString().split("T")[0];

        const months = parseInt(monthsToAdd);
        let enddate;

        if (!isNaN(months) && months > 0) {
          const end = new Date(now);
          end.setMonth(end.getMonth() + months);
          enddate = end.toISOString().split("T")[0];
        } else {
          enddate = startdate;
        }

        return { startdate, enddate };
      }


    
    const handleChange = (e) => {
      const { id, value} = e.target;
      setInfos( prev => ({...prev, [id]: value}));
    }

    useEffect(()=> {

      const {startdate, enddate} = generateMembershipDates(infos.monthsOfMemberShips);
      
      setInfos(prev => ({
        ...prev, 
        startDate : startdate,
        endDate : enddate
      }))

    },[infos.monthsOfMemberShips])

    const handleAddMember = async () => {

    const result = await window.electron.ipcRenderer.invoke('add-member', infos);

    if (result.success) {
      alert(result.message);
      setInfos({
        firstname:"",
        lastname:"",
        membership:"",
        phonenumber:"",
        monthsOfMemberShips:"",
        startDate:"",
        endDate:""
      })
    } else {
      console.error('Failed to add member:', result.error);
    }

    };

   

    

    return(
        <div className="p-4">
      <h1 className="text-4xl text-[#FFFFFF] mb-4 px-4">Add New Member</h1>

      <div className="flex flex-col w-full space-y-4">


        {/* First Name */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="firstname" className="w-[20%] text-2xl text-[#FFFFFF]">First Name</label>
          <input
            type="text"
            id="firstname"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-2xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.firstname}
            onChange={handleChange}
          />
        </div>



        {/* Last Name */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="lastname" className="w-[20%] text-2xl text-[#FFFFFF]">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-2xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.lastname}
            onChange={handleChange}
          />
        </div>



        {/* Membership */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="membership" className="w-[20%] text-2xl text-[#FFFFFF]">Membership</label>
          <input
            type="text"
            id="membership"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-2xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.membership}
            onChange={handleChange}
          />
        </div>




        {/* Phone Number */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="phonenumber" className="w-[20%] text-2xl text-[#FFFFFF]">Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-2xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.phonenumber}
            onChange={handleChange}
          />
        </div>


        {/*Months Of memberShip*/}

        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="monthsOfMemberShips" className="w-[20%] text-2xl text-[#FFFFFF]">Months Of Memberships</label>
          <input
            type="text"
            id="monthsOfMemberShips"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.monthsOfMemberShips}
            onChange={handleChange}
            min={1}
          />
        </div>


        {/* Start Date */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="startDate" className="w-[20%] text-2xl text-[#FFFFFF]">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.startDate}
            onChange={handleChange}

          />
        </div>

        
        {/* End Date */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="endDate" className="w-[20%] text-2xl text-[#FFFFFF]">End Date</label>
          <input
            type="date"
            id="endDate"
            className="border-1 border-[#00C4FF] rounded-md w-[70%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.endDate}
            onChange={handleChange}
            disabled={true}

          />
        </div>



        {/* Submit Button */}
        <div className="px-5 py-4">

          <button
            onClick={handleAddMember}
            className="bg-[#00C4FF] text-black py-2 px-6 text-xl rounded-md hover:bg-[#0099cc] transition hover:cursor-pointer"
          >
            Add Member
          </button>
        
        </div>
      </div>
    </div>
    )
}
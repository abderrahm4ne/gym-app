
import { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';

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

      function generateMembershipDates(monthsToAdd, customStartDate) {

      const start = customStartDate ? new Date(customStartDate) : new Date();
      const startdate = start.toISOString().split("T")[0];

      const months = parseInt(monthsToAdd);
      let enddate;

      if (!isNaN(months) && months > 0) {
        const end = new Date(start);
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

      const {startdate, enddate} = generateMembershipDates(infos.monthsOfMemberShips, infos.startDate);
      
      setInfos(prev => ({
        ...prev, 
        startDate : startdate,
        endDate : enddate
      }))

    },[infos.monthsOfMemberShips]);

    const [fieldsErr, setFieldsErr ] = useState(false);
    const [phoneNum, setPhoneNum] = useState(false);
    const [monthsField, setMonthsField] = useState(false);

    const validation = () =>{
      const {
      firstname,
      lastname,
      monthsOfMemberShips,
      membership,
      phonenumber,
      startDate,
      endDate,
    } = infos;

    const isEmpty = (str) => String(str).trim() === "";

    setFieldsErr(false);
    setPhoneNum(false);
    setMonthsField(false);

    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(monthsOfMemberShips) ||
      isEmpty(membership) ||
      isEmpty(phonenumber) ||
      isEmpty(startDate) ||
      isEmpty(endDate)
    ) {
      setFieldsErr(true);
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      setPhoneNum(true);
      return false;
    }

    const months = parseInt(monthsOfMemberShips);
    if (isNaN(months) || months < 1) {
      setMonthsField(true);
      return false;
    }

    return true
    }

    const handleAddMember = async () => {
      
      const validated = validation();

      if(!validated){
        return
      }

    const result = await window.electron.ipcRenderer.invoke("add-member", infos);

    if (result.success) {
      alert(result.message);
      setInfos({
        firstname: "",
        lastname: "",
        membership: "",
        phonenumber: "",
        monthsOfMemberShips: "",
        startDate: "",
        endDate: "",
      });
    } else {
      console.error("Failed to add member:", result.error);
    }
  };



   ///==== dialog logic ====///

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setFieldsErr(false);
      setPhoneNum(false);
      setMonthsField(false);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    
   ///==== dialog logic ====///

    return(
        <div className="p-4">
      <h1 className="text-4xl text-[#FFFFFF] mb-4 px-4">Add New Member</h1>

      <div className="flex flex-col w-full space-y-4 mt-6">


        {/* First Name */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="firstname" className="w-[20%] text-xl text-[#FFFFFF]">First Name</label>
          <input
            type="text"
            id="firstname"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent"
            value={infos.firstname}
            onChange={handleChange}
          />
        </div>



        {/* Last Name */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="lastname" className="w-[20%] text-xl text-[#FFFFFF]">Last Name</label>
          <input
            type="text"
            id="lastname"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent"
            value={infos.lastname}
            onChange={handleChange}
          />
        </div>



        {/* Membership */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="membership" className="w-[20%] text-xl text-[#FFFFFF]">Membership</label>
          <select
            id="membership"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent field"
            value={infos.membership}
            onChange={handleChange}
          >
            <option className='bg-[#2A3042] px-4 outline-none rounded-md border-none' value="">Select a type</option>
            <option className='bg-[#2A3042] px-4 outline-none rounded-md border-none' value="Normal">Normal</option>
            <option className='bg-[#2A3042] px-4 outline-none rounded-md border-none' value="Premium">Premium</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="phonenumber" className="w-[20%] text-xl text-[#FFFFFF]">Phone Number</label>
          <input
            type="text"
            id="phonenumber"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.phonenumber}
            onChange={handleChange}
          />
        </div>


        {/*Months Of memberShip*/}

        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="monthsOfMemberShips" className="w-[20%] text-xl text-[#FFFFFF]">Months Of Memberships</label>
          <input
            type="number"
            id="monthsOfMemberShips"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.monthsOfMemberShips}
            onChange={handleChange}
            min={1}
          />
        </div>


        {/* Start Date */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="startDate" className="w-[20%] text-xl text-[#FFFFFF]">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] text-xl text-[#FFFFFF] outline-none bg-transparent px-2 py-1"
            value={infos.startDate}
            onChange={handleChange}

          />
        </div>

        
        {/* End Date */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="endDate" className="w-[20%] text-xl text-[#FFFFFF]">End Date</label>
          <input
            type="date"
            id="endDate"
            className="border-1 border-[#00C4FF] rounded-md w-[75%] text-xl text-[#FFFFFF] outline-none bg-transparent px-2 py-1"
            value={infos.endDate}
            onChange={handleChange}

          />
        </div>



        {/* Submit Button */}
        <div className="px-5 py-4">

          <button
           onClick={() => {
            if(validation()){
              handleClickOpen();
            }
           }}
            className="bg-[#00C4FF] text-black py-2 px-6 text-xl rounded-md hover:bg-[#0099cc] transition hover:cursor-pointer btn"
          >
            Add Member
          </button>

          
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{justifySelf:"center", alignSelf:"center"}}
            
          >

          <div className='flex flex-col rounded-xl h-[35vh] w-[33vw] py-7 px-5 gap-3 justify-between' style={{backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)'}}>
            
            <div className='flex flex-col gap-1 text-white item'>
                <div className='text-3xl text-white'>Confirm Adding this member</div>
                <div className='flex flex-col gap-0.5 mt-2'>
                      <div className='text-xl'>{infos.lastname} {infos.firstname}</div>
                      <div className='text-xl'>Membership type and period : {infos.membership}, {infos.monthsOfMemberShips} {infos.monthsOfMemberShips == 1 ? 'Month' : 'Months'}</div>
                      <div className='text-xl'>Phone number : {infos.phonenumber}</div>
                      <div className='text-xl flex flex-row gap-4'>
                        <div>
                          START AT :{infos.startDate},
                        </div>
                        <div>
                          END BY {infos.endDate}
                        </div>
                      </div>
                </div>
                
            </div>

            <div className='flex flex-row gap-2' style={{alignSelf:"end"}}>
                <button className='bg-[#FF6B6B] text-[white] py-3 px-4.5 rounded-md text-xl btn' onClick={handleClose}>CANCEL</button>
                <button
                  className="bg-[#4CAF50] text-[white] py-3 px-4.5 rounded-md text-xl btn"
                  onClick={() =>{
                    
                    handleAddMember();
                    setTimeout(() => {
                      handleClose();
                    }, 200)
                  }}
                    
                >
                  CONFIRM
                </button>

            </div>
           

          </div>

          </Modal>

        </div>

        {fieldsErr && (
          <div className="text-red-500 text-lg font-semibold mt-2 px-4">
            You must fill all the fields
          </div>
        )}

        {phoneNum && (
          <div className="text-red-500 text-lg font-semibold mt-2 px-4">
            You must enter a valid phone number
          </div>
        )}

        {monthsField && (
          <div className="text-red-500 text-lg font-semibold mt-2 px-4">
            Months of membership can't be zero
          </div>
        )}


      </div>
    </div>
    )
}

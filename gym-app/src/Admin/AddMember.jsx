import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


import Modal from '@mui/material/Modal';

export default function AddMember(){

    const { t, i18n } = useTranslation(); 

    const [infos, setInfos] = useState({
        lastname:"",
        firstname:"",
        membership:"",
        phonenumber:"",
        monthsOfMemberShips:1,
        startDate:"",
        endDate:"",
        paidAmount:""
      });

    const [fieldsErr, setFieldsErr ] = useState(false);
    const [phoneNum, setPhoneNum] = useState(false);
    const [monthsField, setMonthsField] = useState(false);


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

    const validation = () =>{
      const {
      firstname,
      lastname,
      monthsOfMemberShips,
      membership,
      phonenumber,
      startDate,
      endDate,
      paidAmount
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
      isEmpty(endDate) || 
      isEmpty(paidAmount)
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

    const paid = parseFloat(paidAmount);
    if (isNaN(paid) || paid < 0) {
      alert("Invalid paid amount.");
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
        paidAmount: ""
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

  const fontClass = i18n.language === 'ar' ? 'text-3xl' : 'text-xl';

  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return(

        <div className="p-6">
      <h1 className={`${i18n.language === 'ar' ? 'text-4xl' : 'text-3xl'} text-[#FFFFFF] mb-4 px-4`}>{t('Add New Member')}</h1>

      <div className="flex flex-col w-full space-y-4 mt-6">


        {/* First Name */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="firstname" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>
            {t('First Name')}
            </label>
          <input
            type="text"
            id="firstname"
            className="border-1 border-[#00C4FF] rounded-md w-full px-2 py-2 text-xl text-[#FFFFFF] outline-none bg-transparent"
            value={infos.firstname}
            onChange={handleChange}
          />
        </div>



        {/* Last Name */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="lastname" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>{t('Last Name')}</label>
          <input
            type="text"
            id="lastname"
            className="border-1 border-[#00C4FF] rounded-md w-full px-2 py-2 text-xl text-[#FFFFFF] outline-none bg-transparent"
            value={infos.lastname}
            onChange={handleChange}
          />
        </div>



        {/* Membership */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="membership" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>{t('Membership')}</label>
          <select
            id="membership"
            className="border-1 border-[#00C4FF] rounded-md w-full px-2 py-2 text-xl text-[#FFFFFF] outline-none bg-transparent field"
            value={infos.membership}
            onChange={handleChange}
          >
            <option className='bg-[#2A3042] px-4 outline-none rounded-md border-none' value="">{t('Select a type')}</option>
            <option className='bg-[#2A3042] px-4 outline-none rounded-md border-none' value="Normal">{t('Normal')}</option>
            <option className='bg-[#2A3042] px-4 outline-none rounded-md border-none' value="Premium">{t('Premium')}</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="phonenumber" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>
            {t('Phone Number')}
          </label>
          <input
            type="text"
            id="phonenumber"
            className="border-1 border-[#00C4FF] rounded-md w-full px-2 py-2 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.phonenumber}
            onChange={handleChange}
          />
        </div>


        {/* Start Date */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="startDate" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>
            {t('Start Date')}
          </label>
          <input
            type="date"
            id="startDate"
            className="border-1 border-[#00C4FF] rounded-md w-full text-xl text-[#FFFFFF] outline-none bg-transparent px-2 py-2"
            value={infos.startDate}
            onChange={handleChange}

          />
        </div>


        {/*Months Of memberShip*/}

        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="monthsOfMemberShips" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>
            {t('Months Of memberShip')}
          </label>
          <input
            type="number"
            id="monthsOfMemberShips"
            className="border-1 border-[#00C4FF] rounded-md w-full px-2 py-2 text-xl text-[#FFFFFF] outline-none bg-transparent "
            value={infos.monthsOfMemberShips}
            onChange={handleChange}
            min={1}
          />
        </div>
     
        {/* End Date */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="endDate" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>{t('End Date')}</label>
          <input
            type="date"
            id="endDate"
            className="border-1 border-[#00C4FF] rounded-md w-full text-xl text-[#FFFFFF] outline-none bg-transparent px-2 py-2"
            value={infos.endDate}
            onChange={handleChange}
            disabled={true}
          />
        </div>

        {/* Paid Amount */}
        <div className="px-5 py-2 flex flex-row gap-4 items-center">
          <label htmlFor="paidAmount" className={`w-[15%] text-[#FFFFFF] ${fontClass}`}>{t('Paid Amount')}</label>
          <input
            type="number"
            id="paidAmount"
            className="border-1 border-[#00C4FF] rounded-md w-full px-2 py-2 text-xl text-[#FFFFFF] outline-none bg-transparent"
            value={infos.paidAmount}
            onChange={handleChange}
            min={0}
          />
        </div>




        {/* Submit Button */}
        <div className={`px-5 py-4 self-end`}>

          <button
           onClick={() => {
            if(validation()){
              handleClickOpen();
            }
           }}
            className="bg-[#00C4FF] text-black py-2 px-6 text-xl rounded-md hover:bg-[#0099cc] transition hover:cursor-pointer btn"
          >
            {t('Add Member')}
          </button>

          
        
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{ justifySelf: "center", alignSelf: "center", direction:direction}}
            >
              <div
                className="flex flex-col rounded-xl h-[35vh] w-[33vw] py-7 px-5 gap-3 justify-between"
                style={{ backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)' }}
              >
                <div className="flex flex-col gap-1 text-white">
                  <div className={`text-white ${i18n.language === 'ar' ? 'text-3xl' : 'text-xl'}`}>{t('Confirm Adding this member')}</div>
                  <div className="flex flex-col gap-0.5 mt-2">
                    <div className="text-xl">
                      {infos.lastname} {infos.firstname}
                    </div>
                    <div className={`text-white ${i18n.language === 'ar' ? 'text-3xl' : 'text-xl'} `}>
                      {t('Membership type and period')} : {infos.membership}, {infos.monthsOfMemberShips}{" "}
                      {infos.monthsOfMemberShips == 1 ? t('Month') : t('Months')}
                    </div>
                    <div className={`text-white ${i18n.language === 'ar' ? 'text-3xl' : 'text-xl'}`}>
                      {t('Phone number')} : {infos.phonenumber}
                    </div>
                    <div className={`text-white ${i18n.language === 'ar' ? 'text-3xl' : 'text-xl'}`}>
                      <div>
                        {t('START AT')} : {infos.startDate},
                      </div>
                      <div>
                        {t('END BY')} {infos.endDate}
                      </div>
                    </div>
                    <div className={`text-white ${i18n.language === 'ar' ? 'text-3xl' : 'text-xl'}`}>
                      {t('Paid')}: {infos.paidAmount} DZD
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-2" style={{ alignSelf: "end" }}>
                  <button
                    className="bg-red-500 text-white py-3 px-4.5 rounded-md text-xl btn"
                    onClick={handleClose}
                  >
                    {t('CANCEL')}
                  </button>
                  <button
                    className="bg-[#4CAF50] text-white py-3 px-4.5 rounded-md text-xl btn"
                    onClick={() => {
                      handleAddMember();
                      setTimeout(() => {
                        handleClose();
                      }, 200);
                    }}
                  >
                    {t('CONFIRM')}
                  </button>
                </div>
              </div>
            </Modal>


        </div>

        {fieldsErr && (
          <div className="text-red-500 text-lg font-semibold mt-2 px-4">
            {i18n.language === 'ar' ? 'يجب عليك ملئ جميع البيانات' : 'You must fill all the fields'}
          </div>
        )}

        {phoneNum && (
          <div className="text-red-500 text-lg font-semibold mt-2 px-4">
            {i18n.language === 'ar' ? 'يجب عليك ٳدخال رقم هاتف صحيح ' : 'You must enter a valid phone number'}
          </div>
        )}

        {monthsField && (
          <div className="text-red-500 text-lg font-semibold mt-2 px-4">
            {i18n.language === 'ar' ? 'مدة الٳشتراك لا يجب ان تكون 0': 'Months of membership cant be zero'}
          </div>
        )}


      </div>
      </div>
      
    )
}

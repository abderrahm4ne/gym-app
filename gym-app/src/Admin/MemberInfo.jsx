import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useTranslation } from 'react-i18next';


export default function MemberInfo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const [editedMember, setEditedMember] = useState(null);

    const [editButton, setEditButton] = useState(false);
    const [renewButton, setRenewButton] = useState(false);
    const [deleteButton, setDeleteButton] = useState(false);

    const [isFieldsErr, setisFieldsErr] = useState(false);
    const [isPhoneNum, isSetPhoneNum] = useState(false);
    const [isMonthsField, isSetMonthsField] = useState(false);

    const [renew, setRenew] = useState(false);

    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];
    const [isReqSent, setIsReqSent] = useState(false);

    const [renewalData, setRenewalData] = useState({
    startDate: todayDate,
    endDate: "",
    months: 1
    });



    const fetchMember = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke("get-member", id);
            if (result.success) {
                setMember(result.member);
                setEditedMember(result.member);
            } else {
                const alertMessage = i18n.language === 'ar' ? 'فشل تحميل العضو' : 'Failed to load member'
                setError(alertMessage);
            }
        } catch (err) {
            const alertMessage = i18n.language === 'ar' ? 'خطأ في جلب بيانات العضو' : 'Error fetching member data'
            setError(alertMessage, err);
            console.error(err);
        }
    };

    useEffect(() => {
    fetchMember();

    }, [id]);



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

    useEffect(() => {

        if (!editedMember) return;

        const { monthsOfMemberShips, startDate } = editedMember;
        const { startdate, enddate } = generateMembershipDates(monthsOfMemberShips, startDate);

        if (editedMember.startDate !== startdate || editedMember.endDate !== enddate) {
            setEditedMember(prev => ({
            ...prev,
            startDate: startdate,
            endDate: enddate,
            }));
        }


    }, [editedMember?.startDate, editedMember?.monthsOfMemberShips]);




    useEffect(() => {

        if (!renewalData.startDate) return;

        const start = new Date(renewalData.startDate);
        const months = parseInt(renewalData.months);

        if (!isNaN(months) && months > 0) {
            const end = new Date(start);
            end.setMonth(end.getMonth() + months);
            const endDate = end.toISOString().split("T")[0];

            setRenewalData(prev => ({ ...prev, endDate }));
        }

    }, [renewalData.startDate, renewalData.months]);

    const handleEditInformations = () => {
        setEditButton(true);
        setRenew(false);
    const freshCopy = JSON.parse(JSON.stringify(member));
    setEditedMember(freshCopy);
    setIsDisabled(false);
    };


    const validation = () =>{
      const {
      firstname,
      lastname,
      monthsOfMemberShips,
      membership,
      phonenumber,
      paidAmount
    } = editedMember;

    const isEmpty = str => String(str).trim() === "";

    setisFieldsErr(false);
    isSetPhoneNum(false);
    isSetMonthsField(false);

    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(monthsOfMemberShips) ||
      isEmpty(membership) ||
      isEmpty(phonenumber)
    ) {
      setisFieldsErr(true);
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phonenumber)) {
      isSetPhoneNum(true);
      return false;
    }

    const months = parseInt(monthsOfMemberShips);
    if (isNaN(months) || months < 1) {
      isSetMonthsField(true);
      return false;
    }

    const paid = parseFloat(paidAmount);
    if (isNaN(paid) || paid < 0) {
      alert("Invalid paid amount.");
      return false;
    }

    return true
    }

    const getUpdatedFields = (original, updated) => {
    const updatedFields = {};
    for (const key in updated) {
        if (key === "daysLeft") continue; // skip computed fields
        if (updated[key] !== original[key]) {
            updatedFields[key] = updated[key];
        }
    }
    return updatedFields;
    };

    const handleSaveInformations = async () => {
        
            setEditButton(false);

        if(!validation()){
            return
        }

        const updatedFields = getUpdatedFields(member, editedMember);

        if (Object.keys(updatedFields).length === 0) {
        const alertMessage = i18n.language === 'ar' ? 'لم يتم إجراء أي تغييرات' : 'No changes made.'
        alert(alertMessage);
        setIsDisabled(true);
        return;
        }

        try{
            const result = await window.electron.ipcRenderer.invoke("update-member", member._id, updatedFields);
            
            if (result.success) {
            const alertMessage = i18n.language === 'ar' ? 'تم تحديث العضو.' : 'Member updated.'
            alert(alertMessage);
            const updated = { ...member, ...updatedFields };
            setMember({ ...updated });
            setEditedMember({ ...updated });
            setIsDisabled(true);
            } else {
                const alertMessage = i18n.language === 'ar' ? 'فشل التحديث:' : 'Update failed: '
            alert(alertMessage);
            alert(alertMessage + result.error);
            }
        }
        catch (err) {
            console.error(err);
            const alertMessage = i18n.language === 'ar' ? 'حدث خطأ أثناء الحفظ.' : 'An error occurred while saving.'
            alert(alertMessage, err);
        }

    }

    const handleClose = () => {
        setRenewButton(false)
    }

    const handleRenewMember = async () => {
        if(editButton){
            const alertMessage = i18n.language === 'ar' ? ' أكمل تغيير معلومات العضو ': 'complete editing informations'
            alert(alertMessage);
            return
        }
        if(member.daysLeft >= 1){
            setRenew(true);
            return
        }
        setRenewButton(true);
    }

    const handleRenewMemberConfirmation = async () => {
        try {
            const { startDate, endDate, months } = renewalData;
            if (!startDate || !endDate || months < 1) {
            const alertMessage = i18n.language === 'ar' ? 'بيانات التجديد غير صالحة' : 'Invalid renewal data.'
            alert(alertMessage);
            return;
            }

            const result = await window.electron.ipcRenderer.invoke("renew-member", member._id, {
            startDate,
            endDate,
            months: parseInt(months)
            });

            if (result.success) {
            const alertMessage = i18n.language === 'ar' ? 'تم تجديد العضوية .' : 'Membership renewed.'
            alert(alertMessage);
            setMember(result.member);
            setEditedMember(result.member);
            setRenew(false);
            setRenewButton(false);
            } else {
            const alertMessage = i18n.language === 'ar' ? 'فشل التجديد:' : 'Renewal failed: '
            alert(alertMessage, result.error);
            }
        } catch (err) {
            console.error("Renewal error:", err);
            const alertMessage = i18n.language === 'ar' ? 'حدث خطأ غير متوقع أثناء التجديد.' : 'An unexpected error occurred during renewal.'
            alert(alertMessage, err);
        }
        };


    const handleCloseEnd = () => {
        setDeleteButton(false);
    }

    const handleEndsMemberShip = async () => {
        if(editButton){
            const alertMessage = i18n.language === 'ar' ? ' أكمل تغيير معلومات العضو ': 'complete editing informations'
            alert(alertMessage);
            return
        }
        try {
            setIsReqSent(true);
            const result = await window.electron.ipcRenderer.invoke("delete-member", member._id);

            if (result.success) {
                const alertMessage = i18n.language === 'ar' ? 'تم إزالة العضو بنجاح' : 'Member has been removed successfully'
                alert(alertMessage);
                setDeleteButton(false);
                navigate('/view-all-members');
            } else {
                const alertMessage = i18n.language === 'ar' ? 'فشل في الحذف:' : 'Failed to delete: '
                alert(alertMessage, result.error);
            }
        } catch (err) {
            console.error("Delete error:", err);
            const alertMessage = i18n.language === 'ar' ? 'حدث خطأ أثناء محاولة حذف العضو.' : 'An error occurred while trying to delete the member.'
            alert(alertMessage, err);
        }
            setIsReqSent(false)
    }

    const { t, i18n } = useTranslation();

    const dirLan = i18n.language === 'ar' ? 'rtl' : 'ltr';

    if (error) {
        return <div className="text-red-700 font-bold">{error}</div>;
    }

    if (!member) {
        return <div className="text-xl text-[#00C4FF]">Wait..</div>;
    }

    return (
        <div className="flex flex-col px-4 py-1 gap-3">

            <div className={`flex flex-row gap-1 items-baseline text-[#FFFFFF] ${i18n.language === 'ar' ? 'text-xl' : 'text-md'}`}>
                <NavLink to={'/view-all-members'}>{t('ALL MEMBERS')}</NavLink>
                <p className="text-xl px-2">{'>'}</p>
                <NavLink to={`/view-all-members/${member._id}`}>{(member.firstname).toUpperCase()} {(member.lastname).toUpperCase()}</NavLink>
            </div>

            <div>
                <p className="text-2xl mt-3 text-[#00C4FF]">{t('MEMBER CARD')}</p>
            </div>

            <div className="w-full border-1 border-[#00C4FF] py-4 px-8 rounded-md flex flex-col gap-5">

                <div className="w-full flex flex-row items-center gap-5">

                        <img src="../public/pic/ss.jpg" alt="prpic" className="self-start  border-2 border-[#00C4FF] w-[13%] h-[160px] rounded-sm  profilePicture"/>

                    <div className="flex flex-col h-full w-full gap-1">


                        {/*=========== field ============ */}


                            {[
                                { id: "firstname", label: t("First Name") },
                                { id: "lastname", label: t("Last Name") },
                                { id: "phonenumber", label: t("Phone Number") }
                            ].map(field => (
                                <div className="flex flex-row items-center p-1 gap-4 " key={field.id}>
                                    <label htmlFor={field.id} className="text-2xl w-[18%] text-[#FFFFFF]">{field.label}</label>
                                    <input
                                        type="text"
                                        id={field.id}
                                        value={editedMember[field.id] ?? ""}
                                        onChange={(e) => setEditedMember(prev => ({ 
                                        ...prev, 
                                        [field.id]: e.target.value 
                                        }))}
                                        disabled={isDisabled}
                                        className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full"
                                    />
                                </div>
                            ))}

                            <div className="flex flex-row items-center p-1 gap-4 " key="monthsofmembership">
                                <label htmlFor="monthsofmembership" className="text-2xl w-[18%] text-[#FFFFFF]">{t('Months Of Membership')}</label>
                                    <input
                                        type="number"
                                        id="monthsofmembership"
                                        value={editedMember.monthsOfMemberShips}
                                        onChange={(e) => setEditedMember(prev => ({ 
                                        ...prev, 
                                        monthsOfMemberShips : e.target.value 
                                        }))}
                                        disabled={isDisabled}
                                        className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full"
                                />
                            </div>

                            <div className="flex flex-row items-center p-1 gap-4 ">
                                <label htmlFor="membership" className="text-2xl w-[18%] text-[#FFFFFF]">{t('Membership')}</label>
                                <select
                                    id="membership"
                                    value={editedMember.membership ?? ""}
                                    onChange={(e) => setEditedMember(prev => ({...prev, 
                                    membership: e.target.value
                                    }))}
                                    disabled={isDisabled}
                                    className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full hover:cursor-pointer"
                                >
                                    <option className='bg-[#2A3042]' value="">{t('Select a type')}</option>
                                    <option className='bg-[#2A3042]' value="Normal">{t('Normal')}</option>
                                    <option className='bg-[#2A3042]' value="Premium">{t('Premium')}</option>
                                </select>
                            </div>

                            
                            <div className="flex flex-row items-center p-1 gap-4 " key="startdate">
                                <label htmlFor="startdate" className="text-2xl w-[18%] text-[#FFFFFF]">{t('Start Date')}</label>
                                    <input
                                        type="date"
                                        id="startdate"
                                        value={editedMember.startDate ? new Date(editedMember.startDate).toISOString().split('T')[0] : ""}
                                        onChange={(e) => setEditedMember(prev => ({ 
                                        ...prev, 
                                        startDate : e.target.value 
                                        }))}
                                        disabled={isDisabled}
                                        className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full"
                                />
                            </div>

                            <div className="flex flex-row items-center p-1 gap-4 " key="enddate">
                                <label htmlFor="enddate" className="text-2xl w-[18%] text-[#FFFFFF]">{t('End Date')}</label>
                                    <input
                                        type="date"
                                        id="enddate"
                                        value={editedMember.endDate}
                                        onChange={(e) => setEditedMember(prev => ({ 
                                        ...prev, 
                                        endDate : e.target.value 
                                        }))}
                                        disabled={true}
                                        className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full"
                                />
                            </div>

                            <div className="flex flex-row items-center p-1 gap-4 ">
                                <label htmlFor="daysLeft" className="text-2xl w-[18%] text-[#FFFFFF]">{t('Days Left')}</label>
                                <input
                                    type="text"
                                    id="daysLeft"
                                    value={editedMember.daysLeft ?? ""}
                                    disabled={true}
                                    className={`border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl ${editedMember.daysLeft <= 0 ? 'text-red-800' : 'text-white'} outline-none bg-transparent w-full`}
                                />
                            </div>

                            <div className="flex flex-row items-center p-1 gap-4 ">
                                <label htmlFor="daysLeft" className="text-2xl w-[18%] text-[#FFFFFF]">{t('Paid Amount')}</label>
                                <input
                                    type="text"
                                    id="paidAmmount"
                                    value={editedMember.paidAmount}
                                    disabled={isDisabled}
                                    onChange={(e) => setEditedMember(prev => ({ 
                                        ...prev, 
                                        paidAmount : e.target.value 
                                    }))}
                                    className={`border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl ${renewalData.paidAmount < 2500 ? 'text-red-800' : 'text-white'} outline-none bg-transparent w-full`}
                                />
                            </div>

                        
                         {/*=========== field ============ */}

                    </div>

                </div>

                {isFieldsErr && (
                    <div className="text-red-500 text-lg font-semibold mt-2 px-4">
                        {t('You must fill all the fields')}
                    </div>
                )}

                {isPhoneNum && (
                    <div className="text-red-500 text-lg font-semibold mt-2 px-4">
                       {t('You must enter a valid phone number')}
                    </div>
                )}

                {isMonthsField && (
                    <div className="text-red-500 text-lg font-semibold mt-2 px-4">
                        {t('Months of membership must be a number higher than 0')}
                    </div>
                )}

                {renew && (
                    <div className="text-red-500 text-lg font-semibold mt-2 px-4">
                        {t('Memberships hasnt end yet wait for ')} {member.daysLeft != 1 && member.daysLeft} {i18n.language === 'ar' ? member.daysLeft === 1 ? 'يوم' : member.daysLeft >= 3 && member.daysLeft < 10 ? 'أيام' : 'يوم' : member.daysLeft === 1 ?  'Day' : "Days" }
                    </div>
                )}


                <div className="flex flex-row gap-3 py-5">
                    <button
                        className={`px-4 py-2 text-xl text-[#000000] bg-[#00C4FF] rounded-md btn ${!isDisabled && 'bg-[#7e7d7d]'}`}
                        onClick={() => {
                            if(isDisabled){
                                handleEditInformations();
                            }else{
                                handleSaveInformations()
                            }
                        }}
                        >
                        {isDisabled ? i18n.language === 'ar' ? 'تعديل' : "EDIT" : i18n.language === 'ar' ? 'حفظ' : 'SAVE'} {t('INFORMATIONS')}
                    </button>

                    <button className="px-4 py-2 text-xl text-[#000000] bg-[#4CAF50] rounded-md btn"
                    onClick={() => handleRenewMember()}>
                        {t('RENEW MEMBERSHIP')}
                    </button>

                    <Modal
                        open={renewButton}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{justifySelf:"center", alignSelf:"center"}}>
                            
                            <div className='flex flex-col rounded-xl h-[40vh] w-[33vw] py-7 px-5 gap-5 justify-between' style={{ backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)' }}>
  
                        <div className="flex flex-col gap-3 text-white">

                            <h2 className="text-2xl font-bold">{t('Renew Membership')}</h2>

                            <div className="px-5 py-2 flex flex-row gap-4 items-center">
                            <label htmlFor="startDate" className="w-[20%] text-xl text-[#FFFFFF]">{t('Start Date')}</label>
                            <input
                                type="date"
                                id="startDate"
                                value={renewalData.startDate}
                                onChange={(e) => setRenewalData(prev => ({ ...prev, startDate: e.target.value }))}
                                className="border-1 border-[#00C4FF] rounded-md w-[75%] px-2 py-1 text-xl text-[#FFFFFF] outline-none bg-transparent "
                            />
                            </div>

                            <div className="px-5 py-2 flex flex-row gap-4 items-center">
                                
                                <label htmlFor="months" className="w-[20%] text-xl text-[#FFFFFF]">{t('Number of Months')}</label>
                                <input
                                    type="number"
                                    id="months"
                                    value={renewalData.months}
                                    min={1}
                                    onChange={(e) => setRenewalData(prev => ({ ...prev, months: e.target.value }))}
                                    className="border-1 border-[#00C4FF] rounded-md w-[75%] text-xl text-[#FFFFFF] outline-none bg-transparent px-2 py-1 "
                                />

                            </div>

                            <div className="px-5 py-2 flex flex-row gap-4 items-center">

                                <label htmlFor="endDate" className="w-[20%] text-xl text-[#FFFFFF]">{t('End Date')}</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={renewalData.endDate}
                                    disabled
                                    className="border-1 border-[#00C4FF] rounded-md w-[75%] text-xl text-[#FFFFFF] outline-none bg-transparent px-2 py-1 "
                                />
                            </div>

                        </div>

                        <div className="flex flex-row justify-end gap-3 mt-3">
                            <button className="bg-red-500 text-[white] py-3 px-4.5 rounded-md text-xl btn" onClick={handleClose}>{t('CANCEL')}</button>
                            <button
                            className="bg-[#4CAF50] text-[white] py-3 px-4.5 rounded-md text-xl btn"
                            onClick={() => {
                                handleRenewMemberConfirmation();
                            }}
                            >
                            {t('CONFIRM')}
                            </button>
                        </div>

                        </div>


                    </Modal>

                    <button className="px-4 py-2 text-xl text-[#000000] bg-[#FF6B6B] rounded-md btn"
                    onClick={() => {
                        if(editButton){
                            alert('complete editing informations');
                            return
                        }
                        setRenew(false)
                        setDeleteButton(true);
                    }}>
                        {t('ENDS MEMBERSHIP')}
                    </button>

                    <Modal
                    open={deleteButton}
                    onClose={handleCloseEnd}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{justifySelf:"center", alignSelf:"center"}}>
                    
                    <div className='flex flex-col rounded-xl w-[33vw] py-7 px-5 gap-5 justify-between' style={{ backgroundImage: 'linear-gradient(to bottom, #33334a, #1a1f2e)', direction:dirLan}}>
                        <h2 className="text-2xl font-bold text text-white">{t('Confirm End Membership')}</h2>
                        <p className="text-white text-xl">{t('Are you sure you want to end this membership?')}</p>
                        <div className="flex justify-end gap-3">
                        <button onClick={handleCloseEnd} className="bg-gray-500 rounded-md text-white btn py-4 px-5.5 text-xl ">{t('Cancel')}</button>
                        <button
                            onClick={() => {
                                handleEndsMemberShip()
                            }}
                            disabled={isReqSent}
                            className="bg-red-600 py-4 px-5.5 text-xl rounded-md text-white btn "
                        >
                            {t('Confirm')}
                        </button>
                        </div>
                    </div>
                    </Modal>

                    
                </div>
            </div>

        </div>
    );
}

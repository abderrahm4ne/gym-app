import { NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

export default function MemberPage() {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    const [editedMember, setEditedMember] = useState(null);

    const [fieldsErr, setFieldsErr] = useState(false);
    const [phoneNum, setPhoneNum] = useState(false);
    const [monthsField, setMonthsField] = useState(false);


    const fetchMember = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke("get-member", id);
            if (result.success) {
                setMember(result.member);
                setEditedMember(result.member);
            } else {
                setError(result.error || "Failed to load member");
            }
        } catch (err) {
            setError("Error fetching member data");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMember();
    }, [id]);

    if (error) {
        return <div className="text-red-700 font-bold">{error}</div>;
    }

    if (!member) {
        return <div className="text-xl text-[#00C4FF]">Wait..</div>;
    }

    const handleEditInformations = () => {
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
      phonenumber
    } = editedMember;

    const isEmpty = (str) => String(str).trim() === "";

    setFieldsErr(false);
    setPhoneNum(false);
    setMonthsField(false);

    if (
      isEmpty(firstname) ||
      isEmpty(lastname) ||
      isEmpty(monthsOfMemberShips) ||
      isEmpty(membership) ||
      isEmpty(phonenumber)
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
        if(!validation()){
            return
        }

        const updatedFields = getUpdatedFields(member, editedMember);

        if (Object.keys(updatedFields).length === 0) {
        alert("No changes made.");
        setIsDisabled(true);
        return;
        }

        try{
            const result = await window.electron.ipcRenderer.invoke("update-member", member._id, updatedFields);
            
            if (result.success) {
            alert("Member updated.");
            const updated = { ...member, ...updatedFields };
            setMember({ ...updated });
            setEditedMember({ ...updated });
            setIsDisabled(true);
            } else {
                alert("Update failed: " + result.error);
            }
        }
        catch (err) {
        console.error(err);
        alert("An error occurred while saving.");
        }

    }

    return (
        <div className="flex flex-col px-4 py-1 gap-3">
            <div className="flex flex-row gap-1 items-baseline text-[#FFFFFF]">
                <NavLink to={'/view-all-members'}>ALL MEMBERS</NavLink>
                <p className="text-xl px-2">{'>'}</p>
                <NavLink to={`/view-all-members/${member._id}`}>{(member.firstname).toUpperCase()} {(member.lastname).toUpperCase()}</NavLink>
            </div>

            <div>
                <p className="text-2xl mt-3 text-[#00C4FF]">MEMBER CARD</p>
            </div>

            <div className="w-full border-1 border-[#00C4FF] py-4 px-8 rounded-md flex flex-col gap-5">

                <div className="w-full flex flex-row items-center gap-5">

                    <div className="border-2 border-[#00C4FF] px-2 w-[13%] h-[160px] self-start rounded-sm bg-[#B0B7C4]">
                        {/* Placeholder for profile image */}

                    </div>

                    <div className="flex flex-col h-full w-full gap-1">


                        {/*=========== field ============ */}


                            {[
                                { id: "firstname", label: "First Name" },
                                { id: "lastname", label: "Last Name" },
                                { id: "phonenumber", label: "Phone Number" },
                                { id: "monthsOfMemberShips", label: "Months Of MemberShips" }
                            ].map(field => (
                                <div className="flex flex-row items-center p-1" key={field.id}>
                                    <label htmlFor={field.id} className="text-2xl w-[25%] text-[#FFFFFF]">{field.label}</label>
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

                            <div className="flex flex-row items-center p-1">
                                <label htmlFor="membership" className="text-2xl w-[25%] text-[#FFFFFF]">Membership</label>
                                <select
                                    id="membership"
                                    value={editedMember.membership ?? ""}
                                    onChange={(e) => setEditedMember(prev => ({...prev, 
                                    membership: e.target.value
                                    }))}
                                    disabled={isDisabled}
                                    className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full hover:cursor-pointer"
                                >
                                    <option className='bg-[#2A3042]' value="">Select a type</option>
                                    <option className='bg-[#2A3042]' value="Normal">Normal</option>
                                    <option className='bg-[#2A3042]' value="Premium">Premium</option>
                                </select>
                            </div>

                            <div className="flex flex-row items-center p-1">
                                <label htmlFor="daysLeft" className="text-2xl w-[25%] text-[#FFFFFF]">Days Left</label>
                                <input
                                    type="text"
                                    id="daysLeft"
                                    value={editedMember.daysLeft ?? ""}
                                    disabled={true}
                                    className="border-1 border-[#00C4FF] rounded-md px-2 py-0.5 text-xl text-[#FFFFFF] outline-none bg-transparent w-full"
                                />
                            </div>

                        
                         {/*=========== field ============ */}

                    </div>

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
                        Months of membership must be a number higher than 0
                    </div>
                )}

                <div className="flex flex-row gap-3 py-5">
                    <button
                        className="px-4 py-2 text-xl text-[#000000] bg-[#00C4FF] rounded-md btn"
                        onClick={() => {
                            if(isDisabled){
                                handleEditInformations();
                            }else{
                                handleSaveInformations()
                            }
                        }}
                        >
                        {isDisabled ? 'EDIT' : 'SAVE'} INFORMATIONS
                    </button>
                    <button className="px-4 py-2 text-xl text-[#000000] bg-[#4CAF50] rounded-md btn">
                        RENEW MEMBERSHIP
                    </button>
                    <button className="px-4 py-2 text-xl text-[#000000] bg-[#FF6B6B] rounded-md btn">
                        ENDS MEMBERSHIP
                    </button>
                </div>
            </div>
        </div>
    );
}

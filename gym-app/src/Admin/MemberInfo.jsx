import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';


export default function MemberPage(){

    const {id} = useParams();
    const [member, setMember] = useState(null);
    const [error, setError] = useState("");

    const fetchMember = async () => {
        try {
            const result = await window.electron.ipcRenderer.invoke("get-member", id);
            if (result.success) {
            setMember(result.member);
            } else {
            setError(result.error || "Failed to load member");
            }
        } catch (err) {
            setError("Error fetching member data");
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMember();
    }, [id]);

    if(error){
        return <div className="text-red-700 font-bold">{error}</div>
    }

    if(!member){
        return <div className="text-xl text-[#00C4FF]">Wait..</div>
    }


    return(
        <div>
            im the member of this page {member.firstname} {member.lastname}
        </div>
    )
}
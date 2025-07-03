import { useEffect, useState } from 'react';


export default function ViewAllMembers() {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        window.api.getAllMembers()
        .then(data => setMembers(data))
        .catch(err => console.error(err));
    }, []);

    

    return (
        <div className="felx flex-col items-center">
            <h1 className="text-3xl text-[#FFFFFF] mb-4 px-4">
                All Members
            </h1>
            <ul>
                {members.map(member => (
                <li key={member._id}>
                    {member.name} — {member.membership}
                </li>
        ))}
        </ul>
        </div>
    )
}
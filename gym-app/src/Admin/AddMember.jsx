import { useState } from 'react';

export default function AddMember(){

    const [name, setName] = useState('');
    const [membership, setMembership] = useState('');

    const handleAddMember = async () => {
        const result = await window.electron.ipcRenderer.invoke('add-member', {
            name,
            membership,
        })

    if (result.success) {
      alert(result.message);
      setName('');
      setMembership('');
    } else {
      console.error('Failed to add member:', result.error);
    }

    };

    return(
        <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Add New Member</h2>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Membership Type"
        className="border p-2 mb-2 w-full"
        value={membership}
        onChange={(e) => setMembership(e.target.value)}
      />
      <button
        onClick={handleAddMember}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Member
      </button>
    </div>
    )
}
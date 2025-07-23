import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function Notes() {
    const [note, setNote] = useState("");

    useEffect(() => {
        window.electron.ipcRenderer.invoke("load-note").then((data) => {
            if (data) setNote(data);
        });
    }, []);

    useEffect(() => {
        window.electron.ipcRenderer.send("save-note", note);
    }, [note]);

    const { t, i18n } = useTranslation();

    const fontCon = i18n.language === 'ar' ? '2.5rem' : '2rem'

    const btnFont = i18n.language === 'ar' ? '1.5rem' : '1.2rem'

    return (
        <div className="p-6 text-white h-full flex flex-col gap-2">
            <h1 className="mb-4 px-4" style={{fontSize:fontCon}}>{t('Notes')}</h1>
            <textarea
                name="note"
                id="note"
                className="bg-white text-black w-full h-[60vh] text-xl p-4 resize-none border-[#00C4FF] border-2 rounded-md outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={i18n.language === 'ar' ? "أكتب ملاحظاتك هنا" : "Write your notes here..."}
            />
            <button onClick={() => {
                setNote('')
            }}
            className="text-black bg-[#00C4FF] px-3 py-2 rounded-md btn w-[15%] self-end" style={{fontSize:btnFont}}
            >{t('CLEAR TEXT')}</button>
        </div>
    );
}

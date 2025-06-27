export default function Dashboard(){

    return(
        <div className="h-[100vh] w-[100vw] flex flex-row">
            

                <div className="flex flex-col w-[17%] bg-[#2b2a2a]" style={{borderRight:"1px black solid"}}>
                    
                        <div className="py-5 w-[100%] border-b-2 border-[#FFD8D8]"> 
                            <p className="text-[#FFD8D8] text-xl text-center">GYM SYSTEM  MANAGEMENT</p>
                        </div>

                        <div className="flex flex-row items-center justify-center gap-4 w-[100%] border-b-2 border-[#FFD8D8] py-5">

                            <div className="rounded-[50%] p-3 text-[#2b2a2a] bg-[#FFD8D8]">
                                PIC
                            </div>

                            <div className="">
                                <p className="text-2xl text-[#FFD8D8]">ADMIN SALIM</p>
                            </div>

                            <div className="rounded-[50%]" style={{border:"5px green solid"}}>

                            </div>

                        </div>


                </div>



        </div>
    )
}
import { useParams } from "react-router-dom"
import DashSide from "./dash-side"
import { useEffect, useState } from "react";
import instance from "@/utils/Axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import useUserStore from "@/store";

const SingleCase = () => {

    const { id } = useParams();
    console.log(id)

    const [ data, setData] = useState([]);
    const user = useUserStore((state) => state.user);

    const getCountData = async() => {
        try {
          const response = await instance.get(`/user/getIndividualReport/${id}`);
          if(response.data.success){
            console.log(response.data.data);
            setData(response.data.data);
          }
        } catch (error) {
          toast.error("An Error Occurred.")
          console.log(error);
        }
      }

      const UpdateStatus = async () => {
        try {
          const response = await instance.post(`/user/updateStatus/${id}`) 
          if(response.data.success) {
            toast.success(response.data.message);
            getCountData();
          }else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log("An Error Occurred");
        }
      }
    
      useEffect(() => {
        getCountData();
        // eslint-disable-next-line
      },[id])
    

  return (
    <div className="h-screen flex gap-x-2 w-screen" >
        <DashSide />
        <div className="mt-4 w-4/5 overflow-y-scroll">
            <div className='bg-green w-full p-2 flex justify-between items-center ' >
                <h1 className="text-3xl font-semibold text-slate-800"> Case No: {data.caseId} </h1>
                {user.login.role !== "User" && (
                  <Button variant='destructive' size='sm' className='mr-5' onClick={UpdateStatus} >
                      Change Status
                  </Button>
                )}
            </div>
            <div className='flex mt-2 items-center gap-x-3 ' >
                <img src={data.file?.secure_url || "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740"} alt='' className=' w-[10rem] h-[10rem] rounded-full object-cover'/>
                <div className="flex items-center gap-x-2" >
                    <span className="text-xl font-medium text-slate-700  " >
                        { data.nameOFVictim}
                    </span>
                    <div className={cn(
                            "w-4 h-4 rounded-full bg-red-600",
                            data.isResolved && "bg-green-700"
                        )} />
                </div>
            </div>
            <div className='flex flex-col gap-y-1 w-full ml-2 '>
                <span className='text-slate-600 font-medium' > Description: {data.description}</span>
                <span className='text-slate-600 font-medium' > Reported By: {data.reportedBy}</span>
                <span className='text-slate-600 font-medium' > Status: {data.isResolved === true ? "Resolved" : "Pending"}</span>
                <span className='text-slate-600 font-medium' >Evidence: </span>
                { data.evidence &&  data.evidence.map((a, b)=> (
                    <span key={b} className='text-slate-600 ml-5 font-medium'> - {a}</span>
                ))}
                <span className='text-slate-600 font-medium' >Bully Behaviors: </span>
                { data.bullyBehaviors &&  data.bullyBehaviors.map((a, b)=> (
                    <span key={b} className='text-slate-600 ml-5 font-medium'> - {a}</span>
                ))}
                <span className='text-slate-600 font-medium' >Incident Type: </span>
                { data.incidentType &&  data.incidentType.map((a, b)=> (
                    <span key={b} className='text-slate-600 ml-5 font-medium'> - {a}</span>
                ))}
                <span className='text-slate-600 font-medium' >  Other Evidence: {data.evidenceOther || "N/A"}</span>
            </div>
        </div>
    </div>
  )
}

export default SingleCase
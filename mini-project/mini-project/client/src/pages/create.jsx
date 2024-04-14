import {useState} from "react";
// import useUserStore from "@/store";
// import toast from "react-hot-toast";
// import instance from "@/utils/Axios";
// import { useNavigate } from "react-router-dom";
import DashSide from "@/components/dash-side";
import useUserStore from "@/store";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import instance from "@/utils/Axios";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const Create = () => {

    const user = useUserStore((store) => store.user);
    const nav = useNavigate();

    const bullyData = [ 'cyber bullying' , 'damaged possessions', 'demeaning comments', 'disability', 'excluded', 'hit & run', 'inappropriate touching', 'intimidation of extortion', 'kicked', 'punched', 'racist comment', 'religious sentiments', 'taunting', 'killed' ];
    const incidentTypeData = ['physical', 'relational', 'mental', 'verbal'];
    const evidenceData = ['notes', 'email', 'video', 'audio', 'website', 'others'];

    const generateCaseId = () => {
      const uuid = uuidv4().replace(/-/g, ''); // Remove dashes from UUID
      const numericId = parseInt(uuid, 16).toString().slice(0, 8); // Convert UUID to number and extract first 8 digits
      const sanitizedId = numericId.replace(/\D/g, ''); // Remove non-digit characters (including decimal points)
      return sanitizedId.padStart(8, '0'); // Pad the ID with leading zeros if necessary to ensure it has 8 digits
    };

    const [ report, setReport ] = useState({
      caseId: generateCaseId(),
      nameOfVictim: "",
      file: '',
      incidentType: [], 
      bullyBehavior: [],
      evidence: [], 
      reportedBy: user.login.username,
      evidenceOther: ''
    })

  const setData = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" ) {
        setReport((prevState) => ({
            ...prevState,
            [name]: checked
                ? [...prevState[name], value] // Add value to array if checked
                : prevState[name].filter((item) => item !== value), // Remove value from array if unchecked
        }));
    } else {
        setReport((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
  };  

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
    setReport((prevState) => ({
        ...prevState,
        file: reader.result, // Set the file data in the state
    }));
    };
    reader.onerror = (error) => {
      toast.error(error);
    };
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/createReport", report);
      if(response.data.success) {
        toast.success(response.data.message);
        nav("/dashboard/viewReport");
      } else {
        toast.error(response.data.message);
      } 
    } catch (error) {
      toast.error("An Error Occurred")
    }
  } 

  return (
    <div className="h-screen flex gap-x-2 w-screen">
        <DashSide />
        <div className="mt-4 w-4/5 overflow-y-scroll">
            <h4 className="text-3xl ml-2 font-semibold text-slate-900 ">
                Create a new report 
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-y-4 w-full p-3">
                <div className=" flex flex-col gap-y-1 " >
                    <label className="font-medium text-slate-800" htmlFor="role">Case Id:</label>
                    <input type='text' className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="caseId" value={report.caseId} onChange={setData} disabled />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Name of Victims:</label>
                    <input type='text'  className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="nameOfVictim" value={report.nameOfVictim} onChange={setData}  />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Reported By:</label>
                    <input className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="reportedBy" value={user.login.username} onChange={setData} disabled />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Image:</label>
                    <input type='file' className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="file" onChange={handleImageChange} />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Incident Type:</label>
                    {incidentTypeData.map((incidentType) => (
                        <div key={incidentType} className="flex items-center gap-x-2" >
                            <input type='checkbox' name="incidentType" value={incidentType} checked={report.incidentType.includes(incidentType)} onChange={setData} />   
                            <span>{incidentType}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Bully Behavior</label>
                    {bullyData.map((bully) => (
                        <div key={bully} className="flex items-center gap-x-2" >
                            <input type='checkbox' name="bullyBehavior" value={bully} checked={report.bullyBehavior.includes(bully)} onChange={setData} />   
                            <span>{bully}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Evidence</label>
                    {evidenceData.map((evidence) => (
                        <div key={evidence} className="flex items-center gap-x-2" >
                            <input type='checkbox' name="evidence" value={evidence} checked={report.evidence.includes(evidence)} onChange={setData} />   
                            <span>{evidence}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Other Evidences:</label>
                    <input className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="evidenceOther" value={report.evidenceOther} onChange={setData} />   
                </div>
                <Button type='submit' size='sm' variant='default'>
                        Submit Report
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Create


import {useState} from "react";
import DashSide from "@/components/dash-side";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import instance from "@/utils/Axios";
import { useNavigate } from "react-router-dom";

const CreateOfficer = () => {

    const nav = useNavigate();

    const [ report, setReport ] = useState({
        name: "",
        role: '',
        username: '', 
        email: '',
        password: '', 
        batch: '',
        department: "",
        rank: ''
    })
    const setData = (e) => {
        const { name, value} = e.target;
        setReport((prevState) => ({
        ...prevState,
        [name]: value,
            }));
        } 
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
        const response = await instance.post("/user/createOfficer", report);
        if(response.data.success) {
            toast.success(response.data.message);
            nav("/dashboard");
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
                Add a new officer
            </h4>
            <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-y-4 w-full p-3">
                <div className=" flex flex-col gap-y-1 " >
                    <label className="font-medium text-slate-800" htmlFor="role">Name:</label>
                    <input type='text' className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="name" value={report.name} onChange={setData}  />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Username:</label>
                    <input type='text'  className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="username" value={report.username} onChange={setData}  />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Email Id:</label>
                    <input className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="email" type='email' value={report.email} onChange={setData}  />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Password:</label>
                    <input className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="password" type='password'  value={report.password} onChange={setData}  />   
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Role:</label>
                    <select name="role" value={report.role} className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" onChange={setData} >
                      <option value=""> Select Role </option>
                      <option value="Officer"> Officer </option>
                    </select>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="">Rank:</label>
                    <select name="rank" value={report.rank} className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" onChange={setData}>
                        <option value=""> Select Rank </option>
                        <option value="Senior Inspector"> Senior Inspector</option>
                        <option value="Junior Inspector"> Junior Inspector </option>
                        <option value="Constable"> Constable</option>
                        <option value="Head Constable">Head Constable</option>
                        <option value="Sub Inspector">Sub Inspector</option>
                        <option value="Commissioner">Commissioner</option>
                        <option value="Deputy Inspector">Deputy Inspector</option>
                    </select>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="">Department:</label>
                    <select name="department" value={report.department} className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" onChange={setData}>
                    <option value="">Select Department</option>
                    <option value="Crime Investigation Department">Crime Investigation Department</option>
                    <option value="Anti-Terrorist Squad">Anti-Terrorist Squad</option>
                    <option value="State Intelligence Department">State Intelligence Department</option>
                    <option value="Maharashtra Highway Police">Maharashtra Highway Police</option>
                    <option value="Rapid Action Force">Rapid Action Force</option>
                    <option value="Railway Police Force">Railway Police Force</option>
                    <option value="State Reserve Police Force">State Reserve Police Force</option>
                    <option value="Training & Special Units">Training & Special Units</option>
                    <option value="Protection of Civil Rights">Protection of Civil Rights</option>
                    </select>
                </div>

                <div className="flex flex-col gap-y-1">
                    <label className="font-medium text-slate-800" htmlFor="role">Batch</label>
                    <input className="w-full border border-slate-400 px-2 py-1 text-sm text-slate-800 rounded-sm cursor-pointer" name="batch" value={report.batch} onChange={setData} />   
                </div>
                <Button type='submit' size='sm' variant='default'>
                        Submit
                </Button>
            </form>
        </div>
    </div>
  )
}

export default CreateOfficer;


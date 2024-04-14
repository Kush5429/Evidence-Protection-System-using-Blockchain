import { ClipboardCheckIcon, ClipboardIcon, ClipboardMinusIcon, LayoutDashboardIcon} from "lucide-react"
import {useState, useEffect} from "react";
import instance from "@/utils/Axios";
import toast from "react-hot-toast";
import MapTable  from "@/components/data-table";
import DashSide from "@/components/dash-side";

const Dashboard = () => {
  const [count, setCount] = useState();

  const getCountData = async() => {
    try {
      const response = await instance.get("/user/getCasesCount");
      if(response.data.success){
        console.log(response.data.data);
        setCount(response.data.data);
      }
    } catch (error) {
      toast.error("An Error Occurred.")
      console.log(error);
    }
  }

  useEffect(() => {
    getCountData();
  },[])

  return (
    <div className="h-screen flex gap-x-2 w-screen">
        <DashSide />
        <section className="min-h-screen w-4/5 px-2 py-3 transition-all overflow-y-scroll">
            <div className="z-13 ">
                <div>
                    <div className="flex items-center mt-12 ">
                        <LayoutDashboardIcon className="mr-2 w-6 h-6 relative " />
                        <span className="text-xl font-medium text-slate-900">Dashboard</span>
                    </div>
    
                    <div className="flex items-center mt-2 gap-3 flex-wrap ">
                        <div className="flex flex-col items-center rounded-sm px-4 py-5 bg-slate-200 transition-colors w-1/3">
                            <ClipboardIcon className="w-8 h-8 text-slate-500" />
                            <span className="text-xl font-medium text-slate-800 whitespace-nowrap  ">Total Reports</span>
                            <span className="text-xl font-medium text-slate-800 ">{count?.getTotalCount}</span>
                        </div>
                        <div className="flex flex-col items-center rounded-sm px-4 py-5 transition-colors w-1/3 bg-blue-200 ">
                            <ClipboardCheckIcon className="w-8 h-8 text-slate-500" />
                            <span className="text-xl font-medium text-slate-800 whitespace-nowrap  ">Total Cases Resolved </span>
                            <span className="text-xl font-medium text-slate-800 ">{count?.getResolvedCount}</span>
                        </div>
                        <div className="flex flex-col items-center rounded-sm px-4 py-5 bg-red-200 transition-colors w-1/3">
                            <ClipboardMinusIcon className="w-8 h-8 text-slate-500"  />
                            <span className="text-xl font-medium text-slate-800 whitespace-nowrap  ">Total Cases Pending</span>
                            <span className="text-xl font-medium text-slate-800 ">{count?.getUnResolvedCount}</span>
                        </div>
                    </div>
                </div>
                <div className="activity">
                    <div className="mt-3">
                        <i className="uil uil-clock-three"></i>
                        <span className="text-xl font-medium text-slate-800 whitespace-nowrap  ">Recent Activity</span>
                    </div>
                    <div className="overflow-x-auto w-full">
                      <MapTable />
                    </div>
                </div>
            </div>
        </section>    
    </div>
    )
}

export default Dashboard
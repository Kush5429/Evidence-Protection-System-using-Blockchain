import DashSide from "@/components/dash-side"
import MapTable from "@/components/data-table"
import useUserStore from "@/store"

const ViewReport = () => {
  const user = useUserStore((state) => state.user);
  
  return (
    <div className="h-screen flex gap-x-2 w-screen">
        <DashSide />
        <div className="mt-4 w-4/5 overflow-y-scroll">
            <h4 className="font-medium mb-3" >View Reports</h4>
            {user.login.role !== "User" ? <>
              <button>Create Report</button>
            </> : ""}
            <MapTable />
        </div>
    </div>
  )
}

export default ViewReport
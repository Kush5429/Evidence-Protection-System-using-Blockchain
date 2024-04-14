import useUserStore from '@/store'
import { BarChart, Clipboard, Database, Home, LayoutDashboard, LogOut, MoonIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const DashSide = () => {

    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const setLoggedIn = useUserStore((state) => state.setLoggedIn)
    const nav = useNavigate();

    const handleLogout = () => {
      try{
        toast.success("LoggedOut SuccessFully");
        setLoggedIn(false);
        setUser("");
        nav("/");
      }catch(error) {
        console.log("An Error Occurred");
      }
    }
  return (
    <nav className="min-w-[200px] w-1/5 px-1 py-3 bg-slate-50 border-r h-full overflow-hidden border-slate-300 transition" >  
    <div className="flex ml-3 items-center">
        <div className="text-xl font-medium text-slate-800 ">
          Evidence Portal
        </div>
    </div>

    <div className="mt-2 ml-3 flex flex-col justify-between ">
        <ul className="nav-links">
            <Link to='/dashboard' className="list-none hover:bg-slate-200 transition-colors " >
              <a className="flex items-center h-[50px] relative" href="#">
                <LayoutDashboard className="h-4 w-4 mr-2 text-slate-600 " />
                <span className="text-sm font-medium text-slate-600 ">Dashboard</span>
              </a>
            </Link>
            <Link to='/dashboard/viewReport' className="list-none hover:bg-slate-200 transition-colors " >
              <a className="flex items-center h-[50px] relative" href="#">
                <Database className="h-4 w-4 mr-2 text-slate-600 "/>
                <span className="text-sm font-medium text-slate-600 ">View Report</span>
              </a>
            </Link>
            {user.login.role !== "User" && (
              <Link to='/dashboard/create' className="list-none hover:bg-slate-200 transition-colors " >
                <a className="flex items-center h-[50px] relative" href="#">
                  <Clipboard className="h-4 w-4 mr-2 text-slate-600 " />
                  <span className="text-sm font-medium text-slate-600 ">Create Report</span>
              </a>
              </Link>
            )}
            {user.login.role === "Super Officer" && (
              <Link to='/dashboard/createOfficer' className="list-none hover:bg-slate-200 transition-colors " >
                <a className="flex items-center h-[50px] relative" href="#">
                  <BarChart className="h-4 w-4 mr-2 text-slate-600 " />
                  <span className="text-sm font-medium text-slate-600 ">Create Officer</span>
              </a>
              </Link>
            )}

        </ul>
        
        <ul className="pt-2 border-t border-slate-300 ">
            <Link to='/' className="list-none hover:bg-slate-200 transition-colors" >
              <div className="flex items-center h-[50px] relative">
                <Home className="h-4 w-4 mr-2 text-slate-600 " />
                <span className="text-sm font-medium text-slate-600 ">Home</span>
              </div>
            </Link>
            <li className="list-none hover:bg-slate-200 transition-colors" onClick={handleLogout}  >
              <div className="flex items-center h-[50px] relative">
                <LogOut className="h-4 w-4 mr-2 text-slate-600 " />
                <span className="text-sm font-medium text-slate-600 ">Logout</span>
              </div>
            </li>
            <li className="flex items-center">
                <a className="flex items-center h-[50px] relative" href="#">
                    <MoonIcon className="h-4 w-4 mr-2 text-slate-600 " />
                <span className="text-sm font-medium text-slate-600 ">Dark Mode</span>
            </a>
            <div className="absolute right-3 h-[3rem] min-w-[3rem] flex items-center justify-center cursor-pointer ">
              <span className="relative inline-block h-6 w-10 rounded-md bg-white "></span>
            </div>
        </li>
        </ul>
    </div>
</nav>
)
}

export default DashSide
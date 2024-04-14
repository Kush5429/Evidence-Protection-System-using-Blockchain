import NavbarMobile from "@/components/navbar-mobile";
import { Button } from "@/components/ui/button"
import useUserStore from "@/store";
import { Link, useNavigate } from "react-router-dom"

const IndexPage = () => {

    const navigate = useNavigate();
    const onClick = () => {
        navigate("/login");
    }
    const loggedIn = useUserStore((state) => state.loggedIn);
    const user = useUserStore((state) => state.user);

    return (
        <div className='h-screen w-screen flex flex-col bg-slate-200 p-6'>
            <div className="flex items-center justify-between h-12 ">
                <span className="text-sm md:text-xl text-slate-800 font-medium">
                    Evidence Portal
                </span>
                <div className="hidden md:flex items-center text-sm gap-6 list-none font-medium ">
                    <span className=" font-medium text-sm ">Home</span>
                    {loggedIn ? (
                        <>                    
                            <Link className=" text-slate-900 font-medium text-sm " to='/dashboard'>Dashboard</Link>
                            <span className=" text-slate-900 underline ">
                                {user.login.username}
                            </span>
                        </>
                    ) : (
                    <Button variant='default' size='sm' type='button' onClick={onClick}>
                        Login
                    </Button>
                    )}
                </div>
                <div className="block md:hidden " >
                    <NavbarMobile />
                </div>
            </div>
            <div className="w-screen h-full" >
                <div className="w-4/5 md:w-[25rem] h-[15rem] flex items-center justify-center mt-12 rounded-xl ">
                    <img src="https://img.freepik.com/free-vector/real-estate-searching-with-man-magnifier_23-2148650839.jpg?w=740" alt=""  className="w-full h-full object-cover rounded-xl " />
                </div>
            </div>
        </div>
    )
}

export default IndexPage
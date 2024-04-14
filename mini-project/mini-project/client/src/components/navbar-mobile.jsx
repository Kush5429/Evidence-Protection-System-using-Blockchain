import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import useUserStore from "@/store";
import { MenuIcon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const NavbarMobile = () => {

  const navigate = useNavigate();
  const onClick = () => {
      navigate("/login");
  }
  const loggedIn = useUserStore((state) => state.loggedIn);
  const user = useUserStore((state) => state.user);


  return (
    <Sheet>
      <SheetTrigger asChild>
          <MenuIcon className="block md:hidden h-5 w-5 " />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className={'mt-7'} >
          <SheetTitle>Evidence Portal</SheetTitle>
          <SheetDescription>
            Your Go-to app to secure your evidences.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
                <span className="grid grid-cols-4 items-center gap-4 font-medium text-sm ">Home</span>
                {loggedIn ? (
                    <>                    
                        <Link className="grid grid-cols-4 items-center gap-4 text-slate-900 font-medium text-sm " to='/dashboard'>Dashboard</Link>
                        <span className="grid grid-cols-4 items-center gap-4 text-slate-900 underline ">
                            {user.login.username}
                        </span>
                    </>
                ) : (
                <Button variant='default' size='sm' type='button' onClick={onClick}>
                    Login
                </Button>
                )}
            </div>
      </SheetContent>
    </Sheet>
  )
}

export default NavbarMobile
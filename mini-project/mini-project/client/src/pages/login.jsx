import {useState, useEffect} from 'react'
import toast from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom';
import instance from '@/utils/Axios';
import useUserStore from '@/store';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const loggedIn = useUserStore((state) => state.loggedIn);
  const setLoggedIn = useUserStore((state) => state.setLoggedIn);
  const setUser = useUserStore((state) => state.setUser);

  const setData = (e) => {
    const {name, value} = e.target;
    setLogin((preVal) => {
      return {
        ...preVal,
        [name]: value,
      }
    })
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/login",{
        email: login.email,
        password: login.password,
      });
      if(response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.data);
        setLoggedIn(true);
        nav("/");
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An Error Occurred")
      console.log("An Error Occurred")
    }
  }

  useEffect(() => {
    if(loggedIn){
      nav('/')
    }
  },[loggedIn, nav])
  return (
    <div className='h-screen w-screen flex items-center bg-slate-200 justify-center'>
        <div className=" max-w-[25rem] w-[25rem] shadow-sm bg-white rounded-md p-3 flex flex-col gap-x-2">
            <span className='text-xl font-medium text-center text-slate-900' >
                Welcome back to Evidence Portal
            </span>
            <p className='text-sm font-medium text-center text-slate-800 mb-4 '>
                Your go-to app to protect your data. <br/>
                Login Now!!                 
            </p>
            <form onSubmit={handleLogin} className='flex w-full flex-col gap-y-3 ' >
                <div className='flex flex-col gap-x-2 '>
                    <label className='text-sm text-slate-800 font-medium mb-1' htmlFor="">Email</label>
                    <input className='px-2 py-1 text-sm outline-1 rounded-md border border-slate-300 '  type="email" name='email' value={login.email} onChange={setData} placeholder='eg. honey123@gmail.com' />
                </div>
                <div className='flex flex-col gap-x-2 '>
                    <label className='text-sm text-slate-800 font-medium mb-1' htmlFor="">Password</label>
                    <input className='px-2 py-1 text-sm outline-1 rounded-md border border-slate-300'  type="password" name='password' value={login.password} onChange={setData} placeholder='Add a secured password here!' />
                </div>
                <Button type='submit' variant='default' size='sm' >
                    Sign In
                </Button>
            </form>
            <div  className='flex items-center justify-between mt-3 ' >
                <span className='text-sm text-slate-600 font-medium '>
                    Don&apos;t have a account?   
                    <Link to='/register'>
                        Register
                    </Link>
                </span>
                <Link to='/' className='text-sm text-slate-600 font-medium '>
                    Home
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login
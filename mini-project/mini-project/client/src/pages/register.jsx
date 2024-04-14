import {useState} from 'react'
import toast from "react-hot-toast"
import { Link, useNavigate } from 'react-router-dom';
import instance from '@/utils/Axios';
import useUserStore from '@/store';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const loggedIn = useUserStore((state) => state.loggedIn);
  const nav = useNavigate();
  
  const setData = (e) => {
    const {name, value} = e.target;
    setRegister((preVal) => {
      return{
        ...preVal,
        [name]: value,
      }
    })
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/user/create",{
        username: register.username,
        email: register.email,
        password: register.password,
      });
      if(response.data.success) {
        toast.success(response.data.message);
        nav("/login");
      }else {
        toast.error(response.data.message);
      } 
    } catch (error) {
      toast.error("An Error Occurred")
    }
  } 
  useEffect(() => {
    if(loggedIn) {
      nav("/");
    }
  },[nav, loggedIn])
  return (
    <div className='h-screen w-screen flex items-center bg-slate-200 justify-center'>
        <div className=" max-w-[25rem] w-[25rem] shadow-sm bg-white rounded-md p-3 flex flex-col gap-x-2">
            <span className='text-xl font-medium text-center text-slate-900' >
                Welcome to Evidence Portal
            </span>
            <p className='text-sm font-medium text-center text-slate-800 mb-4 '>
                Your go-to app to protect your data. <br/>
                Register Now!!                 
            </p>
            <form onSubmit={handleRegister} className='flex w-full flex-col gap-y-3 ' >
                <div className='flex flex-col'>
                    <label className='text-sm text-slate-800 font-medium mb-1' htmlFor="">UserName</label>
                    <input className='px-2 py-1 text-sm outline-1 rounded-md border border-slate-300 '  type="text" name='username' value={register.username} onChange={setData} placeholder='eg. @honey123' />
                </div>
                <div className='flex flex-col gap-x-2 '>
                    <label className='text-sm text-slate-800 font-medium mb-1' htmlFor="">Email</label>
                    <input className='px-2 py-1 text-sm outline-1 rounded-md border border-slate-300 '  type="email" name='email' value={register.email} onChange={setData} placeholder='eg. honey123@gmail.com' />
                </div>
                <div className='flex flex-col gap-x-2 '>
                    <label className='text-sm text-slate-800 font-medium mb-1' htmlFor="">Password</label>
                    <input className='px-2 py-1 text-sm outline-1 rounded-md border border-slate-300'  type="password" name='password' value={register.password} onChange={setData} placeholder='Add a secured password here!' />
                </div>
                <Button type='submit' variant='default' size='sm' >
                    Register
                </Button>
            </form>
            <div  className='flex items-center justify-between mt-3 ' >
                <span className='text-sm text-slate-600 font-medium '>
                    Already have a account?   
                    <Link to='/login'>
                        Login
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

export default Register
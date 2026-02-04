import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Quote } from 'lucide-react';
import photo from '../assets/photo.jpg';
import avatar from '../assets/avatar.jpg';
import { useState } from 'react';
import axios from 'axios'
import { signinInput, type SigninType } from 'pallavi-common';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Signin = () => {
  const navigate=useNavigate()
  const [postInputs,setPostInputs]=useState<SigninType>({
      email:"",
      password:""
  })
  const signinHandler=async(e:React.FormEvent)=>{
    e.preventDefault()
    const parsed = signinInput.safeParse(postInputs);
    if (!parsed.success) {
      alert(parsed.error.issues[0].message);
      return;

    }
    try{
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      localStorage.setItem("token",response.data.token)
      navigate("/blogs")
      
    }
    catch(err:any){
      console.log(err.response.data)
    }
  }
  return (
    <div className="h-screen w-full bg-slate-200 p-6 md:p-10 lg:p-16 flex items-center justify-center overflow-hidden font-sans">
      
      <div className="w-full max-w-5xl h-full max-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-row">
        
        {/* LEFT SIDE */}
        <div className="relative sm:hidden md:block lg:flex w-1/2 h-full flex-col items-center justify-center p-12 text-center">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={photo}
            alt="Creative workspace"
          />

          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 opacity-80 text-white">
              <Quote size={40} strokeWidth={1} />
            </div>

            <h1 className="text-5xl font-serif font-bold text-white leading-tight tracking-tight mb-6">
              Welcome <br /> Back.
            </h1>

            <div className="w-16 h-1 bg-white/40 mb-8 rounded-full" />

            <p className="max-w-xs text-lg text-white/90 font-light italic leading-relaxed mb-10">
              "Pick up right where you left off — your reads are waiting."
            </p>

            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img 
                  src={avatar} 
                  className="h-14 w-14 rounded-full border-2 border-white shadow-xl object-cover" 
                  alt="Author" 
                />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm tracking-wide">Sarah Jenkins</p>
                <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Editorial Lead
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="flex-1 h-full flex flex-col justify-center px-10 lg:px-16 bg-white">
          <div className="w-full">

            <header className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Sign in to your account
              </h2>
              <p className="text-slate-500 mt-2 text-sm">
                Welcome back — please enter your details.
              </p>
            </header>

            <form className="space-y-6" onSubmit={signinHandler}>

              {/* EMAIL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-0 top-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="email"
                    onChange={(e)=>{setPostInputs({...postInputs,email:e.target.value})
                  }}
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 text-slate-900 focus:border-indigo-600 transition-all outline-none"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-0 top-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    
                    onChange={(e)=>{setPostInputs({...postInputs,password:e.target.value})
                  }}
                    className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 text-slate-900 focus:border-indigo-600 transition-all outline-none"
                  />
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-between group rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 shadow-lg shadow-slate-200" type="submit">
                <span>Sign In</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <footer className="mt-10 pt-6 border-t border-slate-50">
              <p className="text-sm text-slate-500">
                Don’t have an account?{' '}
                <Link to="/signup" className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                  Create one
                </Link>
              </p>
            </footer>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signin;

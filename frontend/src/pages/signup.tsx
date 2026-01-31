import { Link,useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Quote } from 'lucide-react';
import { signupInput, type SignupType } from 'pallavi-common';
import photo from '../assets/photo.jpg';
import avatar from '../assets/avatar.jpg';
import { useState } from 'react';
import axios from "axios"


const Signup = (type:"signup") => {
  
const navigate=useNavigate()
const [postInputs,setPostInputs]=useState<SignupType>({
  name:undefined,
  email:"",
  password:""

})
async function signupHandler(e:React.FormEvent){
  e.preventDefault();
  const parsed = signupInput.safeParse(postInputs);

  if (!parsed.success) {
    alert(parsed.error.issues[0].message);
    return;
  }
    
    try{
  const response=await axios.post("https://backend.singhpallavi8195.workers.dev/api/v1/user/signup",postInputs);
  

  localStorage.setItem("token",response.data.token);
  localStorage.setItem("username",postInputs.name||"User")
  navigate("/signin")
  }
  catch(err:any){
    console.log(err.response?.data||err.message)
  }

}
  return (
    // Fixed viewport with background padding (the outer margin)
    <div className="h-screen w-full bg-slate-200 p-6 md:p-10 lg:p-16 flex items-center justify-center overflow-hidden font-sans">
      
      {/* Centered Container: Max width & Fixed height to prevent scrolling */}
      <div className="w-full max-w-5xl h-full max-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-row">
        
        {/* LEFT SIDE: Professional Imagery (50% width) - IMPROVED CENTERED DESIGN */}
        <div className="relative sm:hidden md:block lg:flex w-1/2 h-full flex-col items-center justify-center p-12 text-center">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={photo}
            alt="Minimalist Blog Design"
          />
          {/* Professional Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
          
          {/* Centered Content Block */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Minimalist Icon/Accent */}
            <div className="mb-6 opacity-80 text-white">
              <Quote size={40} strokeWidth={1} />
            </div>

            <h1 className="text-5xl font-serif font-bold text-white leading-tight tracking-tight mb-6">
              Design <br /> Perspectives.
            </h1>

            {/* Elegant Divider */}
            <div className="w-16 h-1 bg-white/40 mb-8 rounded-full" />

            <p className="max-w-xs text-lg text-white/90 font-light italic leading-relaxed mb-10">
              "Curated thoughts and deep dives for the modern, curious reader."
            </p>
            
            {/* Author Profile - Centered */}
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
                <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold">Chief Editor</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Form (50% width) */}
        <div className="flex-1 h-full flex flex-col justify-center px-10 lg:px-16 bg-white">
          <div className="w-full">
            {/* Header */}
            <header className="mb-10">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Sign Up</h2>
              <p className="text-slate-500 mt-2 text-sm">Join the community for exclusive weekly reads.</p>
            </header>

            <form className="space-y-6" onSubmit={signupHandler}>

              {/* name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-0 top-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    onChange={(e)=>{setPostInputs({...postInputs, name:e.target.value === "" ? undefined : e.target.value})
                  }}
                    className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 text-slate-900 focus:border-indigo-600 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-0 top-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="name@email.com"
                    onChange={(e)=>{setPostInputs({...postInputs, email:e.target.value})
                  }}
                    className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 text-slate-900 focus:border-indigo-600 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-0 top-3 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    onChange={(e)=>{setPostInputs({...postInputs,password:e.target.value})
                  }}
                    className="w-full bg-transparent border-b-2 border-slate-100 py-3 pl-8 text-slate-900 focus:border-indigo-600 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full mt-4 flex items-center justify-between group rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-600 shadow-lg shadow-slate-200" type="submit">
                <span>Create Account</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <footer className="mt-10 pt-6 border-t border-slate-50">
              <p className="text-sm text-slate-500">
                Already a member?{' '}
                <Link to="/signin" className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                  Log in
                </Link>
              </p>
            </footer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
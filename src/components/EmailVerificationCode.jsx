import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_BACKEND_URL from "../utils/API.JSX";
import { toast } from "react-toastify";

export default function EmailVerificationCode() {
    const inputsRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const handleNumberOnlyInput = (e) => {
        if (isNaN(e.key)) {
            e.preventDefault();
            return;
        }
    }
    const setOtpVal = (e) => {
      //  setOtp((prev) => prev + e.target.value);
    }
    const handleKeyup = (e) => {
        if(e.keyCode >= 48 && e.keyCode <= 57  || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode === 39){
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.focus();
        }
    }
        if (e.keyCode === 8) {
            e.target.value = null;
            if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        }
         if (e.keyCode === 37) {
             if (e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        }
    }


    const sendOtp = () =>{
        if(location.state == null){
            toast.error("Email is not present");
            return;
        }
        getOtp();
        if(otp === ''){
             toast.error("Otp not provided");
            return;
        }
        const verification = {
            email:location.state.email,
            verificationCode:Number(otp)
        }
        axios.post(`${API_BACKEND_URL}/auth/verify`,verification)
        .then((response)=>{
            toast.success(response.data.message);
            if(location?.state?.PrevURL != null){
                navigate("/signIn");
            }
          }).catch((error)=>{
            if(error.response.data.status == 200){
                toast.success("Account is already verified");
                return;
            }
            toast.error(error.response.data.message)
            console.log(error);
        })
    }
    const getOtp = () => {
        let inputs = document.querySelectorAll(".input");
        if(otp != null) setOtp("");
        inputs.forEach((e)=>{
            setOtp((prev) => prev + e.value);
        });
    }

    const resendVerificationCode = () => {
         if(location.state == null){
            toast.error("Email is not present");
            return;
        }
        axios.post(`${API_BACKEND_URL}/auth/resendVerificationCode?email=${location.state.email}`)
        .then((response)=>{
            toast.success(response.data.message);
            console.log(response)
        }).catch((error)=>{
            toast.error(error.response.data.message);
            console.log(error);
        })
    }

    return (
        <div className="flex items-center h-[100dvh] bg-slate-50">
            <div className="max-w-10/12 bg-white shadow-lg sm:max-w-7xl mx-auto text-center rounded-2xl">
                <div>
                    <h1 className="overflow-hidden text-ellipsis text-2xl sm:text-3xl font-sans font-bold mt-12 pb-1.5 px-4">Email Verification</h1>
                    <p className="overflow-hidden text-ellipsis mx-auto px-12 mt-2 max-w-[436px] text-slate-500">Enter the 4-digit verification code that was sent to your email.</p>
                    <div ref={inputsRef} className="inputs flex justify-center gap-3 mt-5 mb-5">
                        <input type="text" id="0" className="input bg-slate-100 max-w-2/12 sm:max-w-14 h-14 rounded-md text-center text-2xl font-bold" maxLength={1} onKeyDown={(e) => handleNumberOnlyInput(e)} onChange={(e) => { setOtpVal(e) }} onKeyUp={(e) => handleKeyup(e)} />
                        <input type="text" id="1" className="input bg-slate-100 max-w-2/12 sm:max-w-14 h-14 rounded-md text-center text-2xl font-bold" maxLength={1} onKeyDown={(e) => handleNumberOnlyInput(e)} onChange={(e) => { setOtpVal(e) }} onKeyUp={(e) => handleKeyup(e)} />
                        <input type="text" id="2" className="input bg-slate-100 max-w-2/12 sm:max-w-14 h-14 rounded-md text-center text-2xl font-bold" maxLength={1} onKeyDown={(e) => handleNumberOnlyInput(e)} onChange={(e) => { setOtpVal(e) }} onKeyUp={(e) => handleKeyup(e)} />
                        <input type="text" id="3" className="input bg-slate-100 max-w-2/12 sm:max-w-14 h-14 rounded-md text-center text-2xl font-bold" maxLength={1} onKeyDown={(e) => handleNumberOnlyInput(e)} onChange={(e) => { setOtpVal(e) }} onKeyUp={(e) => handleKeyup(e)} />
                    </div>
                    <button onClick={()=>sendOtp()} className="rounded-lg bg-indigo-500 text-white font-medium px-[2em] sm:px-28 py-1.5 mb-3 hover:bg-indigo-600 transition-colors duration-150 cursor-pointer">Verify</button>
                    <p className="mb-12">Didn't receive code? <span onClick={()=>{resendVerificationCode()}} className="font-medium text-indigo-600 hover:cursor-pointer">Resend</span></p>
                </div>
            </div>
        </div>
    )
} 
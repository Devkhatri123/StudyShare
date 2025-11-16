import { Copy, X } from "lucide-react";
import { useEffect } from "react";

export default function SupportMeModal({ setOpen, open }) {

    useEffect(()=>{
     document.body.style.overflowY = "hidden";
     return () => document.body.style.overflowY = "scroll";
    },[open])

    const handleCopy = () => {
        navigator.clipboard.writeText("+923325217983");
        alert("Account number copied!");
    };
    return (
        <div>
         {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-trans bg-opacity-50 z-50">
                    <div className="bg-white sm:rounded-2xl sm:w-80 p-6 relative shadow-xl border border-gray-200 h-full rounded-0 w-full sm:h-fit ">
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>


                        <h2 className="text-xl font-semibold text-center mb-4">
                            Support Me via Easypaisa to keep this site live
                        </h2>
                      <div className="flex justify-center mb-4">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDU8_jFLCtBXPa8tWBUbcEgheNpMWdvYRoQ&s"
                                alt="Easypaisa Logo"
                                className="w-28 h-auto"
                            />
                        </div>

                   {/* Account Info */}
                        <div className="bg-gray-100 p-4 rounded-xl text-center mb-4">
                            <p className="text-gray-600 text-sm">Easypaisa Account</p>
                            <p className="font-bold text-lg text-green-700">+923325217983</p>
                            <p className="text-gray-500 text-sm mt-1">Dev khatri</p>
                        </div>
                       <button
                            onClick={handleCopy}
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-xl"
                        >
                            <Copy className="w-4 h-4" /> Copy Account Number
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
"use client"

import { useEffect, useState } from "react"
import { Eye, EyeOff, BookOpen, ChevronDown } from "lucide-react"
import { useError } from "../ContextApi/ErrorContext"
import { isValidEmail } from "../utils/Validation";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import API_BACKEND_URL from "../utils/API";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedSemester, setselectedSemester] = useState("")
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [selectedGender, setselectedGender] = useState("")
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false)
  const [selectedDepartment, setselectedDepartment] = useState("")
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const [ErrorMsg, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegistrationCompleted, setIsRegistrationCompleted] = useState(false);

  const [user, setUser] = useState({
    fullname: "",
    universityEmail: "",
    contact:"",
    semester: "",
    gender: "",
    department: "",
    password: "",
    confirmPassword: ""
  });

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const genders = ["Male", "Female", "Other"];
  const departments = ["CS", "CE"];

  const submitForm = async () => {
    if (!Validation()) {
      return;
    }
    if (!isValidEmail(user.universityEmail)) {
      setError("Email is not valid");
      return;
    }
    setError(null);
    user.semester = Number(user.semester);
    setLoading(true);
    await axios.post(`${API_BACKEND_URL}/auth/signUp`, user).then((response) => {
      console.log(response);
      navigate("/verify",{state:{email:user.universityEmail,PrevURL:location.pathname}});
    }).catch((error) => {
      toast.error(error.response.data.message);
      console.log(error);
    }).finally(() => {
      setLoading(false);
    })
  }

  const Validation = () => {
    if (user.fullname.length == 0) {
      setError("Full name input is empty");
      return false;
    }
    else if (user.universityEmail.length == 0) {
      setError("Email input is empty");
      return false;
    }
    else if (user.semester.length == 0) {
      setError("Semester not selected");
      return false;
    }
    else if (user.gender.length == 0) {
      setError("Gender not selected");
      return false;
    }
    else if (user.department.length == 0) {
      setError("Department not selected");
      return false;
    }
    else if (user.password.length == 0) {
      setError("Password input is empty");
      return false;
    }
    else if (user.confirmPassword.length == 0) {
      setError("Confirm password input is empty");
      return false;
    }
    else if (user.confirmPassword !== user.password) {
      setError("Password doesn't match");
      return false;
    }
    return true;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">StudyShare</span>
        </div>

        {/* Main heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
          {ErrorMsg && (
            <ErrorMessage Msg={ErrorMsg} />
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 pb-4">
            <h2 className="text-lg font-semibold text-gray-900">Join StudyShare</h2>
            <p className="text-sm text-gray-600 mt-1">Fill in your details to create an account</p>

          </div>

          <div className="px-6 pb-6">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); }}>
              {/* Name fields */}
              <div>
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={user.fullname}
                    onChange={((e) => { setUser({ ...user, fullname: e.target.value }) })}
                  />
                </div>

              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john.doe@university.edu"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={user.email}
                  onChange={((e) => { setUser({ ...user, universityEmail: e.target.value }) })}
                />
              </div>

        {/* Contact */}
              <div className="space-y-2">
                <label htmlFor="Contact" className="text-sm font-medium text-gray-700">
                 Contact
                </label>
                <input
                  id="Contact"
                  type="text"
                  placeholder="0312345678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={user.contact}
                  onChange={((e) => { setUser({ ...user, contact: e.target.value }) })}
                />
              </div>

              {/* University Dropdown */}
              <div className="space-y-2">
                <label htmlFor="university" className="text-sm font-medium text-gray-700">
                  Semester
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen2(!isDropdownOpen2)}
                    className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between"
                  >
                    <span className={selectedSemester ? "text-gray-900" : "text-gray-500"}>
                      {selectedSemester || "Select your semester"}
                    </span>
                    <ChevronDown onChange={((e) => { setUser({ ...user, semester: selectedSemester }) })} className="w-4 h-4 text-gray-400" />
                  </button>

                  {isDropdownOpen2 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {semesters.map((semester, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(e) => {
                            setselectedSemester(e.target.innerText)
                            setUser({ ...user, semester: e.target.innerText })
                            setIsDropdownOpen2(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                        >
                          {semester}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gender Dropdown */}
              <div className="space-y-2">
                <label htmlFor="university" className="text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen3(!isDropdownOpen3)}
                    className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between"
                  >
                    <span className={selectedGender ? "text-gray-900" : "text-gray-500"}>
                      {selectedGender || "Select Gender"}
                    </span>
                    <ChevronDown onChange={(e) => { setUser({ ...user, gender: selectedGender }) }} className="w-4 h-4 text-gray-400" />
                  </button>

                  {isDropdownOpen3 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {genders.map((gender, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(e) => {
                            setselectedGender(e.target.innerText)
                            setUser({ ...user, gender: e.target.innerText })
                            setIsDropdownOpen3(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gender Dropdown */}
              <div className="space-y-2">
                <label htmlFor="university" className="text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen4(!isDropdownOpen4)}
                    className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white flex items-center justify-between"
                  >
                    <span className={selectedDepartment ? "text-gray-900" : "text-gray-500"}>
                      {selectedDepartment || "Select Department"}
                    </span>
                    <ChevronDown onChange={(e) => { setUser({ ...user, department: selectedDepartment }) }} className="w-4 h-4 text-gray-400" />
                  </button>

                  {isDropdownOpen4 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      {departments.map((department, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={(e) => {
                            setselectedDepartment(e.target.innerText)
                            setUser({ ...user, department: e.target.innerText })
                            setIsDropdownOpen4(false)
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                        >
                          {department}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!loading ? (
                <button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  onClick={submitForm}
                >
                  Create Account
                </button>
              ) : <button
                type="button"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                disabled
              >
                <Loader />
              </button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

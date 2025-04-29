import axios from 'axios'
import React, { useState } from 'react'

const Form = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [employeeFirstName, setEmployeeFirstName] = useState('')
    const [employeeSecondName, setEmployeeSecondName] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    const [employeePhoneNumber, setEmployeePhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email,
            password,
            phoneNumber: number,
            employeeName: {
                firstName: employeeFirstName,
                lastName: employeeSecondName
            },
            employeeEmail,
            employeePhoneNumber,
        })
        console.log(response.data);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <form onSubmit={submit} className="bg-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">Enter Your Details</h1>

                <div className="flex flex-col gap-6">
                    {/* User Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Name</h2>
                        <div className="flex gap-4">
                            <input
                                className="bg-white rounded-md h-10 w-1/2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                                placeholder="First Name" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <input
                                className="bg-white rounded-md h-10 w-1/2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                                placeholder="Last Name" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Email</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Password</h2>
                        <input
                            type="password"
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Phone Number</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Phone Number" value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    {/* Employee Details */}
                    <h1 className="text-2xl font-semibold text-center pt-4 text-gray-800">Employee Details</h1>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Name</h2>
                        <div className="flex gap-4">
                            <input
                                className="bg-white rounded-md h-10 w-1/2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                                placeholder="First Name" value={employeeFirstName}
                                onChange={(e) => setEmployeeFirstName(e.target.value)}
                            />
                            <input
                                className="bg-white rounded-md h-10 w-1/2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                                placeholder="Last Name" value={employeeSecondName}
                                onChange={(e) => setEmployeeSecondName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Email</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Employee Email" value={employeeEmail}
                            onChange={(e) => setEmployeeEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Phone Number</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Employee Phone Number" value={employeePhoneNumber}
                            onChange={(e) => setEmployeePhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-10 rounded-xl transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form

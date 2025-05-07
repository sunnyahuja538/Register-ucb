import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import 'remixicon/fonts/remixicon.css'

const Form = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [employeeFirstName, setEmployeeFirstName] = useState('')
    //const [employeeSecondName, setEmployeeSecondName] = useState('')
    const [employeeEmail, setEmployeeEmail] = useState('')
    //const [employeePhoneNumber, setEmployeePhoneNumber] = useState('')
    const [department, setDepartment] = useState('');
    const [company, setCompany] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [suggestion,setSuggestions]=useState([]);
    const [isUserTyping, setIsUserTyping] = useState(false);
    const [processing, setProcessing] = useState(false);
    //const [flag,setFlag]=useState(false);
    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        try{
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email,
            employeeName: employeeFirstName,
            phoneNumber:number,
            employeeEmail,
           
            company,
            image1,
            image2,
            department,
            description
        })
       
        toast.success('Message Send Successfully');
        console.log(response.data);
        setFirstName('');
        setLastName('');
        setEmail('');
        setNumber('');
        setEmployeeFirstName('');
        setEmployeeSecondName('');
        setEmployeeEmail('');
    }
    catch(err){
        if(err?.response?.data?.errors){
            const fieldErrors={};
            err.response.data.errors.forEach((error)=>{
                fieldErrors[error.path]=error.msg;
            })
            setErrors(fieldErrors);
            console.log(fieldErrors);
        }
        else{
        toast.error('Message Failed');
        throw new Error(err);
        }
        setProcessing(false);
    }

    }



    useEffect(()=>{
        if(!isUserTyping){
            setSuggestions([]);
            return;
        }
        (async function fetchData(){
            try{
        const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/employee-suggestions`,{
            params:{
                department:department,
                query:employeeFirstName
            }
        })
        setSuggestions(response.data);
        
    }
    catch(err){
        throw new Error(err);
    }
    })()
    },[employeeFirstName]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <form onSubmit={submit} className="bg-gray-100 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-800 underline decoration-gray-500">Enter Your Details</h1>

                <div className="flex flex-col gap-6">
                    {/* User Details */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Name</h2>
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-2 w-1/2">
                            <input
                                className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 capitalize"
                                placeholder="First Name" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            
                            {errors?.["fullName.firstName"]&&<p className='text-red-500 text-sm'>{errors["fullName.firstName"]}</p>}
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                            <input
                                className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 capitalize"
                                placeholder="Last Name" value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors["fullName.lastName"]&&<p className='text-red-500 text-sm'>{errors["fullName.lastName"]}</p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Company Name</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Company" value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        {errors?.company&&<p className='text-red-500 text-sm'>{errors.company}</p>}

                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Email</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors?.email&&<p className='text-red-500 text-sm'>{errors.email}</p>}
                    </div>


                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Your Phone Number</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Phone Number" value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        {errors?.phoneNumber&&<p className='text-red-500 text-sm'>{errors.phoneNumber}</p>}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Upload your photograph</h2>
                        
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            id="fileInput" type='file' accept=".jpeg, .jpg, .png"
                            onChange={(e)=>{
                                const file=e.target.files[0];
                                if(file){
                            const url=URL.createObjectURL(file);
                            setImage1(url);
                                }
                            }}
                           
                        />
                        {errors?.image1&&<p className='text-red-500 text-sm'>{errors.image1}</p>}
                        {image1 && (
        <div>
          <p>Preview:</p>
          <img src={image1} alt="Preview" className='h-20 w-15'
          onClick={() => window.open(image1, "_blank")}
          />
        </div>
      )}
                        <label htmlFor="fileInput" style={{
                                    paddingLeft: '5px',

        backgroundColor: '#007bff',
        marginTop: '10px',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        height:'30px',
        width:'40px'
      }}>
        <i className="ri-upload-2-line align-middle ml-1.5"></i>
      </label>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Upload your id proof</h2>
                        
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            id="fileInput1" type='file' accept=".jpeg, .jpg, .png"
                            onChange={(e)=>{
                                const file=e.target.files[0];
                                if(file){
                                    const url=URL.createObjectURL(file);
                                    setImage2(url);
                                }
                            }}
                        />
                        {errors?.image2&&<p className='text-red-500 text-sm'>{errors.image2}</p>}
                        {
                            image2&&
                            <div>
                                <p>Preview:</p>
                                <img src={image2} alt="Preview" className='h-20 w-15'
                                onClick={() => window.open(image2, "_blank")}
                                />
                            </div>
                        }
                        <label htmlFor="fileInput1" style={{
        paddingLeft: '5px',
        backgroundColor: '#007bff',
        marginTop: '10px',
        color: '#fff',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        height:'30px',
        width:'40px'

      }}>
        <i className="ri-upload-2-line align-middle ml-1.5"></i>
      </label>
      </div>

                    {/* Employee Details */}
                    <h1 className="underline decoration-gray-500 text-2xl font-semibold text-center pt-4 text-gray-800">Employee Details</h1>

                    <div>
                    <div className='mb-5'>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Department</h2>
                        <select
                            className="bg-white text-sm rounded-md h-10 w-2/5 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            value={department}
                            onChange={(e)=>{
                                setDepartment(e.target.value);
                            }}
                        >
                            <option value="">Department</option>
                            <option value="Engineering">IT</option>
                            <option value="Human Resources">HR</option>
                        </select>
                        {errors?.department&&<p className='text-red-500 text-sm'>{errors.department}</p>}
                    </div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Name</h2>
                        <div>
                            <input
                                className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 capitalize"
                                placeholder="First Name" value={employeeFirstName}
                                onChange={async(e) =>{ setIsUserTyping(true);
                                    setEmployeeFirstName(e.target.value)
                                }}
                                onBlur={()=>{setSuggestions([])
                                    
                                }
                                }
                            />
                            {errors?.employeeName&&<p className='text-red-500 text-sm'>{errors.employeeName}</p>}
                            {/*<input
                                className="bg-white rounded-md h-10 w-1/2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300 capitalize"
                                placeholder="Last Name" value={employeeSecondName}
                                onChange={(e) => setEmployeeSecondName(e.target.value)}
                            />*/}
                            {console.log(suggestion.length)}
                            {suggestion.length>0&&<ul className='h-fit bg-red-600'>
                                {suggestion.map((s,index)=>{
                                    return <li key={index} onClick={()=>{
                                        console.log(s.name);
                                        setIsUserTyping(false);
                                        setEmployeeFirstName(s.name);
                                        setSuggestions([]);
                                    }}>{s.name}</li>
                                })}
                            </ul>}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Email</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Employee Email" value={employeeEmail}
                            onChange={(e) => setEmployeeEmail(e.target.value)}
                        />
                        {errors?.employeeEmail&&<p className='text-red-500 text-sm'>{errors.employeeEmail}</p>}
                    </div>

                    {/* <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Phone Number</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Employee Phone Number" value={employeePhoneNumber}
                            onChange={(e) => setEmployeePhoneNumber(e.target.value)}
                        />
                    </div> */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Email</h2>
                        <textarea
                            className="bg-white rounded-md h-30 w-full px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Specify the reason for your visit" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors?.description&&<p className='text-red-500 text-sm'>{errors.description}</p>}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className={`bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-10 rounded-xl transition duration-300 cursor-pointer ${processing ? 'cursor-progress' : ''}`}
                            disabled={processing}
                        
                        >
                            {processing?'Processing...':'Submit'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form

import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import 'remixicon/fonts/remixicon.css'
import Webcam from 'react-webcam'

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
    const [webCam1,setWebCam1]=useState(null);
    const [webCam2,setWebCam2]=useState(null);
    const [departments,setDepartments]=useState([]);
    const webCamRef=useRef(null);
    const webCamRearRef=useRef(null);
    //const [flag,setFlag]=useState(false);
    const capture=(setImage,ref)=>{
        const imageSrc=ref.current.getScreenshot();
        setImage(imageSrc);

    }
    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        try{
            // const formData = new FormData();

            // formData.append('firstName', firstName);
            // formData.append('lastName', lastName);
            // formData.append('email', email);
            // formData.append('number', number);
            // formData.append('employeeName', employeeFirstName);
            // formData.append('employeeEmail', employeeEmail);
            // formData.append('department', department);
            // formData.append('company', company);
            // formData.append('description', description);
            // //formData.append('description', description);
            // formData.append('image1', image1);
            // formData.append('image2', image2);
            // formData.append('phoneNumber', number);
            // formData.append('file1', file1);  //  these must match Multer field names
            // formData.append('file2', file2);  
            const formData={
                firstName,
                lastName,
                company,
                phoneNumber:number,
                email,
                employeeName:employeeFirstName,
                description,
                image1,
                employeeEmail,
                image2,
                department
            }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`,formData,)
       
        toast.success('Message Send Successfully');
        console.log(response.data);
        setFirstName('');
        setLastName('');
        setEmail('');
        setNumber('');
        setEmployeeFirstName('');
        // //setEmployeeSecondName('');
        setEmployeeEmail('');
        setDepartment('');
        setCompany('');
        setImage1(null);
        setImage2(null);
        setDescription('');
        // setFile1(null);
        // setFile2(null);
        // file1inputRef.current.value='';
        // file2inputRef.current.value='';

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
        setProcessing(false);
        throw new Error(err);
        }
    }
    setProcessing(false);

    }
useEffect(()=>{
    (async function fetchdep(){
    try{
    const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/departments`);
    setDepartments(response.data);
        }
        
    catch(err){
        throw new Error(err);
    }
    })()
},[])


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
    return (<>{(processing)?<div className='h-screen w-screen flex justify-center items-center'><div className='h-[20%] w-[20%]'><p className='mr-[15%] text-center text-xl font-mono font-semibold md:text-2xl'>Please Wait</p><img className='h-[80%] w-[80%]' src="https://assets-v2.lottiefiles.com/a/91cc0ece-1150-11ee-b7cb-d3afb5c0c001/QNF78Uk4YE.gif"/></div></div>:
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
                        
                        {/* <input
                            className="bg-white rounded-md h-10 w-full px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            id="fileInput" type='file' accept=".jpeg, .jpg, .png"
                            onChange={(e)=>{
                                const file=e.target.files[0];
                                if(file){
                                    setFile1(file);
                            const url=URL.createObjectURL(file);//this is a string
                            setImage1(url);
                                }
                            }}
                            ref={file1inputRef}
                           
                        /> */}
                        {
                            webCam1?
                            <>
                            <Webcam
                            ref={webCamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                height:720,
                                width:1024,
                                facingMode:'user'
                            }}
                            />
                            <button onClick={()=>{
                                capture(setImage1,webCamRef);
                                setWebCam1(false);
                            }} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
                                    Capture
                            </button>
                            </>:
                            <>
                            <button onClick={()=>{
                                setWebCam1(true);
                            }} className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                                <i className="ri-upload-2-line align-middle"></i>
                            </button>
                                </>
                        }
                        {errors?.image1&&<p className='text-red-500 text-sm'>{errors.image1}</p>}
                        {image1 && (
        <div>
          <p>Preview:</p>
          <img src={image1} alt="Preview" className='h-20 w-15'
          />
        </div>
      )}
                        {/* <label htmlFor="fileInput" style={{
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
      </label> */}
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Upload your id proof</h2>
                        
                        {/* <input
                            className="bg-white rounded-md h-10 w-full px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            id="fileInput1" type='file' accept=".jpeg, .jpg, .png"
                            onChange={(e)=>{
                                const file=e.target.files[0];
                                if(file){
                                    setFile2(file);
                                    const url=URL.createObjectURL(file);
                                    setImage2(url);
                                }
                            }}
                          ref={file2inputRef}
                        /> */
                        
                            webCam2?
                            <>
                            <Webcam
                            ref={webCamRearRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                                height:720,
                                width:1024,
                                facingMode:'environment'//for rear
                            }}
                            />
                            <button onClick={()=>{
                                capture(setImage2,webCamRearRef);
                                setWebCam2(false);
                            }} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
                                    Capture
                            </button>
                            </>:
                            <>
                            <button onClick={()=>{
                                setWebCam2(true);
                            }} className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                                <i className="ri-upload-2-line align-middle"></i>
                            </button>
                                </>}
                        {errors?.image2&&<p className='text-red-500 text-sm'>{errors.image2}</p>}
                        {
                            image2&&
                            <div>
                                <p>Preview:</p>
                                <img src={image2} alt="Preview" className='h-20 w-15'
                                
                                />
                            </div>
                        }
                        {/* <label htmlFor="fileInput1" style={{
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
      </label> */}
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
                            {departments.map((dep,idx)=>{
                                return <option key={idx} value={dep}>{dep}</option>
                            }
                            )
                        }
                        {/* {console.log(departments)} */}
                           
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
                            {suggestion.length>0&&<ul className='h-fit bg-gray-200 p-3'>
                                {suggestion.map((s,index)=>{
                                    return <li className='mb-1' key={index} onMouseDown={()=>{
                                        console.log(s.name);
                                        setIsUserTyping(false);
                                        setEmployeeFirstName(s.name);
                                        setEmployeeEmail(s.email);
                                        setSuggestions([]);
                                    }}>{s.name}</li>
                                })}
                            </ul>}
                        </div>
                    </div>

                    {/* <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Email</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Employee Email" value={employeeEmail}
                            onChange={(e) => setEmployeeEmail(e.target.value)}
                        />
                        {errors?.employeeEmail&&<p className='text-red-500 text-sm'>{errors.employeeEmail}</p>}
                    </div> */}

                    {/* <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Enter Employee Phone Number</h2>
                        <input
                            className="bg-white rounded-md h-10 w-full px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-neutral-300"
                            placeholder="Employee Phone Number" value={employeePhoneNumber}
                            onChange={(e) => setEmployeePhoneNumber(e.target.value)}
                        />
                    </div> */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2 text-gray-700">Please Enter Your Purpose of Visit</h2>
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
    }
    </>
    )
}

export default Form

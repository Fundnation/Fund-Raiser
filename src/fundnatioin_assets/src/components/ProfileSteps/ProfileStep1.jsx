import { Text, Box, Input, Textarea, Flex, Stack, Button, Img} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateStep1 } from '../features/createProjectSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileStep1 = () => {

  const {firstName,lastName, img} = useSelector((state) => state.create);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const ref = useRef(null)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("Upload File")
  const [firstname,setFirstname] = useState()
  const [lastname,setLastname] = useState()
  const [text, setText] = useState()


  const updateFile = (e)=>{   
    setFileName(e.target.value.substring(12))
    setFile(URL.createObjectURL(e.target.files[0]))

  }

  const nextPage = ()=>{
   if(firstname && lastname && text){
       dispatch(updateStep1({firstName:firstname, 
                  lastName:lastname,
       fundraiseText: text
      }))
      toast.success("Success!");
      navigate("/profile/step2", { replace: true })
   }else{
    toast.error("Please fill all the field!");
   }
  }
  useEffect(()=>{
   
    console.log(file)
    console.log(fileName)

  },[file])
  return (
    <Box mb='15px'>
       <Text
        fontWeight='700'
        fontSize='24px'
        lineHeight='36px'
        letterSpacing='1px'
        color='rgba(54, 49, 61, 1)'
       >
        Let's get Started
       </Text>
       <Flex mt='20px' justifyContent='space-between' >
          <Input placeholder='First name' required w='40%' onChange={(e)=>setFirstname(e.target.value)}/>
        
          <Input placeholder='Last name' required w='40%' onChange={(e)=>setLastname(e.target.value)}/>
       </Flex>
       <Flex mt='20px' justifyContent='space-between' >
          <Input disabled placeholder={fileName} w='70%'/>
          <Button w="25%" onClick={()=>ref.current.click()}>UPLOAD</Button>
          <Input ref={ref} display={"none"} placeholder={"UPLOAD"} type='file' accept='image/*' onChange={(e)=>updateFile(e)}></Input>
       </Flex>
       <Text
        color='rgba(54, 49, 61, 1)'
        fontWeight='400'
        fontSize='16px'
        lineHeight='22.4px'
        letterSpacing='2%'
        p='15px 0 5px 0'
       >Tell us about yourself</Text>
       <Textarea h='10rem' onChange={(e)=>setText(e.target.value)}></Textarea>
        <Button 
          onClick={nextPage}
          m='15px 0 10px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'>Next
        </Button>
       
       <Link to='/'>
          <Text
            fontSize='15px'
            lineHeight='19px'
            color='rgba(194, 15, 162, 1)'
            fontWeight='400'
            textAlign='center'
            m='10px auto'
          >Previous</Text>
        </Link>
          <Text
            fontSize='9px'
            lineHeight='14px'
            color='rgba(194, 15, 162, 1)'
            fontWeight='400'
            textAlign='center'
            w='300px'
            m='0 auto'
          >By continuing, you agree to Fundnation Terms and acknowledge receipt of our Privacy Policy.</Text>
         <ToastContainer 
             position="top-center"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
         />
    </Box>

  )
}

export default ProfileStep1

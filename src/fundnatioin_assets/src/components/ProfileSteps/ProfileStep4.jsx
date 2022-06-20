import React from 'react'
import {Box, Text,Flex,  InputLeftElement,Input,InputGroup,Button, Img} from '@chakra-ui/react'
import {AiOutlineLink} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateStep4 } from '../features/createProjectSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useRef } from 'react';
import './ProfileStep.css'

const ProfileStep4 = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("Upload File")
  const [youtube, setYoutube] = useState()
  const updateFile = (e)=>{   
    setFileName(e.target.value.substring(12))
    setFile(URL.createObjectURL(e.target.files[0]))

  }
  const nextPage = ()=>{
    if(file){
       dispatch(updateStep4({ img: file, youtube: youtube }))
       toast.success("Success!");
      navigate("/profile/step5", { replace: true })
    }else{
     toast.error("Please fill all the field!");
    }
  }
  const ref = useRef(null)
  
  return (
    <Box mb='15px'>
        <Text
            fontWeight='700'
            fontSize='24px'
            lineHeight='36px'
            letterSpacing='1px'
        color='rgba(54, 49, 61, 1)'
        m='10px 0 10px 0'
       >
       Add a cover Photo or Video
       </Text>
       <Text
        color='#454352'
        letterSpacing='2%'
        fontSize='12px'
        fontWeight='400'
        lineHeight='18.4px'
        m='10px 0 3px 0'
       >A high-quality photo or video will tell your story and build trust with donors.</Text>
       {!file && <Box bg='rgba(255, 248, 254, 1)'>
           <Text
             color='#454352'
             letterSpacing='2%'
             fontSize='12px'
             fontWeight='400'
             lineHeight='18.4px'
             p='50px'
             textAlign='center'
           >Drag and drop or <span className='upload-btn' onClick={()=>ref.current.click()} style={{color:'rgba(194, 15, 162, 1)'}}>upload </span>a photo 
            that best represents your fundraiser</Text>
            <Input ref={ref} display="none" placeholder={"UPLOAD"} type='file' accept='image/*'  onChange={(e)=>updateFile(e)}></Input>
       </Box>}
       {file && <Img src={file}/>}
       <Flex w='60%' alignItems='center' justifyContent='space-between' m='20px auto'>
           <Box bg='rgba(135, 131, 143, 1)' w='83px' h='1px'></Box>
           <Text color='rgba(0, 0, 0, 1)' fontSize='12px'
           lineHeight='18px'
           >or</Text>
           <Box bg='rgba(135, 131, 143, 1)' w='83px' h='1px'></Box>
       </Flex>
       <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                children={<AiOutlineLink color='gray.300' />}
            />
            <Input type='tel' placeholder='Add a youtube link' onChange={(e)=>{setYoutube(e.target.value)}} />
        </InputGroup>
        <Button 
          m='30px 0 5px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'
          onClick={nextPage}
          >Next
        </Button>
    
        <Link to='/profile/step3'>
          <Text
            fontSize='15px'
            lineHeight='19px'
            color='rgba(194, 15, 162, 1)'
            fontWeight='400'
            textAlign='center'
            m='7px auto'
          >Previous</Text>
        </Link>
          <Text
            fontSize='9px'
            lineHeight='13px'
            color='rgba(92, 88, 102, 1)'
            fontWeight='400'
            textAlign='center'
            w='300px'
            m='0 auto'
          >By continuing, you agree to Fundnation Terms and acknowledge receipt of our Privacy Policy.</Text>
          <ToastContainer 
             position="top-center"
             autoClose={1000}
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

export default ProfileStep4

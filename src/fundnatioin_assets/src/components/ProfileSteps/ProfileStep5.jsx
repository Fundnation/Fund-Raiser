import React from 'react'
import { Box,Text, Textarea, Button} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateStep5 } from '../features/createProjectSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useRef } from 'react';
import './ProfileStep.css'

const ProfileStep5 = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [fundraiseReason, setFundRaiseReason] = useState()
  const nextPage = ()=>{
    if(fundraiseReason){
      console.log(fundraiseReason)
       dispatch(updateStep5({ fundraiseReason, fundraiseReason}))
       toast.success("Success!");
     navigate("/profile/step6", { replace: true })
    }else{
     toast.error("Please fill all the field!");
    }
  }
  const ref = useRef(null)
  
  return (
   <Box mb='10px'>
      <Text
            fontWeight='700'
            fontSize='24px'
            lineHeight='36px'
            letterSpacing='1px'
        color='rgba(54, 49, 61, 1)'
        m='10px 0 10px 0'
       >
       Tell Your Story Here
       </Text>
       <Text
        color='#454352'
        letterSpacing='2%'
        fontSize='12px'
        fontWeight='400'
        lineHeight='18.4px'
        m='10px 0 3px 0'
       >Why are you fundraising?</Text>
       <Textarea
          placeholder='Ex: Hello, my name is Erika and I am fundraising . . .'
          fontSize='12px'
          lineHeight='18px'
          h='15rem'
          m='20px 0'
          onChange={(e)=>{setFundRaiseReason(e.target.value)}}
       >
       </Textarea>

         <Button 
          m='5px 0 5px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'
          onClick={nextPage}
          >Submit</Button>
     
        <Link to='/profile/step4'>
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

export default ProfileStep5

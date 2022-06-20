import { Text, Box, Input, Select, Button, useStyleConfig} from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { updateStep2 } from '../features/createProjectSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';



const ProfileStep2 = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [category, setCategory] = useState()
  const [twitter, setTwitter] = useState()
  const [discord, setDiscord] = useState()

  const nextPage = ()=>{
    if(name && category && twitter && discord){
      console.log(name, category, twitter, discord)
        dispatch(updateStep2({ 
          twitter:twitter,
          discord:discord,
          name:name,
          category: category
        }))
       toast.success("Success!");
      navigate("/profile/step3", { replace: true })
    }else{
     toast.error("Please fill all the field!");
    }
  }

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
        Project
       </Text>
       <Input placeholder='Project name' w='100%' m='15px 0' onChange={(e)=>setName(e.target.value)}/>
       <Text
        color='rgba(54, 49, 61, 1)'
        letterSpacing='2%'
        fontSize='16px'
        fontWeight='400'
        lineHeight='22.4px'
        m='10px 0 5px 0'
       >Categories</Text>
       <Select color= 'rgba(54, 49, 61, 0.507)'
         placeholder='choose a category'
         fontSize='16px'
         lineHeight='22.4px'
         fontWeight='400'
         onChange={(e)=>setCategory(e.target.value)}
       >
          <option value='Health'>Health</option>
          <option value='Personal'>Personal</option>
          <option value='Education'>Education</option>
       </Select>
       <Text
        color='rgba(54, 49, 61, 1)'
        letterSpacing='2%'
        fontSize='16px'
        fontWeight='400'
        lineHeight='22.4px'
        m='30px 0 5px 0'
       >Links</Text>
       <Input placeholder='Twitter link' w='100%' m='5px 0 7px 0' onChange={(e)=>setTwitter(e.target.value)}/>
       <Input placeholder='Discord link' w='100%' onChange={(e)=>setDiscord(e.target.value)}/>
         <Button 
          m='25px 0 10px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'
          onClick={nextPage}
          >Next</Button>
      
       <Link to='/profile/step1'>
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

export default ProfileStep2

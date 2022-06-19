import { Text, Box, Input, Textarea, Flex, Stack, Button} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ProfileStep1 = () => {
  const ref = useRef(null)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("Upload File")
  const updateFile = (e)=>{
    setFileName(e.target.value.substring(12))
    setFile(e.target.files[0])

  }
  useEffect(()=>{
console.log(file)

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
          <Input placeholder='First name' w='40%'  />
        
          <Input placeholder='Last name' w='40%'/>
       </Flex>
       <Flex mt='20px' justifyContent='space-between' >
          <Input disabled placeholder={fileName} w='70%'/>
          <Button w="25%" onClick={()=>ref.current.click()}>UPLOAD</Button>
          <Input ref={ref} display={"none"} placeholder={"UPLOAD"} type='file' onChange={(e)=>updateFile(e)}></Input>
       </Flex>
       <Text
        color='rgba(54, 49, 61, 1)'
        fontWeight='400'
        fontSize='16px'
        lineHeight='22.4px'
        letterSpacing='2%'
        p='15px 0 5px 0'
       >Tell us about yourself</Text>
       <Textarea h='10rem'></Textarea>
       <Link to='/profile/step2'>
         <Button 
          m='15px 0 10px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'>Next</Button>
       </Link>
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
    </Box>
  )
}

export default ProfileStep1

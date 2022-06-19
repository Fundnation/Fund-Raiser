import { Text, Box, Input, Select, Button} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfileStep2 = () => {
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
       <Input placeholder='Project name' w='100%' m='15px 0'/>
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
       >
       </Select>
       <Text
        color='rgba(54, 49, 61, 1)'
        letterSpacing='2%'
        fontSize='16px'
        fontWeight='400'
        lineHeight='22.4px'
        m='30px 0 5px 0'
       >Links</Text>
       <Input placeholder='Twitter link' w='100%' m='5px 0 7px 0'/>
       <Input placeholder='Discord link' w='100%'/>
       <Link to='/profile/step3'>
         <Button 
          m='25px 0 10px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'>Next</Button>
       </Link>
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
    </Box>
  )
}

export default ProfileStep2

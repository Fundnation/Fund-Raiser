import React from 'react'
import {Box, Text, Flex, Input,Button, InputGroup,InputLeftElement} from '@chakra-ui/react'
import {AiOutlineLink} from 'react-icons/ai'
import { Link } from 'react-router-dom'


const ProfileStep6 = () => {
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
       Share your Fundraiser
       </Text>
       <Text
            color='#454352'
            letterSpacing='2%'
            fontSize='12px'
            fontWeight='400'
            lineHeight='18.4px'
             m='10px 0 3px 0'
       >Ask 3-5 friends to help you share on social media.</Text>
       <Text
            color='rgba(69, 67, 82, 1)'
            letterSpacing='2%'
            fontSize='16px'
            fontWeight='400'
            lineHeight='22.4px'
             m='30px 0 3px 0'
       >fundraiser link</Text>
       <Flex mt='5px' justifyContent='space-between' >
          <InputGroup w='78%'>
                <InputLeftElement
                   pointerEvents='none'
                   children={<AiOutlineLink color='gray.300' />}
                   />
                   <Input fontSize='14px' placeholder='https://www.fundnation.com/sa' />
            </InputGroup>
            <Button color='black' bg='rgba(179, 176, 184, 1)' fontSize='12px' w='20%'>UPLOAD</Button>
       </Flex>
       <Link to='/signin'>
         <Button 
          m='30px 0 5px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'>Done</Button>
       </Link>
        <Link to='/profile/step5'>
          <Text
            fontSize='15px'
            lineHeight='19px'
            color='rgba(194, 15, 162, 1)'
            fontWeight='400'
            textAlign='center'
            m='6px auto'
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

export default ProfileStep6

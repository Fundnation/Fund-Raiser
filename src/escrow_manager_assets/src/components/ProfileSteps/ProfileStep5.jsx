import React from 'react'
import { Box,Text, Textarea, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ProfileStep5 = () => {
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
       >
       </Textarea>
       <Link to='/profile/step6'>
         <Button 
          m='5px 0 5px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'>Submit</Button>
       </Link>
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
   </Box>
  )
}

export default ProfileStep5

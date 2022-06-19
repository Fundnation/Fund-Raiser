import React from 'react'
import {Box, Text, Input, UnorderedList, ListItem, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ProfileStep3 = () => {
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
        FundRaising Goals
       </Text>
       <Text
        color='rgba(54, 49, 61, 0.388)'
        letterSpacing='2%'
        fontSize='12px'
        fontWeight='400'
        lineHeight='18.4px'
        m='10px 0 3px 0'
       >HOW MUCH WOULD YOU LIKE TO RAISE?</Text>
       <Input fontSize='14px'    
       color='rgba(54, 49, 61, 1)' 
       placeholder='Enter the goal amount' 
       w='100%' 
       m='0px 0'/>
       <Text
          color='rgba(69, 67, 82, 1)'
          letterSpacing='2%'
          fontSize='12px'
          fontWeight='400'
          lineHeight='18.4px'
          m='4px 0 15px 0'
       >Keep in mind that transaction fees</Text>
       <Box bg='rgba(255, 248, 254, 1)' borderRadius='8px' p="8px 50px" border='0.5px solid rgba(255, 118, 230, 1)'>
       <Text
          color='rgba(69, 67, 82, 1)'
          letterSpacing='2%'
          fontSize='12px'
          fontWeight='400'
          lineHeight='18.4px'
          mt='2px'
       >To receive money raised, please make sure the person withdrawing has:</Text>
       <UnorderedList pt={2}>
           <ListItem 
           color='rgba(69, 67, 82, 1)' 
           fontSize='12px'
           lineHeight='18px'
           fontWeight='400'
           >An account in dfinity</ListItem>
           <ListItem
            color='rgba(69, 67, 82, 1)' 
            fontSize='12px'
            lineHeight='18px'
            fontWeight='400'
           >A Plug wallet or Stoic wallet</ListItem>
       </UnorderedList>
       </Box>
     <Link to='/profile/step4'>
        <Button 
          m='50px 0 10px 0' 
          w='100%' 
          borderRadius='40px' 
          fontSize='16px'
          lineHeight='24px'
          color='white'
          bg='rgba(194, 15, 162, 1)'>Next</Button>
      </Link>  
      <Link to='/profile/step2'>
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

export default ProfileStep3

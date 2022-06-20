import React from 'react'
import {Box, Text, Flex, Input,Button, InputGroup,InputLeftElement} from '@chakra-ui/react'
import {AiOutlineLink} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {fundnation} from "../../../../declarations/fundnation/index"
import { useGlobalContext } from '../../context'

// const {createProject, createFirstProject, getMyProjects} = fundnation
const ProfileStep6 = () => {
  const {actor} = useGlobalContext()
    // const { createFirstProject, getMyProjects, getProject, updateProject } = actor;
  const createData = useSelector((state) => state.create);
  useEffect(()=>{
    console.log(createData,'create data') //this createData contains the object that you need. 
    // You should do anything you want with the data from here.

    // Create data is the data gotten from a form that contains all the inputs needeed by tge createProject method
    const {category, img, fundraiseReason, amount , fundraiseText, name} = createData
    
    const obj = {
      category: category,
      cover: img,
      description: fundraiseReason,
      goal: amount,
      rewards: fundraiseText,
      story: fundraiseReason,
      tags: [category],
      title: name,
      walletId: window.ic.plug.accountId,
    };
    actor.createProject(...obj)

    // {amount: "1200";
    // category: "Health";
    // discord: "sdlfms";
    // firstName: "dslmdf";
    // fundraiseReason: "d,s.f,sm d,fsd";
    // fundraiseText: "fs.,dmf,.sdf";
    // img: "blob:http://localhost:8080/a839be5d-d2c2-4eed-a2ac-1723de4c2167";
    // lastName: ",sldf,l";
    // name: "sdf,mds";
    // twitter: "ds,fsd";
    // youtube: undefined;}
  },[createData])
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
            <Button color='black' bg='rgba(179, 176, 184, 1)' fontSize='12px' w='20%'>COPY</Button>
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

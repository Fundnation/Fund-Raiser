import React from 'react'
import { Box, Button, Flex, Img,Text} from '@chakra-ui/react'
import logo from '../../images/Logo.png'
import './Modal.css'
import {GrFormClose} from 'react-icons/gr'
import { Link, useNavigate } from 'react-router-dom'

const Modal = () => {
  
  const navigate = useNavigate()
  const closeModal = ()=>{
    navigate(-1)

  }
  return (
    <div className='modal'>
        <div className='modal_content'>
           <Box onClick={closeModal} pos='absolute' right='2' fontSize={30}> <GrFormClose/></Box>
            <Flex alignItems='center' p='1rem 3rem 0 3rem'>
                <Img mt='10px' boxSize='50px'objectFit='cover' src={logo} alt='logo'/>
                <Text
                  color='rgba(54, 49, 61, 1)'
                  fontSize='24px'
                  fontWeight='700'
                  letterSpacing='1px'
                  lineHeight='36px'
                  
                >
                    Fundation
                 </Text>
            </Flex>
            <Text
               color='#454352'
               fontSize='14px'
               fontWeight='400'
               lineHeight='22px'
               letterSpacing='2%'
               pl='4rem'
            >
                please sign in to get started
            </Text>
            <Link to='/profile/step1'><Flex mt='3rem' justifyContent='end'><Button bg='#C20FA2' color='white' fontSize='14px'>Sign in</Button></Flex></Link>

        </div>
        
    </div>
  )
}

export default Modal

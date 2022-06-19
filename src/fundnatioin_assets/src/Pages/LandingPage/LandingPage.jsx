import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import './LandingPage.css'
import { Navbar, ExploreFundRaise } from '../../components'

const LandingPage = () => {
  return (
   <> 
   <Box bg='rgba(98, 28, 190, 1)' pb='4rem'>
        <Navbar/>
        <Box>
            <Text
              lineHeight='73.6px'
              letterSpacing='1px'
              justifyContent='center'
              fontSize='64px'
              fontFamily='Poppins'
              fontWeight='400'
              color='white'
              display='flex'
              mt='10rem'
            >
                Welcome to
                <Text fontWeight='700' pl={2}>
                     Fundnation
                </Text>
            </Text>
            <Text
               lineHeight='36.6px'
               letterSpacing='1px'
               fontSize='24px'
               fontFamily='Poppins'
               fontWeight='400'
               color='#FFF8FE'
               textAlign='center'
               mt='10px'
            >Donations on Blockchain</Text>
        </Box>
        <Button
            borderRadius='50px'
            bg='transparent'
            color='rgba(255, 169, 240, 1)'
            fontSize='14px'
            fontFamily='Poppins'
            lineHeight='24px'
            variant='solid'
            textTransform='uppercase'
            border='1px solid rgba(255, 169, 240, 1)'
            display='block'
            m='20px auto'
            className='btn-effect'
        >Button</Button>
    </Box>
    <ExploreFundRaise/>
    </>
  )
}


export default LandingPage

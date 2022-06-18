import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import {IoIosArrowBack} from 'react-icons/io'
import { Outlet } from 'react-router-dom'
import { Navbar} from '../../components'

const ProfileInfo = () => {
  return (
    <>
    <Navbar/>
    <Flex justifyContent='center'>
        <Box w='25%' >
            <Flex justifyContent='space-between' alignItems='center'>
                <IoIosArrowBack fontSize='30px' color='rgba(135, 131, 143, 1)'/>
                <Flex justifyContent='space-between' w='60%'>
                    <Box width='16px' h='16px' borderRadius='full' bg='rgba(218, 216, 221, 1)'></Box>
                    <Box width='16px' h='16px' borderRadius='full' bg='rgba(218, 216, 221, 1)'></Box>
                    <Box width='16px' h='16px' borderRadius='full' bg='rgba(218, 216, 221, 1)'></Box>
                    <Box width='16px' h='16px' borderRadius='full' bg='rgba(218, 216, 221, 1)'></Box>
                    <Box width='16px' h='16px' borderRadius='full' bg='rgba(218, 216, 221, 1)'></Box>
                </Flex>
            </Flex>
            <Outlet/>
        </Box>
    </Flex>
    </>
  )
}

export default ProfileInfo

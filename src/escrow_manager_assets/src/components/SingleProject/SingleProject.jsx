import React from 'react'
import {MdVerifiedUser} from 'react-icons/md'
import {IoIosFingerPrint} from 'react-icons/io'
import {AiOutlineHeart} from 'react-icons/ai'
import {BiDownload} from 'react-icons/bi'
import { Box, Text, Flex, ButtonGroup, Button, Avatar, Progress} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const SingleProject = ({data}) => {
    const { title, name, text, amount_raised, target, img, id} = data
  return (
    <Link to={`/donation/${id}`}>
           <Box bg='white' h='422px' borderRadius='12px' pos='relative'>
                <Box 
                  bgImage={`url(${img})`}
                  bgRepeat='no-repeat' 
                  bgSize='cover'
                  borderTopRadius='12px'
                  h='50%'>
                    <Flex justifyContent='space-between' p='7px 4px'>
                        <ButtonGroup>
                            <Button leftIcon={<MdVerifiedUser fontSize={20}/>} borderRadius='100px' fontWeight='600' fontSize='11px'lineHeight='16.5px' colorScheme='blackAlpha' color='white'> Verified</Button>
                            <Button leftIcon={<IoIosFingerPrint fontSize={20}/>} borderRadius='100px' fontWeight='600' fontSize='11px'lineHeight='16.5px' colorScheme='blackAlpha' color='white'>Trace</Button>
                        </ButtonGroup>
                        <Flex alignItems='center'>
                            <Button rightIcon={<AiOutlineHeart fontSize={20} mr={5}/>} color='rgba(34, 32, 41, 1)' fontSize='12px' lineHeight='18px' borderRadius='100px'>498 </Button>
                            <Avatar bg='white' icon={<BiDownload fontSize='1.5rem' color='#333536' />}></Avatar>
                        </Flex>
                    </Flex>

                </Box>
                <Box p='30px 15px' bg='white' pos='absolute' bottom='-30px' borderRadius='12px'>
                    <Text
                       color='rgba(54, 49, 61, 1)'
                       fontFamily='Poppins'
                       fontSize='18px'
                       lineHeight='27px'
                       fontWeight='700'
                       textTransform='capitalize'
                    >{title}</Text>
                    <Text
                      color='rgba(194, 15, 162, 1)'                      
                      fontFamily='Poppins'
                      fontSize='14px'
                      lineHeight='21px'
                      fontWeight='400'
                      pb={2}
                    >{name}
                    </Text>
                    <Text
                      color='rgba(69, 67, 82, 1)'                      
                      fontFamily='Poppins'
                      fontSize='14px'
                      lineHeight='21px'
                      fontWeight='400'
                    >{text}</Text>
                    <Flex justifyContent='space-between' pt={2}>
                        <Flex justifyContent='space-between'
                            alignItems='center'>
                            <Text
                              color='rgba(54, 49, 61, 1)'                      
                              fontFamily='Poppins'
                              fontSize='16px'
                              lineHeight='24px'
                              fontWeight='700'
                            >{amount_raised} 1CP</Text>
                            <Text
                              color='rgba(69, 67, 82, 1)'                      
                              fontFamily='Poppins'
                              fontSize='12px'
                              lineHeight='18px'
                              fontWeight='400'
                              pl={1}
                            >Raised</Text>
                        </Flex>
                        <Text
                         color='rgba(92, 88, 102, 1)'                      
                         fontFamily='Poppins'
                         fontSize='12px'
                         lineHeight='18px'
                         fontWeight='400'
                         textAlign='right'
                         textTransform='uppercase'
                        >Amount goal: {target} ICP </Text>
                    </Flex>
                    <Progress size='xs' value={40} borderRadius='20px' colorScheme='pink'></Progress>
                </Box>
            </Box>
        </Link>
  )
}

export default SingleProject

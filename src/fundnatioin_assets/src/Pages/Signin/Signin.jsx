import React from 'react'
import { ExploreFundRaise, Navbar } from '../../components'
import { Box, Button, ButtonGroup, Flex , Image, SimpleGrid, Text} from '@chakra-ui/react'
import person from '../../images/person.png'
import {MdContentCopy} from 'react-icons/md'
import {BiDownload} from 'react-icons/bi'

const Signin = () => {
  return (
    <Box bg='#F5F5F5' h='100vh'overflowY='scrol'>
        <Navbar/>
        <Flex width='100%' justifyContent='center' alignItems='center'>
            <Image
               borderRadius='full'
               boxSize='150px'
               src={person}
                alt='Dan Abramov'
            />
            <Box ml={3}>
                <Text
                 color='rgba(54, 49, 61, 1)'
                 fontSize='24px'
                 lineHeight='36px'
                 fontWeight='700'
                >
                  Erika Martin</Text>
                  <Flex alignItems='center' pt={3}  justifyContent='space-between'><Text
                    color='#5C5866'
                    lineHeight ='22px'
                    font-size='16px'
                    mr={2}
                  >0dh768jg803jgnna833ndldn02837 c74bs5la64p28v63v </Text><MdContentCopy color='rgba(194, 15, 162, 1)'/> <BiDownload color='rgba(194, 15, 162, 1)'/></Flex>
            </Box>
        </Flex>
        <SimpleGrid columns={2} spacing={10} w='70%' m='20px auto'>
            <Flex bg='white' border='1px solid rgba(157, 153, 163, 1)'
               justifyContent='space-around'
               p={10}
               borderRadius='12px'
            >
                <Box>
                    <Text
                      color='rgba(157, 153, 163, 1)'
                      fontSize='16px'
                      lineHeight='24px'
                      fontWeight='700'
                    >Donations</Text>
                    <Text
                      color='rgba(69, 67, 82, 1)'
                      fontWeight='400'
                      fontSize='36px'
                      lineHeight='41px'
                    >1</Text>
                </Box>
                <Box>
                   <Text
                     color='rgba(157, 153, 163, 1)'
                     fontSize='16px'
                     lineHeight='24px'
                     fontWeight='700'
                   >Total Amount</Text>
                   <Text
                     color='rgba(69, 67, 82, 1)'
                     fontWeight='400'
                     fontSize='36px'
                     lineHeight='41px'
                   >400 ICP</Text>
                </Box>
            </Flex>
            <Flex bg='white' border='1px solid rgba(157, 153, 163, 1)'
               justifyContent='space-around'
               p={10}
               borderRadius='12px'
            >
                <Box>
                    <Text
                      color='rgba(157, 153, 163, 1)'
                      fontSize='16px'
                      lineHeight='24px'
                      fontWeight='700'
                    >Projects</Text>
                    <Text
                     color='rgba(69, 67, 82, 1)'
                     fontWeight='400'
                     fontSize='36px'
                     lineHeight='41px'
                    >1</Text>
                </Box>
                <Box>
                   <Text
                     color='rgba(157, 153, 163, 1)'
                     fontSize='16px'
                     lineHeight='24px'
                     fontWeight='700'
                   >Donations Received</Text>
                   <Text
                    color='rgba(69, 67, 82, 1)'
                    fontWeight='400'
                    fontSize='36px'
                    lineHeight='41px'
                   >200 ICP</Text>
                </Box>
            </Flex>
        </SimpleGrid>
        <ButtonGroup ml='30px'>
            <Button className='btn-effect' fontSize='12px' lineHeight='18px' bg='rgba(194, 15, 162, 1)' fontWeight='500' color='white' borderRadius='20px'>Erika Martin's Project</Button>
            <Button className='btn-effect'fontSize='12px' lineHeight='18px' borderRadius='20px'>Donations</Button>
            <Button className='btn-effect' fontSize='12px' lineHeight='18px' borderRadius='20px'>Likes</Button>
        </ButtonGroup>
        <ExploreFundRaise/>
    </Box>
  )
}

export default Signin

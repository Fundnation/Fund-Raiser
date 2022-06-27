import React,{useEffect, useState} from 'react'
import { Avatar, Button, Img, Box, Flex} from '@chakra-ui/react'
import { IoWalletOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import connect from "../../helpers/connectWallet";
import logo from "../../images/Logo.png";
import './Sidebar.css'
import {AiOutlineClose} from 'react-icons/ai'

const Sidebar = () => {
    const [wallet, setWallet] = useState(null);
    useEffect(() => {
      console.log(wallet)
    }, [wallet]);
    const connectWallet = async () => {
       setWallet(await connect());
    };

    const closeSidebar = ()=>{
      document.getElementById("sidebar").style.width = "0"; 
    }
  return (
    <Box w='14rem' height='100vh' pos='fixed'
            bg='rgba(98, 28, 190, 1)' 
            overflow='hidden' top={0} left={0} zIndex={1} 
             boxShadow= "0 5px 15px rgba(0, 0, 0, 0.1)"
             className='sidebar'
             id='sidebar'
             display='none'
            //  zIndex='4'
             transition= "all 0.5s linear">
        <Box w='14rem'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Img
            mt="10px"
            boxSize="50px"
            objectFit="cover"
            src={logo}
            alt="logo"
            />
            <AiOutlineClose onClick={closeSidebar} className='close-icon'/>
          </Flex >
          <Flex m='50px 10px 10px 10px' flexDir='column' alignContent='center'>
            <Link to="/projects">
            {" "}
            <Button
              borderRadius="50px"
              bg="rgba(194, 15, 162, 1)"
              color="white"
              fontSize="12px"
              fontFamily="Poppins"
              lineHeight="24px"
              variant="solid"
              textTransform="uppercase"
              className="btn-effect"
              w='100%'
              m='10px 0'
            >
              Create a Project
            </Button>{" "}
          </Link>
          <Link to="/">
            {" "}
            <Button
              borderRadius="50px"
              bg="rgba(194, 15, 162, 1)"
              color="white"
              fontSize="12px"
              fontFamily="Poppins"
              lineHeight="24px"
              variant="solid"
              textTransform="uppercase"
              className="btn-effect"
              w='100%'
              m='10px 0'
            >
              Home
            </Button>{" "}
          </Link>
          <Link to="/signin">
            <Button
              borderRadius="50px"
              bg="rgba(194, 15, 162, 1)"
              color="white"
              fontSize="12px"
              fontFamily="Poppins"
              lineHeight="24px"
              variant="solid"
              textTransform="uppercase"
              className="btn-effect"
              w='100%'
              m='10px 0'
            >
              Sign in
            </Button>
          </Link>
          <Avatar
            w='100%'
            className="btn-effect"
            bg="rgba(194, 15, 162, 1)"
            color="white"
            m='10px 0'
            icon={<IoWalletOutline fontSize="1.5rem" onClick={connectWallet} />}
          ></Avatar>
        </Flex>
        </Box>
    </Box>
  )
}

export default Sidebar

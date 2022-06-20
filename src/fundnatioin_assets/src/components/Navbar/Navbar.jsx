import { Avatar, Button, Flex, Img, Box } from "@chakra-ui/react";
import React from "react";
import "./Navbar.css";
import logo from "../../images/Logo.png";
import { IoWalletOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import connect from "../../helpers/connectWallet";
import { useEffect } from "react";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import { updateActor } from "../features/createProjectSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  // const {setActor, actor} =  useGlobalContext()
  const dispatch = useDispatch();
  const { actor } = useSelector((state) => state.create);
  const [wallet, setWallet] = useState(null);
  useEffect(() => {
    // console.log(wallet)
    if (wallet) {
      dispatch(
        updateActor({
          actor: wallet,
        })
      );
    }
  }, [wallet]);
  useEffect(() => {
    console.log("Actor", actor);
  }, [actor]);
  const connectWallet = async () => {
    try {
      setWallet(await connect()); 
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <Box m="0 30px">
      <Flex justifyContent="space-between">
        <Flex w="25%" justifyContent="space-between" alignItems="center">
          <Img
            mt="10px"
            boxSize="70px"
            objectFit="cover"
            src={logo}
            alt="logo"
          />
          {/* <Button onClick={async()=>{
          try {
             const payer = await  wallet.pay(1, "12345");
             console.log(payer)
          } catch (error) {
            console.error(error)
          }
          }}>Pay</Button> */}
          <Button
            borderRadius="50px"
            color="rgba(92, 88, 102, 1)"
            fontSize="14px"
            fontFamily="Poppins"
            letterSpacing="2%"
            variant="solid"
            className="btn-effect"
          >
            Projects
          </Button>
        </Flex>
        <Flex w="30%" justifyContent="space-between" alignItems="center">
          <Link to="/projects">
            {" "}
            <Button
              borderRadius="50px"
              bg="rgba(194, 15, 162, 1)"
              color="white"
              fontSize="14px"
              fontFamily="Poppins"
              lineHeight="24px"
              variant="solid"
              textTransform="uppercase"
              className="btn-effect"
            >
              Create a Project
            </Button>{" "}
          </Link>
          <Link to="/signin">
            <Button
              borderRadius="50px"
              bg="rgba(194, 15, 162, 1)"
              color="white"
              fontSize="14px"
              fontFamily="Poppins"
              lineHeight="24px"
              variant="solid"
              textTransform="uppercase"
              className="btn-effect"
            >
              Sign in
            </Button>
          </Link>
          <Avatar
            className="btn-effect"
            bg="rgba(194, 15, 162, 1)"
            color="white"
            icon={<IoWalletOutline fontSize="1.5rem" onClick={connectWallet} />}
          ></Avatar>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

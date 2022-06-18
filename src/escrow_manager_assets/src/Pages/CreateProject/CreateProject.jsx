import React from 'react'
import Signin from '../Signin/Signin'
import './CreateProject.css'
import { Box } from '@chakra-ui/react'
import { Modal } from '../../components'
import LandingPage from '../LandingPage/LandingPage'

const CreateProject = () => {
  return (
   <Box>
      <LandingPage/>
      <Modal/>
   </Box>
  )
}

export default CreateProject

import { Box, Text, SimpleGrid} from '@chakra-ui/react'
import React from 'react'

import { data } from '../../utils/exploreData'
import SingleProject from '../SingleProject/SingleProject'

const ExploreFundRaise = () => {
  return (
    <Box  bg='#F5F5F5' p='35px 30px' m={0}>
        <Text
          color='#36313D'
          fontFamily='Poppins'
          fontSize='36px'
          lineHeight='41px'
          fontWeight='600'
          m='40px 0'
        >
            Explore
        </Text>
        <SimpleGrid minChildWidth='120px' spacing='40px'>
            {
                data.map((item)=>{
                  
                    return (
                      <SingleProject key={item.id} data={item}/>
                    
                    )
                })
            }
            
           
        </SimpleGrid>
    </Box>
  )
}

export default ExploreFundRaise

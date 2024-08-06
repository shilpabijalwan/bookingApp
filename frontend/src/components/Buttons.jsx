'use client'

import { Button, HStack } from '@chakra-ui/react'
import React from 'react'

function Buttons() {
    const handleClick=()=>{
        console.log("become a member")
    }
  return (
    <HStack spacing={10} bg={"#fdf1f1"} p={{ base: 4, md: 15, lg: 30 }}>
    <Button style={{ background: "#F79D5C", color: "white" }} onClick={()=>handleClick()}>
      become a member
    </Button>
    <Button style={{ color: "#F79D5C" }} variant={"outline"}>
      exprole classes
    </Button>
  </HStack>
  )
}

export default Buttons
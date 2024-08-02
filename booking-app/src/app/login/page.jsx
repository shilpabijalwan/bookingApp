'use client'; // Mark as a client component

import { Box, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    console.log(data);
    
  };

  return (
    <Box width={{ base: '100%', md: '50%', lg: '30%' }} mx="auto" p={4} border="1px solid blue" borderRadius="md"> 
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormControl isInvalid={errors.email} mb={4}>
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input 
            id="email" 
            type="email" 
            {...register("email", { required: "Email is required" })} 
          />
          <FormErrorMessage color={'red'}>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mb={4}>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input 
            id="password" 
            type="password" 
            {...register("password", { required: "Password is required" })} 
          />
          <FormErrorMessage color={'red'}>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;

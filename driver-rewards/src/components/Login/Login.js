import {
    Box,
    Button,
    Checkbox,
    Select,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    SelectField,
    Center,

} from '@chakra-ui/react'
import { PasswordField } from './PassField'
import {useState} from "react";
import { AnimateSharedLayout, motion } from "framer-motion";
import { BiArrowBack } from 'react-icons/bi'
import { BsCheckCircle } from 'react-icons/bs'
import authtools from '../../authtools'
import axios from 'axios'

const requestConfig = {
    headers: {
        'x-api-key': 'x6GaDjuUzPa0MBiphcMoo30GQJm06K6IaD6sSPWf',
    }
}

const baseUrl = 'https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/'


export const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [func, setFunc] = useState('login')

    let form = <></>
    let navButton = <></>
    let submitButton = <></>

    let headerText = func === 'login' ? "Log in" : (func === 'apply') ? "Apply to be a Driver" : (func === 'reset') ? "Reset Password" : ""

    //DRIVER APPLY
    if(func === 'apply'){

        submitButton = (
            //TODO : CALL APPLY
            <Button>Sign in</Button>
        )

        navButton = (
            <HStack justify="space-between">

                <Button variant="link" colorScheme="blue" onClick={(event) => {
                    setFunc('login')
                }}>
                    <BiArrowBack/>
                    &nbsp;Back to Login
                </Button>
            </HStack>
        )

        form = (
            <>

                <FormControl>

                    <FormLabel htmlFor="email">Sponsor Company</FormLabel>
                    <SelectField placeholder="Select a company">
                        <option value='option1'>ABC Trucking Co.</option>
                        <option value='option2'>DEF Trucking Co.</option>
                    </SelectField>

                    <Stack spacing="5">
                        <br/>
                        <Divider/>
                        <FormLabel htmlFor="email">Name</FormLabel>
                        <Input id="text" type="text" onChange={(event) => {

                            console.log("state = " + username)
                        }}/>
                        <FormLabel htmlFor="email">Username</FormLabel>
                        <Input id="text" type="text" value={username} onChange={(event) => {
                            setUsername(event.target.value)
                            console.log("state = " + username)
                        }}/>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="apply-email" type="email"  onChange={(event) => {
                            console.log(event.target.value)
                        }}/>

                        <Divider/>

                        <FormLabel htmlFor="email">Password</FormLabel>
                        <PasswordField
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />

                        <FormLabel htmlFor="email">Confirm password</FormLabel>
                        <PasswordField/>
                    </Stack>

                </FormControl>
            </>
        )

        submitButton = (
            <Button onClick={() => {
                setFunc("applied")
            }}>Submit Application</Button>
        )

        //PASSWORD RESET
    } else if (func === 'reset'){

        submitButton = (
            //TODO : CALL PASSWORD RESET
            <Button>Reset Password</Button>
        )

        form = (
            <>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input id="reset-email" type="email"  onChange={(event) => {
                        console.log(event.target.value)
                    }}/>
                </FormControl>
            </>
        )

        navButton = (
            <HStack justify="space-between">

                <Button variant="link" colorScheme="blue" onClick={(event) => {
                    setFunc('login')
                }}>
                    <BiArrowBack/>
                    &nbsp;Back to Login
                </Button>
            </HStack>
        )

        // LOGIN
    } else if(func === 'login') {

        submitButton = (
            <Button onClick = {() => {

                //get current username and password values from state
                const requestBody = {
                    username: username,
                    password: password,
                }

                console.log("HEADERS = " + JSON.stringify(requestConfig))

                //authtools.callApi('POST', 'login', requestBody)

                authtools.authenticate(username, password)
            }}>Sign in</Button>
        )

        navButton = (
            <HStack justify="space-between">
                <Text color="muted">Want to apply as a driver?</Text>
                <Button variant="link" colorScheme="blue" onClick={(event) => {
                    setFunc('apply')
                }}>
                    Apply here
                </Button>
            </HStack>
        )

        form = (
            <>
                <Stack spacing="5">
                    <FormControl>
                        <FormLabel htmlFor="email">Username</FormLabel>
                        <Input id="text" type="text" value={username} onChange={(event) => {
                            setUsername(event.target.value)
                            console.log("state = " + username)
                        }}/>
                    </FormControl>
                    <FormLabel htmlFor="email">Password</FormLabel>
                    <PasswordField
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                </Stack>
                <HStack justify="space-between">
                    <Button variant="link" colorScheme="blue" size="sm" onClick={() => {
                        setFunc('reset')
                    }}>
                        Forgot password?
                    </Button>
                </HStack>
            </>
        )
    } else if(func === 'applied') {
        form = (
            <>
                <Text fontSize='2xl' align="center">Application Submitted</Text>
                <Center>
                    <BsCheckCircle size="100" color="green"/>
                </Center>
                <Text align="center">
                    We'll email you when you're accepted.
                </Text>
            </>
        )
    }




    return (

        <AnimateSharedLayout>

            <Container maxW="lg" py={{base: '12', md: '24'}} px={{base: '0', sm: '8'}}>
                <Stack spacing="8">
                    <Stack spacing="6">
                        <Stack spacing={{base: '4', md: '3'}} textAlign="center">
                            <Heading size={{base: 'sm', md: 'md'}}>{headerText}</Heading>
                            <HStack spacing="1" justify="center">
                            </HStack>
                        </Stack>
                    </Stack>
                    <Box
                        py={{base: '0', sm: '8'}}
                        px={{base: '4', sm: '10'}}
                        bg={{base: 'transparent', sm: 'bg-surface'}}
                        boxShadow={{base: 'none', sm: 'md'}}
                        borderRadius={{base: 'none', sm: 'xl'}}
                        backgroundColor="white"
                    >
                        <Stack spacing="6">
                            {form}
                            <Stack spacing="6">
                                {submitButton}
                                <Divider/>
                                {navButton}
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </AnimateSharedLayout>
    )
}

export default Login
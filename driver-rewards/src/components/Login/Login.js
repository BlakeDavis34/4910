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
    Progress,
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

    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const [apply, setApply] = useState({
        sponsor: '',
        name: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
        DOB: '',
        dlNum: 0
    })

    const [reset, setReset] = useState('')

    const [passStatus, setPassStatus] = useState({
        progress: 0,
        message: ''
    })

    const checkPassword = (pass) => {
        const strengthChecks = {
            length: 0,
            hasUpperCase: false,
            hasLowerCase: false,
            hasDigit: false,
            hasSpecialChar: false,
        };

        strengthChecks.length = pass.length >= 8;
        strengthChecks.hasUpperCase = /[A-Z]+/.test(pass);
        strengthChecks.hasLowerCase = /[a-z]+/.test(pass);
        strengthChecks.hasDigit = /[0-9]+/.test(pass);
        strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(pass);

        let verifiedList = Object.values(strengthChecks).filter((value) => value);

        let progress = (verifiedList.length/5) * 100
        let message = progress === 100 ? "Looks good!" : "Password requires an uppercase letter, lowercase letter, " +
            "digit (0-9), special character"

        setPassStatus({
            progress: progress,
            message: message
        })
    }

    const [confStatus, setConfStatus] = useState({
        text: "",
        match: false
    })

    const checkConfirm = (conf, pass) => {
        let cError = conf === pass ? "Looks good!" : "Passwords must match"
        let cMatch = conf === pass
        setConfStatus({
            text: cError,
            match: cMatch
        })
    }

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

                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input id="name" type="text" value = {apply.name} onChange={(event) => {
                            setApply(prevState => ({
                                ...prevState,
                                name: event.target.value
                            }))
                        }}/>

                        <FormLabel htmlFor="apply-username">Username</FormLabel>
                        <Input id="apply-username" type="text" value={apply.username} onChange={(event) => {
                            setApply(prevState => ({
                                ...prevState,
                                username: event.target.value
                            }))
                        }}/>

                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="apply-email" type="email" value={apply.email} onChange={(event) => {
                            setApply(prevState => ({
                                ...prevState,
                                email: event.target.value
                            }))
                            console.log(apply)
                        }}/>

                        <Divider/>

                        <FormLabel htmlFor="appy-password">Password</FormLabel>
                        <PasswordField id="apply-password"
                            onChange={(event) => {
                                setApply(prevState => ({
                                    ...prevState,
                                    password: event.target.value
                                }))
                                checkPassword(event.target.value)
                            }}
                        />
                        <Progress colorScheme= {passStatus.progress <= 40 ? 'red' : passStatus.progress <= 80 ? 'yellow' : 'green'} value={passStatus.progress}/>
                        <Text>{passStatus.message}</Text>

                        <FormLabel htmlFor="apply-confirm">Confirm password</FormLabel>
                        <PasswordField id="apply-confirm" value = {apply.confirm} onChange={(event) => {
                            setApply(prevState => ({
                                ...prevState,
                                confirm: event.target.value
                            }))
                            checkConfirm(event.target.value, apply.password)
                        }}/>
                        <Text color = {confStatus.match ? 'green' : 'red'}>{confStatus.text}</Text>

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
                authtools.authenticate(login.username, login.password)
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

                        <FormLabel htmlFor="login-username">Username</FormLabel>
                        <Input id="login-username" type="text" value = {login.username} onChange={(event) => {
                            // setUsername(event.target.value)
                            //console.log("state = " + username)

                            setLogin((prevState => ({
                                ...prevState,
                                username: event.target.value
                            })))
                        }}/>

                        <FormLabel htmlFor="email">Password</FormLabel>
                        <PasswordField
                            onChange={(event) => {
                                setLogin(prevState => ({
                                    ...prevState,
                                    password: event.target.value
                                }))
                            }}
                        />

                    </FormControl>
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
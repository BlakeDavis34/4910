import React, {useEffect, useState, useRef} from "react"
import aws from 'aws-sdk'

import {FormControl,
    FormLabel,
    Input,
    Stack,
    Image,
    Center,
    Button,
    Text,
    List,
    ListItem,
    ListIcon
} from "@chakra-ui/react";
import {PasswordField} from "../../components/Login/PassField";
import authtools from "../../authtools";
import Loading from "../../components/Loading/loading"

const s3_region = 'us-east-1'
const s3_bucket = 'dwp-profile-pictures'
const s3_accessKey = 'AKIAV25YJ7PAQOCO2QNC'
const s3_secretKey = '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'

const s3 = new aws.S3({
    s3_region,
    s3_bucket,
    s3_accessKey,
    s3_secretKey
})

const generateUrl = () => {
    const time_nano = window.performance.now()

    const params = {
        Bucket: s3_bucket,
        Key: time_nano,
        Expires: 60
    }
}



const Profile = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [photo, setPhoto] = useState(null)

    const inputPicture = useRef(null)

    useEffect(() => {
        try{
            setLoading(true)
            authtools.getUser().then((response) => {
                setUser(response.data.user)
                setLoading(false)
            })
        }
        catch(error){
            setLoading(false);
            authtools.handleError(error)
            console.log(error);
        }
    }, [])

    if(loading){
        return (
            <Loading/>
        )
    }

    const imageInput = document.querySelector("#pro-pic-upload")

    async function fileHandler(e){
        setPhoto(imageInput.files[0])
        console.log("URL = " + user.secureUrl)
        console.log("IMAGE = " + photo)

        const url = user.secureUrl
        //const file = imageInput.files

        await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: photo
        })
        //console.log("USER = " + JSON.stringify(user))
        const geturl = url.split('?')[0]
        console.log("ACCESS = " + geturl)

    }

    //console.log("file = " + inputPicture.files[0])

    //console.log("USER = " + user)

    return (
        <Center paddingTop = '7em'>
        <Stack spacing="5">
            <Center>
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src='https://www.sosyncd.com/wp-content/uploads/2022/03/18.png'
                    alt='I got some birds like Im Julio'
                />
            </Center>
            <Center>
                <Button width='150px' alignItems="center" onClick = {(e) => {
                    inputPicture.current.click()
                }}>
                    Change Picture
                </Button>
                <Input id='pro-pic-upload' ref={inputPicture} type='file' display='none' onChange = {fileHandler}/>
                {/*<Input id='pro-pic-upload' ref={inputPicture} type='file' display='none' onChange = {useState()}/>*/}

            </Center>
            <FormLabel htmlFor="email">Sponsor Company</FormLabel>
            <Text size='xl'>ABC Trucking Co.</Text>
            <Button width='150px' alignItems="center">Leave Company</Button>
            <Center>

            <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="text" width='300px' placeholder = 'Name' defaultValue = {user.name} onChange={(event) => {

                }}/>

                <FormLabel htmlFor="username" >Username</FormLabel>
                <Input id="username" isDisabled={true} type="text" placeholder='Username' defaultValue = {user.username} width='300px' onChange={(event) => {

                }}/>

                <FormLabel htmlFor="email" >Email</FormLabel>
                <Input id="email" isDisabled={true} type="text" placeholder='Email' defaultValue = {user.email} width='300px' onChange={(event) => {

                }}/>

                <FormLabel>Date of Birth</FormLabel>
                <Input
                    size="md"
                    type="date"
                    disabled={true}
                    defaultValue="2000-08-25"
                    width='300px'
                />
            </FormControl>
            </Center>
            <Center>
                <Button width='150px'>Save Changes</Button>
            </Center>
        </Stack>
        </Center>
    )
}

export default Profile
import React from "react"
import {FormControl, FormLabel, Input, Stack, Image, Center, Button, Text} from "@chakra-ui/react";
import {PasswordField} from "../../components/Login/PassField";

const Profile = () => {
    return (
        <Center>
        <Stack spacing="5">
            <Center>
                <Image
                    borderRadius='full'
                    boxSize='150px'
                    src='https://www.sosyncd.com/wp-content/uploads/2022/03/18.png'
                    alt='Dan Abramov'
                />
            </Center>
            <Center>
                <Button width='150px' alignItems="center">Change Picture</Button>
            </Center>
            <FormLabel htmlFor="email">Sponsor Company</FormLabel>
            <Text size='xl'>ABC Trucking Co.</Text>
            <Center>

            <FormControl>
                <FormLabel htmlFor="email">Name</FormLabel>
                <Input id="text" type="text" width='300px' placeholder='Ron Swanson' onChange={(event) => {

                }}/>

            <FormLabel htmlFor="email" >Username</FormLabel>
            <Input id="text" isDisabled='true' type="text" placeholder='ronswanson' width='300px' onChange={(event) => {

            }}/>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                    placeholder="08/25/2000"
                    size="md"
                    type="date"
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
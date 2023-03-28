import React, {useEffect, useState} from "react"
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
import axios from "axios";

const Profile = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [profilePicture, setProfilePicture] = useState('');

    const handlePictureChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    const styles = {
        maxWidth: '200px',
        maxHeight: '200px',
      };

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

    return (
        <Center>
        <Stack spacing="5">
            <Center>
            {profilePicture !== '' && (
        <img
          src={profilePicture}
          alt="Profile"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      )}
            <Center/>
       
           
               
          
            </Center>
            <Center>
                <Button>
                     <label htmlFor="profile-picture-input">
                    Change Profile Picture
                    <input
                        type="file"
                        id="profile-picture-input"
                        onChange={handlePictureChange}
                        style={{ display: 'none' }}
                    />
                    </label>
                </Button> 
            </Center>
            <FormLabel htmlFor="email">Sponsor Company</FormLabel>
            <Text size='xl'>ABC Trucking Co.</Text>
            <Center>

            <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="text" width='300px' placeholder = 'Name' defaultValue = {user.name} onChange={(event) => {

                }}/>

                <FormLabel htmlFor="username" >Username</FormLabel>
                <Input id="username" isDisabled={true} type="text" placeholder='Username' defaultValue = {user.username} width='300px' onChange={(event) => {

                }}/>

                <FormLabel htmlFor="email" >Email</FormLabel>
                <Input id="email" isDisabled={true} type="text" placeholder='Username' defaultValue = {user.email} width='300px' onChange={(event) => {

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
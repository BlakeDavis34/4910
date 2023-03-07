import './MenuBar.css'

import React from 'react'
import Cookies from "js-cookie";

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Flex,
    Grid
} from '@chakra-ui/react'

const testFunc = () => {
    console.log("Got menu click")
}

const MenuBar = () => {

    const name = Cookies.get('TruckName')
    const user = Cookies.get('TruckUser')
    const email = Cookies.get('TruckEmail')
    const birthday = Cookies.get('TruckBirthday')
    const gender = Cookies.get('TruckGender')

    const [currUser, setCurrUser] = React.useState(user)

    return (
        <div className="menu-items">
            <Menu>
                <MenuButton id = "profile-button" as={Button} colorScheme='blue' alignContent="right">
                    Profile
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Account'>
                        <MenuItem as='button' onClick={() => {
                            window.location.href = "/profile"
                        }} href="/profile">Profile</MenuItem>
                        <MenuItem as='button' onClick={() => {
                            Cookies.set('TruckSession', '')
                            Cookies.set('TruckName', '')
                            Cookies.set('TruckUsername', '')
                            Cookies.set('TruckBirthday', '')
                            Cookies.set('TruckGender', '')
                            setCurrUser('')
                            window.location.href = "/"
                        }}>Logout</MenuItem>
                    </MenuGroup>

                </MenuList>
            </Menu>
        </div>
    )
}

export default MenuBar
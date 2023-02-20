import './MenuBar.css'

import React from 'react'

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
                        <MenuItem>Logout</MenuItem>
                    </MenuGroup>

                </MenuList>
            </Menu>
        </div>
    )
}

export default MenuBar
import './NavBar.css'

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
        <div className="nav-items">
            <Menu>
                <MenuButton id = "navigate-button" as={Button} colorScheme='blue' alignContent="right">
                    Navigate
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Navigate'>
                    <MenuItem as='button' onClick={() => {
                            window.location.href = "/activities"
                        }} href="/activities">Activities</MenuItem>

                        <MenuItem as='button' onClick={() => {
                            window.location.href = "/catalog"
                        }} href="/catalog">Catalog</MenuItem>
                        <MenuItem as='button' onClick={() => {
                            window.location.href = "/groups"
                        }} href="/groups">Groups</MenuItem>
                         <MenuItem as='button' onClick={() => {
                            window.location.href = "/notification"
                        }} href="/notification">Notifications</MenuItem>
                    </MenuGroup>

                </MenuList>
            </Menu>
        </div>
    )
}

export default NavBar
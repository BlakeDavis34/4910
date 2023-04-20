import React, { useState } from 'react'
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom"
import Dashboard from "../../.././src/pages/Dashboard/Dashboard"

import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiMail,
    FiUser,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../NavItem'
import MenuBar from '../MenuBar/MenuBar'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="absolute"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "85px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    // background="none"
                    mt={5}
                    // _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Dashboard" >
                <Route exact path="/dashboard" component={Dashboard}/>
                 </NavItem>

                <NavItem navSize={navSize} icon={FiMenu} title="Activities"/>
                <NavItem navSize={navSize} icon={FiUser} title="Groups" />
                <NavItem navSize={navSize} icon={FiMail} title="Mail" />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        
                        <MenuBar/>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
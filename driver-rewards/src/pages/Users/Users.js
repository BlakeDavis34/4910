import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Text,
    Button,
    Progress,
    Image,
    Divider,
    Stack,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Flex,
    Grid
    // createColumnHelper
} from '@chakra-ui/react'

import React, {useEffect, useState} from 'react'
import authtools from "../../authtools";
import axios from 'axios'
import Loading from "../../components/Loading/loading";
import Cookies from "js-cookie";
import utils from "../../utils"

const displayUsers = (list) => {
    let uList = []
    list.forEach(a => {
        uList.push(
            <>
                <Tr>
                    <Td>{a.username}</Td>
                    <Td>{a.name}</Td>
                    <Td>{a.dob}</Td>
                    <Td>{a.dateCreated}</Td>
                    <Td>{a.dlNum}</Td>
                    <Td>{a.email}</Td>
                    <Td>{a.sponsorIds[0]}</Td>
                </Tr>
            </>
        )
    })
    return uList
}

const Users = () => {

    const [userList, setUserList] = useState({})
    const [loading, setLoading] = useState(true)

    let sParam = Cookies.get("TruckSponsor")
    if (sParam === []) {
        sParam = ''
    }
    
    //API call
    const params = new URLSearchParams([['sponsorIds', sParam]]);
        var config = {
            method: 'get',
            url: 'https://o63s0n6hl9.execute-api.us-east-1.amazonaws.com/login-demo/users',
            headers: {
                'x-api-key': 'x6GaDjuUzPa0MBiphcMoo30GQJm06K6IaD6sSPWf',
                'Content-Type': 'application/json',
                'Authorization': Cookies.get("TruckUser") + ":" + Cookies.get("TruckSession")
            },
            params : params
        };
        
    useEffect(() => {
        try {
            setLoading(true)
            axios(config).then((response) => {
                console.log(JSON.stringify(response.data))
                setLoading(false)
                setUserList(response.data)
            })
        } catch {
            console.log("error")
            setLoading(false)
        } 
    },[])

    if(loading){
        return (
            <Loading/>
        )
    }
    
    return (
        <>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Users</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Name</Th>
                            <Th>Date of Birth</Th>
                            <Th>Account Created</Th>
                            <Th>License ID</Th>
                            <Th>Email</Th>
                            <Th>Sponsor</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayUsers(userList)}
                    </Tbody>
                    <Tfoot><Tr><Td>
                    </Td></Tr></Tfoot>
                </Table>
            </TableContainer>
        </>
    )
}

export default Users
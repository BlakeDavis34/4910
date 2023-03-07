import React from 'react'
import Cookies from "js-cookie";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import * as authtools from "../../authtools";
import axios from "axios";

const Dashboard = () => {

    const user = Cookies.get('TruckUser')

    const [currUser, setCurrUser] = React.useState(user)

    return (
        <div>
            Hello {currUser} 
            <Tabs isFitted variant='soft-rounded' colorScheme='green'>
            <TabList mb='1em'>
                <Tab>Activities</Tab>
                <Tab>Catalog</Tab>
                <Tab>Points</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                <p>List of Activities:</p>
                </TabPanel>
                <TabPanel>
                <p>Catalog:</p>
                </TabPanel>
                <TabPanel>
                <p>History of {currUser} Points:</p>
                </TabPanel>
            </TabPanels>
            </Tabs>
            <button onClick={(e) => {
                Cookies.set('TruckSession', '')
                Cookies.set('TruckName', '')
                setCurrUser('')
                window.location.reload()
            }}><br/><br/>Logout</button>
        </div>
    )
}

export default Dashboard
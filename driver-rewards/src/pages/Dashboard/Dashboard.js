import React, {useEffect, useState} from 'react'
import authtools from "../../authtools";
import Loading from "../../components/Loading/loading";
import Graph from "../../components/PointGraph/Graph"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import utils from "../../utils"

const Dashboard = () => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            setLoading(true)
            authtools.getUser().then((response) => {
                console.log("AT GETDATA = " + JSON.stringify(response.data))
                setLoading(false)
                setUser((response.data.user))
            })
        } catch (error) {
            setLoading(false);
            authtools.handleError(error)
            console.log(error);
        }
    }, []);



    if(loading){
        return (
            <Loading/>
        )
    }

    return (
        <div>
            Hello {user.username}
            <br/>
            User is {JSON.stringify(user)}
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
                <p>History of {user.username} Points:</p>
                <Graph/>
                </TabPanel>
            </TabPanels>
            </Tabs>

        </div>
    )
}

export default Dashboard
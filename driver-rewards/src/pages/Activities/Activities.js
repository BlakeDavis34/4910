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
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Divider,
    Stack,
    Link
    // createColumnHelper
} from '@chakra-ui/react'

import {useState} from "react";

const activities = [
    {
        name: 'Drive 1000 miles',
        description: 'Drive 1000 miles by Friday for 100 points!',
        deadline: '3/3/2023',
        progress: 45/100,
        points: 100
    },
]

const getActivities = () => {
    let actList = []
    activities.forEach(a => {
        actList.push(<>
        {/*<Th></Th>*/}
        </>)
    })
}

const activityCard = (



    <>
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>Living room Sofa</Heading>
                    <Text>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces, earthy toned spaces and for people who love a chic design with a
                        sprinkle of vintage design.
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        $450
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button>Close</Button>
            </CardFooter>
        </Card>
    </>
)

const Activities = () => {

    const [card, setCard] = useState(true)

    //console.log("drivers = " + JSON.stringify(driverlist))

    //const columnHelper = createColumnHelper

    if(card){

    }
    return (
        <>
            <Text fontSize="3xl">Activities</Text>
            <Button href = '/activities/create'> <Link href="activities/create">Create Activity</Link></Button>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Activities</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Description</Th>
                            <Th>Deadline</Th>
                            <Th>Progress</Th>
                            <Th>Points</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/*{driverlist}*/}

                        <Tr>
                            <Td>{activities[0].name}</Td>
                            <Td>{activities[0].description}</Td>
                            <Td>{activities[0].deadline}</Td>
                            <Td>
                                <Progress colorScheme='green' size='sm' value={activities[0].progress * 100} />
                            </Td>
                            {/*<Td>{activities[0].progress}</Td>*/}
                            <Td>{activities[0].points}</Td>
                            <Td>
                                <Button>View</Button>
                            </Td>
                        </Tr>

                    </Tbody>

                </Table>
            </TableContainer>
        </>
    )

}

export default Activities
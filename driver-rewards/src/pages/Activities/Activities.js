import './Activities.css'

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

import {useState} from "react";

//function that acts as a struct
function activity(name, description, deadline, progress, points) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.progress = progress;
    this.points = points;
}

//premade activities, will fill with activities from API later
const activities = [
    new activity (
        'Drive 1000 miles', 
        'Drive 1000 miles by Friday for 100 points!',
        '4/17/2023',
        45/100,
        100
    ),
    new activity (
        'Avoid traffic violations',
        'Avoid traffic violations all week for 50 points!',
        '3/19/2023',
        33/100,
        50
    ),
    new activity (
        'Daily login streak',
        'Log in every day for 20 points!',
        '3/15/2023',
        0/100,
        20
    )
]

//function to display all activities in table
const displayActivities = () => {
    let aList = []
    activities.forEach(a => {
        aList.push(
            <>
                <Tr>
                    <Td>{a.name}</Td>
                    <Td>{a.description}</Td>
                    <Td>{a.deadline}</Td>
                    <Td>
                        <Progress colorScheme='green' size='sm' value={a.progress * 100} />
                    </Td>
                    <Td>{a.points}</Td>
                    <Td>
                        <Button>View</Button>
                    </Td>
                </Tr>
            </>
        )
    })
    return aList
}

const Activities = () => {

    const[table, setTable] = useState([]);

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
                        {displayActivities()}
                    </Tbody>
                    <Tfoot><Tr><Td>
                    <div className="sort-options">
                        <Menu>
                            <MenuButton id = "sort-button" as={Button} colorScheme='blue' alignContent="right">
                                Sort
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Sort by:'>
                                    <MenuItem as='button' onClick={() => {
                                        activities.sort((a, b) => a.name.localeCompare(b.name))
                                        setTable([...table, activities]);
                                    }}>Name</MenuItem>
                                    <MenuItem as='button' onClick={() => {
                                        activities.sort((a, b) => {
                                            let da = new Date(a.deadline),
                                                db = new Date(b.deadline);
                                            return da - db;
                                        })
                                        setTable([...table, activities]);
                                    }}>Deadline</MenuItem>
                                    <MenuItem as='button' onClick={() => {
                                        activities.sort((a, b) => {return b.points - a.points})
                                        setTable([...table, activities]);
                                    }}>Points</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </div></Td></Tr></Tfoot>
                </Table>
            </TableContainer>
        </>
    )

}

export default Activities
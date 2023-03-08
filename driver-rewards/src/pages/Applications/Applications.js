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
    Button
    // createColumnHelper
} from '@chakra-ui/react'

const drivers = [
    {
        name: 'Ron Swanson',
        username: 'ronswanson',
        dob: '1/1/1970',
        dl: '123456789',
        dateSubmitted: '2/23/2023'
    },
    {
        name: 'Drake',
        username: 'certifiedloverboy',
        dob: '1/1/1970',
        dl: '238579238',
        dateSubmitted: '2/21/2023'
    },
    {
        name: 'Joe Biden',
        username: 'POTUS',
        dob: '1/1/1970',
        dl: '238579238',
        dateSubmitted: '2/25/2023'
    },
]

let driverlist = <></>

const Applications = () => {

    // drivers.forEach((driver) => {
    //
    //     driverlist += (
    //         <Tr>
    //             <Td>{driver.name}</Td>
    //             <Td>{driver.username}</Td>
    //             <Td>{driver.dob}</Td>
    //             <Td>{driver.dl}</Td>
    //             <Td>{driver.dateSubmitted}</Td>
    //         </Tr>
    //     )
    // })

    console.log("drivers = " + JSON.stringify(driverlist))

    //const columnHelper = createColumnHelper

    return (
        <>
            <Text fontSize="3xl">Outstanding Driver Applications</Text>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Driver Applications</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Username</Th>
                            <Th>DOB</Th>
                            <Th>DL#</Th>
                            <Th>Date Submitted</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/*{driverlist}*/}

                        <Tr>
                            <Td>{drivers[0].name}</Td>
                            <Td>{drivers[0].username}</Td>
                            <Td>{drivers[0].dob}</Td>
                            <Td>{drivers[0].dl}</Td>
                            <Td>{drivers[0].dateSubmitted}</Td>
                            <Td>
                                <Button>Accept</Button>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>{drivers[1].name}</Td>
                            <Td>{drivers[1].username}</Td>
                            <Td>{drivers[1].dob}</Td>
                            <Td>{drivers[1].dl}</Td>
                            <Td>{drivers[1].dateSubmitted}</Td>
                            <Td>
                                <Button>Accept</Button>
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>{drivers[2].name}</Td>
                            <Td>{drivers[2].username}</Td>
                            <Td>{drivers[2].dob}</Td>
                            <Td>{drivers[2].dl}</Td>
                            <Td>{drivers[2].dateSubmitted}</Td>
                            <Td>
                                <Button>Accept</Button>
                            </Td>
                        </Tr>
                        
                    </Tbody>

                </Table>
            </TableContainer>
        </>
    )

}

export default Applications
import { useState } from "react";
import {
  Button,
  Link,
  Progress,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function Activity({ name, description, deadline, progress, points }) {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <>
      <Tr display={isHidden ? "none" : "table-row"}>
        <Td>{name}</Td>
        <Td>{description}</Td>
        <Td>{deadline}</Td>
        <Td>
          <Progress colorScheme="green" size="sm" value={progress * 100} />
        </Td>
        <Td>{points}</Td>
        <Td>
          <Button
            onClick={() => {
              setIsHidden((prevIsHidden) => !prevIsHidden);
            }}
          >
            {isHidden ? "View" : "Hide"}
          </Button>
        </Td>
      </Tr>
    </>
  );
}

const Activities = () => {
  const activities = [
    {
      name: "Drive 1000 miles",
      description: "Drive 1000 miles by Friday for 100 points!",
      deadline: "4/17/2023",
      progress: 0.45,
      points: 100,
    },
    {
      name: "Avoid traffic violations",
      description: "Avoid traffic violations all week for 50 points!",
      deadline: "3/19/2023",
      progress: 0.33,
      points: 50,
    },
    {
      name: "Daily login streak",
      description: "Log in every day for 20 points!",
      deadline: "3/15/2023",
      progress: 0,
      points: 20,
    },
  ];

  return (
    <>
      <Text fontSize="3xl">Activities</Text>
      
      <Table>
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
          {activities.map((activity) => (
            <Activity {...activity} key={activity.name} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};


export default Activities;
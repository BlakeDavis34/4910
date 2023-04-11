import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import PointHistory from '../PointHistory/PointHistory';
import authtools from '../../authtools';
import Loading from '../../components/Loading/loading';
import Graph from '../../components/PointGraph/Graph';
import Activities from '../Activities/Activities';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import utils from '../../utils';
import { FaEnvelope } from 'react-icons/fa';
import { IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import Messages from '../Messages/Messages';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      authtools.getUser().then((response) => {
        console.log('AT GETDATA = ' + JSON.stringify(response.data));
        setLoading(false);
        setUser(response.data.user);
      });
    } catch (error) {
      setLoading(false);
      authtools.handleError(error);
      console.log(error);
    }
  }, []);

  const handleSendMessage = (to, body) => {
    const newMessage = {
      id: messages.length + 1,
      from: user.username,
      to,
      body,
      read: false,
    };
    setMessages([...messages, newMessage]);
  };

  const handleOpenMessages = () => {
    setIsMessagesOpen(true);
    setUnreadMessages([]);
    setMessages(
      messages.map((message) => ({
        ...message,
        read: true,
      }))
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
      <IconButton
          icon={<FaEnvelope />}
          className="message"
          aria-label="Messages"
          onClick={handleOpenMessages}
          style={{ position: 'absolute', top: '20px', right: '10px' }} // Added style to position the icon
        />

        <Drawer isOpen={isMessagesOpen} placement="right" onClose={() => setIsMessagesOpen(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Messages</DrawerHeader>
            <DrawerBody>
              <Messages messages={messages} unreadMessages={unreadMessages} sendMessage={handleSendMessage} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <br />
        <Tabs isFitted variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab>Activities</Tab>
            <Tab>Catalog</Tab>
            <Tab>Points</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Activities />
              <displayActivities />
            </TabPanel>
            <TabPanel>
              <p>Catalog:</p>
            </TabPanel>
            <TabPanel>
              <Link to="/PointHistory" className="link">
                View Full History
              </Link>
              <Graph />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Router>
  );
};

export default Dashboard;

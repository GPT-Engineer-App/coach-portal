import React, { useState } from "react";
import { Box, Heading, Text, Button, Flex, Input, Textarea, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FaUser, FaDumbbell, FaComments } from "react-icons/fa";

const Index = () => {
  const [isCoach, setIsCoach] = useState(true);
  const [clients, setClients] = useState([
    { id: 1, name: "John Doe", goal: "Lose weight", progress: "Lost 5 lbs" },
    { id: 2, name: "Jane Smith", goal: "Build muscle", progress: "Gained 2 lbs of muscle" },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Great job on your workout today!", sender: "coach" },
    { id: 2, text: "Thanks coach, feeling stronger already!", sender: "client" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: isCoach ? "coach" : "client",
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <Box p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl">
          {isCoach ? "Coach Portal" : "Client Portal"}
        </Heading>
        <Button onClick={() => setIsCoach(!isCoach)}>Switch to {isCoach ? "Client" : "Coach"} Portal</Button>
      </Flex>

      {isCoach ? (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Clients
          </Heading>
          {clients.map((client) => (
            <Flex key={client.id} bg="gray.100" p={4} mb={4} align="center">
              <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDB8fHx8MTcxMDU3NzgyNHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Client Avatar" w={12} h={12} mr={4} rounded="full" />
              <Box>
                <Heading as="h3" size="md">
                  {client.name}
                </Heading>
                <Text>
                  <strong>Goal:</strong> {client.goal}
                </Text>
                <Text>
                  <strong>Progress:</strong> {client.progress}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
      ) : (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            My Coach
          </Heading>
          <Flex bg="gray.100" p={4} mb={4} align="center">
            <Image src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwY29hY2h8ZW58MHx8fHwxNzEwNTc3ODI0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Coach Avatar" w={12} h={12} mr={4} rounded="full" />
            <Box>
              <Heading as="h3" size="md">
                Coach Smith
              </Heading>
              <Text>Certified Personal Trainer</Text>
            </Box>
          </Flex>
        </Box>
      )}

      <Heading as="h2" size="lg" my={8}>
        Messages
      </Heading>
      <Box h={300} overflowY="scroll" border="1px solid" borderColor="gray.200" p={4}>
        {messages.map((message) => (
          <Flex key={message.id} bg={message.sender === "coach" ? "blue.100" : "green.100"} color={message.sender === "coach" ? "blue.800" : "green.800"} p={2} mb={2} align="center" justify={message.sender === "coach" ? "flex-start" : "flex-end"}>
            {message.sender === "coach" && <FaUser size={20} mr={2} />}
            <Text>{message.text}</Text>
            {message.sender === "client" && <FaUser size={20} ml={2} />}
          </Flex>
        ))}
      </Box>
      <Flex mt={4}>
        <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." mr={4} />
        <Button onClick={handleSendMessage} colorScheme="blue">
          Send
        </Button>
      </Flex>

      <Button onClick={onOpen} colorScheme="green" size="lg" mt={8} leftIcon={<FaDumbbell />}>
        {isCoach ? "Assign Workout" : "View Workout"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isCoach ? "Assign Workout" : "Today's Workout"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isCoach ? (
              <Textarea placeholder="Enter workout details..." rows={6} />
            ) : (
              <Box>
                <Text mb={2}>3 sets of:</Text>
                <ul>
                  <li>10 Push-ups</li>
                  <li>15 Squats</li>
                  <li>20 Sit-ups</li>
                </ul>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              {isCoach ? "Assign" : "Close"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;

import {
  Button,
  Divider,
  Heading,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import React from "react";
import AddItem from "./AddItem";
import { useNavigate } from "react-router-dom";
import MyList from "./MyList";
import ItemForm from "./ItemForm";
import ItemModal from "./ItemModel";

const Home = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  // const firstFieldRef = React.useRef(null)
  const navigate = useNavigate();
  const navigateToAdd = () => {
    navigate("/additem");
  };
  return (
    <VStack w="100%" justifyContent="center" p="20px">
        <VStack
            w="80%"
            shadow="2xl"
            border="5px solid aliceblue"
            borderRadius="10px"
            justifyContent="center"
            gap="50px"
            p="50px"
        >
            <VStack w="100%" gap="70px">
                <Heading>React ToDo App</Heading>
                <Button type="button" value='Add' w="50%" p='50px' fontSize="xx-large" onClick={onOpen}>+Add</Button>

                <ItemModal isOpen={isOpen} onClose={onClose} mode="add" />
                <Divider />
            </VStack>

            <MyList />
        </VStack>
    </VStack>

  );
};

export default Home;

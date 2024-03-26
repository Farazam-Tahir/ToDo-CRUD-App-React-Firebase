import {
  Button,
  Divider,
  Heading,
  VStack,
  useDisclosure,
  Spinner,
  Box
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import MyList from "./MyList";
import ItemModal from "./ItemModel";
import useLoadingStore from "../Store/LoadingStore/LoadingStore";


const Home = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {loading, setLoading} = useLoadingStore();
  const navigate = useNavigate();
  const navigateToAdd = () => {
    navigate("/additem");
  };
  return (
    <VStack w="100%" justifyContent="center" p="20px">
      {loading ? (
        <VStack w='100%' h='100vh' justifyContent='center' alignItems='center'>
          <Spinner size="xl" color="blue.500" />
        </VStack>
      ) : (
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
      )}
    </VStack>

  );
};

export default Home;

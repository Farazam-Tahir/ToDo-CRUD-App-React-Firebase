import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  List,
  HStack,
  ListItem,
  Text,
  Heading,
  VStack,
  useDisclosure,
  position,
} from "@chakra-ui/react";
import { fetchData, deleteTodoItem , addItem } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import ItemModal from "./ItemModel";

const MyList = () => {
  // declaring and initiallizing my list state
  const [list, setList] = useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();
  console.log(dragItem);

  const navigate = useNavigate();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleUpdate = (docId) => {
    onOpen();
    navigate("/", { state: { id: docId } });
  };

  // receiving data from database and assining it to my list State
  useEffect(() => {
    const getDataFormDb = async () => {
      const receiveData = await fetchData();
      setList(receiveData);
    };
    getDataFormDb();
  }, []);

  console.log(list);

  const dragStart = (e, position)=>{
    // e.preventDefault();
    dragItem.current = position;
    // console.log(e.target.innerHTML);
  }
  const dragEnter = (e, position)=>{
    // e.preventDefault();
    dragOverItem.current = position;
    // console.log(e.target.innerHTML);
  }
  const drop = async(e) => {
    // e.preventDefault();
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
    await addItem(list);
  };

  console.log("updated list");
  console.log(list);

  return (
    <VStack w={"100%"} gap={"20px"}>
      <Heading>My List</Heading>
      <List spacing={2} w={"100%"}>
        {list.map((doc, index) => {
          return (
            <ListItem
              key={doc.id}
              w={"100%"}
              bgColor={"gray.300"}
              p={"20px"}
              borderRadius={"10px"}
              draggable = "true"
              onDragStart={(e)=> dragStart(e, index)}
              onDragEnter={(e)=> dragEnter(e,index)}
              onDragEnd={drop}
            >
              <HStack justifyContent={"space-between"}>
                <Text>{doc.item}</Text>

                <Text color={doc.dueDate >= 0 ? "black" : "red"}>
                  {doc.dueDate >= 0
                    ? `${doc.dueDate} days remaining`
                    : "Expired"}
                </Text>

                <HStack>
                  <Button
                    colorScheme="teal"
                    onClick={() => handleUpdate(doc.id)}
                  >
                    Update
                  </Button>

                  <Button
                    colorScheme="red"
                    onClick={() => deleteTodoItem(doc.id)}
                  >
                    Remove
                  </Button>
                </HStack>
              </HStack>
            </ListItem>
          );
        })}
      </List>

      <ItemModal isOpen={isOpen} onClose={onClose} mode="update" />
    </VStack>
  );
};

export default MyList;

import React, { useEffect, useState } from 'react';
import { Button, HStack, Heading, List, ListItem, Text, VStack } from '@chakra-ui/react';
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from './FirebaseConfig';
import dayjs from 'dayjs';




const MyList = () => {

    // declaring and initiallizing my list state
    const [list, setList] = useState([]);
    
    // setting date state 
    const [remainingDays, setRemainingDays] = useState(0);

    const getRemainingDays = (date)=>{
        const today = dayjs();
        const targetDate = dayjs(date);
        const diffInDays = targetDate.diff(today, 'day');
        return diffInDays
    }

    const fetchData = async () => {
            
        try {

            const dbData = await getDocs(collection(db, "todo-app"));
            const newList = [];
            dbData.forEach((doc) => {
                let newDate=getRemainingDays(doc.data().dueDate);
                newList.push({...doc.data(), dueDate : newDate});
            });
            setList(newList);
            console.log("Data Received successfully");

        } catch (error) {
            console.log(error);
        }
    };

    // receiving data from database and assining it to my list State
    useEffect(() => {
        
        fetchData();

    }, []);

        

const deleteTodoItem = async (todoDeleteId) =>{

    try{
        await deleteDoc(doc(db, "todo-app", todoDeleteId))
        console.log("Todo item successfully deleted!");
    }catch(error) {
      console.error("Error removing todo item: ", error);
    };

    fetchData();
}

  return (
    <VStack w={'100%'} gap={'20px'}>
        <Heading>
            My List
        </Heading>
        <List spacing={2} w={'100%'}>
        
            {list.map((doc)=>{
                return(
                    <ListItem key={doc.id} w={'100%'} bgColor={'gray.300'} p={'20px'} borderRadius={'10px'}>
                        <HStack justifyContent={'space-between'}>
                            
                            <Text>
                                {doc.item}
                            </Text>
                            
                            <Text>
                                {doc.dueDate} days remaining
                            </Text>

                            <HStack>
                                <Button colorScheme='teal'>
                                    Update
                                </Button>

                                <Button colorScheme='red' onClick={()=> deleteTodoItem(doc.id)}>
                                    Remove
                                </Button>
                            </HStack>
                        </HStack>
                    </ListItem>
                );
            })}

        </List>
    </VStack>
  )
}

export default MyList;
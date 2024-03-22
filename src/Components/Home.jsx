import { Button, Divider, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import AddItem from './AddItem';
import { useNavigate } from 'react-router-dom';
import MyList from './MyList';


const Home = () => {
    const navigate = useNavigate();
    const navigateToAdd = ()=>{
        navigate('/additem');
    }
  return (
    <>
        <VStack w={'100%'} justifyContent={'center'} p={'20px'}>
            <VStack w={'80%'} shadow={'2xl'} border={'5px solid gray'} borderRadius={'10px'} justifyContent={'center'} gap={'50px'} p={'20px'}>
                <VStack w={'100%'} gap={'70px'}>
                    <Heading>
                        React ToDo App
                    </Heading>

                    <Button w={'50%'} p={'50px'} fontSize={'xx-large'} onClick={navigateToAdd}>
                        +Add
                    </Button>

                    <Divider/>
                </VStack>
                <MyList/>
            </VStack>
        </VStack>
      
    </>
  )
}

export default Home;

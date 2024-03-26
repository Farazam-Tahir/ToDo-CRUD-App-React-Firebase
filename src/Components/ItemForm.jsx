import React, { useEffect, useState } from 'react';
import { Button, Heading, Input, VStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import { db } from './FirebaseConfig';

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

const ItemForm = ({ mode }) => {
    const [formData, setFormData] = useState({
        id: '',
        item: '',
        dueDate: ''
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'update') {
            const getUpdateItemData = async (docId) => {
                const userDocument = await getDoc(doc(db, "todo-app", docId));
                const { item, dueDate, id } = userDocument.data();
                setFormData({ item, dueDate, id });
            }
            getUpdateItemData(location.state.id);
        }
    }, [mode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'add') {
                const newId = generateUUID();
                await setDoc(doc((collection(db, "todo-app")), newId), { ...formData,  id : newId });
                console.log("Todo item successfully added!");
            } else if (mode === 'update') {
                await setDoc(doc(collection(db, "todo-app"), location.state.id), { ...formData });
                console.log("Todo item successfully updated!");
                console.log(formData);
            }
            
            window.location.reload();

        } catch (error) {
            console.error(`Error ${mode === 'add' ? 'adding' : 'updating'} todo item: `, error);
        }

    };
    console.log(formData);

    return (
        <VStack w='100%' justifyContent='center' h='70vh'>
            <VStack w='100%' gap='50px' p='20px'>
                <Heading>{mode === 'add' ? 'Add Item' : 'Update Item'}</Heading>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack gap='10px'>
                        <Input type='text' placeholder='Add item to the list...' name='item' value={formData.item} onChange={handleInputChange} p='30px' />
                        <Input type='date' name='dueDate' value={formData.dueDate} onChange={handleInputChange} p='30px' />
                        <Button type='submit' py='30px' px='50px' fontSize='large'>
                            {mode === 'add' ? 'Add' : 'Update'}
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </VStack>

    );
};

export default ItemForm;

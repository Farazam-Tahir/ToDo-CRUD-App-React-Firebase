// import { Button, Heading, Input, VStack } from '@chakra-ui/react';
// import { useLocation } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { setDoc, doc, collection, getDoc } from "firebase/firestore";
// import { db } from './FirebaseConfig';


// // My main Component AddItem
// const UpdateItem = () => {

//     //My initial States
//     const [updateItemData, setUpdateItemData] = useState({
//         id : '',
//         item : '',
//         dueDate : ''
//     });

    

//     // initiallizing navigate
//     const location = useLocation();
//     console.log(location);
    


//     // Adding input data to my states
//     const handleInput = (e)=>{
//         const {name, value} = e.target;
//         setUpdateItemData({...updateItemData, [name] : value});
//     }


//     // sending data to firebase
//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         console.log(updateItemData);

//         try {
//             await setDoc(doc(collection(db, "todo-app"), location.state.id), { ...updateItemData });
//             console.log("Todo item successfully updated!");
//           } catch (error) {
//             console.error("Error updating todo item: ", error);
//           }

//         window.location.reload();

//     }


//     //getting data of the item to update
//     useEffect(()=>{
//         const getUpdateItemData = async (docId)=>{
//             const userDocument = await getDoc(doc(db, "todo-app", docId));
//             setUpdateItemData({id : userDocument.data().id, item : userDocument.data().item, dueDate : userDocument.data().dueDate});
//         }
//         getUpdateItemData(location.state.id);
//     },[]);
    
//   return (
//     <>
//       <VStack w={'100%'} justifyContent={'center'} h={'70vh'}>
//                 <VStack w={'100%'} gap={'50px'} p={'20px'}>
//                     <Heading>
//                         Update Item
//                     </Heading>

//                     <form onSubmit={handleSubmit} style={{width : '100%'}}>
//                         <VStack gap={'10px'}>
//                             <Input type='text' placeholder='Add item to the list...' name='item' 
//                             value = {updateItemData.item} onChange={handleInput} p={'30px'} />

//                             <Input type='date' name='dueDate' value={updateItemData.dueDate} onChange={handleInput} p={'30px'}/>
                                
//                             <Input type='submit' value='Update' py={'30px'} px={'50px'} fontSize={'large'} mt={'20px'} />
                                
//                         </VStack>
//                     </form>

//                 </VStack>
//         </VStack>
//     </>
//   )
// }

// export default UpdateItem;

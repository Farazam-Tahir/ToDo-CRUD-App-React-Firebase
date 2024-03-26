// import { Button, Heading, Input, VStack } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// import { setDoc, doc, collection } from "firebase/firestore";
// import { db } from './FirebaseConfig';


// // generating uuid for later use
// function generateUUID() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       var r = Math.random() * 16 | 0,
//           v = c === 'x' ? r : (r & 0x3 | 0x8);
//       return v.toString(16);
//     });
// }

// // My main Component AddItem
// const AddItem = () => {

//     //My initial States
//     const [itemData, setItemData] = useState({
//         id : generateUUID(),
//         item : '',
//         dueDate : ''
//     });

//     // initiallizing navigate
//     const navigate = useNavigate();

//     // closing dialog of AddItem
//     const closeAdd = ()=> navigate('/');

//     // Adding input data to my states
//     const handleInput = (e)=>{
//         const {name, value} = e.target;
//         setItemData({...itemData, [name] : value});
//     }

//     // sending data to firebase
//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         console.log(e);

//         try{
            
//             const docRef = await setDoc(doc((collection(db, "todo-app")), itemData.id), { ...itemData });
        
//             console.log("Todo item successfully added!");

//           }catch(error) {
//             console.error("Error adding todo item: ", error);
//           };

//         // window.location.reload();

//     }
    
//   return (
//     <>
//       <VStack w={'100%'} h={'70vh'} justifyContent={'center'} >
//                 <VStack w={'100%'} gap={'50px'} p={'20px'}>
//                     <Heading>
//                         Add Item
//                     </Heading>

//                     <form onSubmit={handleSubmit} style={{width : '100%'}}>
//                         <VStack gap={'10px'}>
//                             <Input type='text' placeholder='Add item to the list...' name='item' 
//                             value = {itemData[itemData.item]} onChange={handleInput} p={'30px'} />

//                             <Input type='date' name='dueDate' value={itemData[itemData.dueDate]} onChange={handleInput} p={'30px'}/>
                                
//                                 <Input type='submit' value='Add' mt={'30px'} py={'30px'} px={'50px'} fontSize={'large'}/>
//                         </VStack>
//                     </form>
//                 </VStack>
//         </VStack>
//     </>
//   )
// }

// export default AddItem;

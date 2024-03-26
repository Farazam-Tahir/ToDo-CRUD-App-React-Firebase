import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getRemainingDays } from "../GlobalFunctions/RemainingDays";
import { generateUUID } from "../GlobalFunctions/Uuid";

// configuring firbase
const firebaseConfig = {
  apiKey: "AIzaSyBC8Vvc-7M8g6uyBbJNmWJp7di-aPRvKGs",
  authDomain: "todoreact-cf669.firebaseapp.com",
  projectId: "todoreact-cf669",
  storageBucket: "todoreact-cf669.appspot.com",
  messagingSenderId: "99466755230",
  appId: "1:99466755230:web:8378f3c9def08407d6cf8f",
};

// initiallizing firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// fetchData from db
export const fetchData = async () => {
  try {
    const dbData = await getDocs(collection(db, "todo-app"));
    const newList = [];
    dbData.forEach((doc) => {
      let newDate = getRemainingDays(doc.data().dueDate);
      newList.push({ ...doc.data(), dueDate: newDate });
    });

    console.log("Data Received successfully");
    return newList;
  } catch (error) {
    console.log(error);
  }
};

// add item to db
export const addItem = async (formData) => {
  const newId = generateUUID();
  await setDoc(doc(collection(db, "todo-app"), newId), {
    ...formData,
    id: newId,
  });
};

// update item in db
export const updateItem = async (itemId, formData) => {
  await setDoc(doc(collection(db, "todo-app"), itemId), {
    ...formData,
  });
};

// delete Data From db
export const deleteTodoItem = async (todoDeleteId) => {
  try {
    await deleteDoc(doc(db, "todo-app", todoDeleteId));
    console.log("Todo item successfully deleted!");
  } catch (error) {
    console.error("Error removing todo item: ", error);
  }

  window.location.reload();
};

export const getUpdateItemData = async (docId) => {
  const userDocument = await getDoc(doc(db, "todo-app", docId));
  console.log("update item data");
  console.log(userDocument.data());
  return userDocument.data();
};

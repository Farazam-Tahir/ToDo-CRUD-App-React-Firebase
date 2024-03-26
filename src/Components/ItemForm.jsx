import React, { useEffect, useState } from "react";
import { Button, Heading, Input, VStack, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getUpdateItemData, addItem, updateItem } from "./FirebaseConfig";
import useLoadingStore from "../Store/LoadingStore/LoadingStore";

const ItemForm = ({ mode, onClose }) => {
  console.log(onClose);
  const { loading, setLoading } = useLoadingStore();
  const [formData, setFormData] = useState({
    id: "",
    item: "",
    dueDate: "",
  });
  const location = useLocation();

  useEffect(() => {
    if (mode === "update") {
      const getUpdateItem = async (docId) => {
        const data = await getUpdateItemData(docId);
        const { item, dueDate, id } = data;
        setFormData({ item, dueDate, id });
      };
      getUpdateItem(location.state.id);
    }
  }, [mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "add") {
        await addItem(formData);
        console.log("Todo item successfully added!");
      } else if (mode === "update") {
        await updateItem(location.state.id, formData);
        console.log("Todo item successfully updated!");
      }

      onClose();
      setLoading(false);
    } catch (error) {
      console.error(
        `Error ${mode === "add" ? "adding" : "updating"} todo item: `,
        error
      );
    }
  };
  console.log("form data");
  console.log(formData);

  return (
    <VStack w="100%" justifyContent="center" h="70vh">
      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : (
        <VStack w="100%" gap="50px" p="20px">
          <Heading>{mode === "add" ? "Add Item" : "Update Item"}</Heading>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack gap="10px">
              <Input
                type="text"
                placeholder="Add item to the list..."
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                p="30px"
              />
              <Input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                p="30px"
              />
              <Button type="submit" py="30px" px="50px" fontSize="large">
                {mode === "add" ? "Add" : "Update"}
              </Button>
            </VStack>
          </form>
        </VStack>
      )}
    </VStack>
  );
};

export default ItemForm;

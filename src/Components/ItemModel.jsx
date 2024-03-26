import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody } from "@chakra-ui/react";
import ItemForm from './ItemForm';

const ItemModal = ({ isOpen, onClose, mode }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <ItemForm mode={mode} />
                </ModalBody>
            </ModalContent>
        </Modal>   
    );
};

export default ItemModal;

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react'
import { useParams } from 'react-router-dom';
import { updateUser } from '../queries';

const ProfileEditAlert = ({ userData, setLoading2, disabled }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");
  const toast = useToast();
  const { userId } = useParams();

  const handleUpdate = async() => {
    setLoading2(true);
    onClose();
    
    const updateQuery = await updateUser({
      ...userData,
      firstname: userData.firstname,
      email: userData.email,
    });

    if(updateQuery.success){
      setLoading2(true);
      toast({
        title: "Datos actualizados",
        status: "success",
        description: "Seras redireccionado al inicio...",
        duration: 3000,
        isClosable: true,
      });
      setInterval(() => {
        window.location.replace(`${window.location.origin}`);
      }, 2000);
      return;
    }

    setLoading2(false);
    toast({
      title: "No se pudieron actualizar los datos",
      status: "error",
      description: `${updateQuery.message}`,
      duration: 3000,
      isClosable: true,
    });

    setLoading2(false);

  }


  return (
    <>
      <Button disabled={disabled} type="button" bgColor={buttonGreenie} onClick={onOpen}>
        Actualizar datos
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cambiar datos de usuario
            </AlertDialogHeader>

            <AlertDialogBody>
              Estas seguro de realizar esta acción? Tus datos de usuario se veran modificados
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button type="button" ref={cancelRef as any} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                colorScheme="green"
                onClick={handleUpdate}
                ml={3}
              >
                Estoy seguro
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ProfileEditAlert
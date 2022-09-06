import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { deletePet } from "../queries";

const FindedAlert = ({ dataPet, setLoading }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");
  const toast = useToast();
  const { objectID } = useParams();

  // MANEJAR EL DELETE PET ACA - En caso de pet encontrado
  const handleDelete = async () => {
    onClose();
    setLoading(true);
    const deleteQuery = await deletePet(objectID);
    console.log(deleteQuery);
    if (deleteQuery.deleted) {
      setLoading(false);
      toast({
        title: "Mascota eliminada",
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
    setLoading(false);
    toast({
      title: "Error al intentar eliminar mascota",
      status: "error",
      description: "Intentalo mas tarde",
      duration: 3000,
      isClosable: true,
    });

    setLoading(false);
  };

  return (
    <>
      <Button type="button" bgColor={buttonGreenie} onClick={onOpen}>
        Mascota encontrada
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reportar como encontrada
            </AlertDialogHeader>

            <AlertDialogBody>
              Esta seguro de realizar esta acción? Se eliminará a la mascota de
              la base de datos
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button type="button" ref={cancelRef as any} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                colorScheme="green"
                onClick={handleDelete}
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
};

export default FindedAlert;

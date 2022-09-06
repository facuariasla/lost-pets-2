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
import React, {  useState } from "react";
import { changePassword } from "../queries";

const PassChangeAlert = ({ setLoading2, dataChange }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");
  const toast = useToast();
  const [samePass, setSamePass] = useState(false);


  const handlePass = async (e: any) => {
    e.preventDefault();
    onClose();
    setLoading2(true);

    let actualpass = dataChange.actualpass;
    let newpass = dataChange.newpass;
    let newpass2 = dataChange.newpass2;
    console.log({
      actualpass,
      newpass,
      newpass2,
    });
    let restriction = null || undefined || "";

    // conditionals
    if (
      actualpass === restriction ||
      newpass === restriction ||
      newpass2 === restriction
    ) {
      setLoading2(false);
      toast({
        title: "Completa el formulario",
        status: "error",
        description: "Rellena los campos vacios",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (actualpass.length < 4 || newpass.length < 4 || newpass2.length < 4) {
      setLoading2(false);
      toast({
        title: "Deben tener entre 4 y 16 caracteres",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (newpass !== newpass2) {
      setLoading2(false);
      toast({
        title: "Las contraseñas deben coincidir",
        status: "error",
        description: "*Repetir contraseña nueva",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const changePassQuery = await changePassword({
      actualpass,
      newpass,
      newpass2,
    });

    if (changePassQuery.success) {
      setLoading2(false);
      toast({
        title: "Tu contraseña ha sido cambiada",
        status: "success",
        description: "La sesión se cerrará",
        duration: 5000,
        isClosable: true,
      });
      console.log(changePassQuery);
      setInterval(() => {
        localStorage.removeItem("token_lostpet");
        localStorage.removeItem("user_lostpet");
        window.location.replace(`${window.location.origin}`);
      }, 3000);
    } else if (changePassQuery.message){
      setLoading2(false);
      console.log(changePassQuery.message)
      toast({
        title: "Error",
        description: `${changePassQuery.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  


  return (
    <>
      <Button bgColor={buttonGreenie} onClick={onOpen}>
        Confirmar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cambiar contraseña
            </AlertDialogHeader>

            <AlertDialogBody>
              Tu contraseña se cambiará, y deberas volver a iniciar sesión
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button type="button" ref={cancelRef as any} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                colorScheme="green"
                onClick={handlePass}
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

export default PassChangeAlert;

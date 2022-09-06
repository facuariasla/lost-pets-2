import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
  FormLabel,
  Button,
  Text,
  Textarea,
  useToast,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { reportPetAround } from "../queries";

const HomeReport = ({ petData }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const [reportData, setReportData] = useState<Object>();

  const handleReport = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    let data = {
      firstname: e.target.firstname.value,
      phone: e.target.phone.value,
      description: e.target.description.value,
      userId: petData.userId,
      petname: petData.petname,
      objectID: petData.objectID,
    };
    console.log(data);
    setReportData(data);
    const reportQuery = await reportPetAround(data);
    console.log(reportQuery);
    toast({
      title: "Mensaje enviado al dueño",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Text
        fontWeight={500}
        fontSize={16}
        transition="all .3s"
        _hover={{ color: "pinkie.500" }}
        _active={{ color: "pinkie.500" }}
        cursor="pointer"
        onClick={onOpen}
      >
        Reportar
      </Text>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form action="" onSubmit={handleReport}>
            <ModalHeader>
              <Text color="pinkie.500" textOverflow="ellipsis">
                Reportar info de {petData.petname}
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Tu nombre</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Ej: Juan Peréz"
                  required
                  maxLength={100}
                  type="text"
                  name="firstname"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tu teléfono</FormLabel>
                <Input
                  placeholder="Ej: 299 4112233"
                  required
                  minLength={7}
                  maxLength={16}
                  type="tel"
                  name="phone"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  resize="none"
                  placeholder="Ej: Lo estoy reteniendo en la esquina de Avenida e Irigoyen..."
                  maxLength={500}
                  name="description"
                />
              </FormControl>
            </ModalBody>

            {loading && (
              <ModalFooter>
                <Stack align="center" justify="center">
                  <Spinner size="xl" />
                </Stack>
              </ModalFooter>
            )}

            {!loading && (
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Enviar
                </Button>
                <Button onClick={onClose}>Cancelar</Button>
              </ModalFooter>
            )}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomeReport;

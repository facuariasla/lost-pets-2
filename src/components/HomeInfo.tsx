import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const HomeInfo = ({ petData }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        fontWeight={500}
        fontSize={16}
        transition="all .3s"
        _hover={{ color:"pinkie.500" }}
        _active={{color:"pinkie.500" }}
        cursor="pointer"
        onClick={onOpen}
      >
        Información
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader >
            <Text color='pinkie.500'>{petData.petname}</Text>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {petData.description}
            <Text pt={6}>Última vez visto en:</Text>
            <Text fontWeight={500}>📍 {petData.location}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomeInfo;

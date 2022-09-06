import {
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myPetsReported } from "../queries";


const MyPets = () => {
  const colorName = useColorModeValue("#31ac3d", "#63c96c");
  const [loading, setLoading] = useState<boolean>(false);
  const [myPetsData, setMyPets] = useState<Array<any> | null>(null);
  const [dataExist, setDataExist] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const myPetsDBFN = async () => {
      const MyPetsDB: any = await myPetsReported();
      // console.log(MyPetsDB);
      if (MyPetsDB.message) {
        setDataExist(false);
        return;
      }

      setMyPets(MyPetsDB);
      if (MyPetsDB.length === 0) {
        setDataExist(false);
      }
      setLoading(false);
    };
    myPetsDBFN();
  }, []);

  return (
    <Stack w="100%" align="center">
      <Stack p={10} spacing={8} w={["350px", "550px", "800px", "1024px"]}>
        <Heading w="100%">Mascotas reportadas</Heading>

        {loading && (
          <Stack align="center" justify="center">
            <Spinner size="xl" />
          </Stack>
        )}

        {!dataExist && (
          <Text fontSize={20}>Aún no se te pierde ninguna mascota</Text>
        )}

        <SimpleGrid
          minChildWidth="200px"
          gap={4}
          w="100%"
          alignItems="center"
          justifyItems="center"
        >
          {myPetsData?.map((el) => (
            <Stack
              w="200px"
              maxH="310px"
              minH="280px"
              align="center"
              key={el.id}
              borderRadius={6}
              boxShadow="dark-lg"
              textOverflow="ellipsis"
              overflow="hidden"
            >
                <Image
                  w="100%"
                  h='150px'
                  src={el.petPhoto}
                  borderTopRadius={6}
                  objectFit="contain"
                  alt='foto de mascota'
                />

              <Stack
                align="center"
                px={3}
                pb={2}
                textOverflow="ellipsis"
                overflow="hidden"
                w="100%"
              >
                <Heading
                  color={colorName}
                  noOfLines={1}
                  fontSize="18px"
                  fontWeight="700"
                  textOverflow="ellipsis"
                  textAlign="center"
                  w="100%"
                >
                  {el.petname}
                </Heading>
                <Heading
                  noOfLines={1}
                  fontSize="16px"
                  fontWeight="500"
                  textOverflow="ellipsis"
                >
                  {el.description}
                </Heading>
                <Heading
                  noOfLines={1}
                  fontSize="16px"
                  fontWeight="500"
                  flexDirection="row"
                  textOverflow="ellipsis"
                >
                  📍 {el.location}
                </Heading>
                <Link to={`/editpet/${el.objectID}`}>
                  <Text
                    fontWeight="bold"
                    cursor="pointer"
                    transition="all .2s"
                    color="#ff9358"
                    textOverflow="ellipsis"
                    _hover={{ color: "tomato" }}
                  >
                    EDITAR
                  </Text>
                </Link>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default MyPets;

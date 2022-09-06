import {
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Spinner,
  SimpleGrid,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Corgi from "../components/Corgi/Corgi";
import HomePetCard from "../components/HomePetCard";
import { lostPetsAround } from "../queries";
import { BiLinkExternal } from "react-icons/bi";

export const Home = () => {
  const buttonGum = useColorModeValue("#FF9DF5", "#874b80");
  const gumMode = useColorModeValue("gum.700", "gum.500");
  const URLvariant = useBreakpointValue({
    base: "https://support.google.com/chrome/answer/142065?hl=es-419&co=GENIE.Platform%3DAndroid",
    md: "https://support.google.com/chrome/answer/142065?hl=es&co=GENIE.Platform%3DDesktop",
  });

  const [locActive, setLocActive] = useState(false);
  const [dataPetDB, setDataPetDB] = useState<Array<Object> | null>(null);
  const [dataExist, setDataExist] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [usLocation, setUsLocation] = useState<any>({
    loaded: false,
    lat: "",
    lng: "",
  });

  const onSuccess = async (location: any) => {
    setLoading(true);
    setLocActive(true);
    setUsLocation({
      loaded: true,
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });

    const petsFromDB: any = await lostPetsAround(
      location.coords.latitude,
      location.coords.longitude
    );
    setDataPetDB(petsFromDB);
    console.log(petsFromDB.length);
    if (petsFromDB.length === 0) {
      setDataExist(false);
    } else {
      setDataExist(true);
      console.log(petsFromDB);
    }
    setLoading(false);
  };

  const onError = (error: any) => {
    setLoading(true);
    setUsLocation({
      loaded: true,
      error,
    });
    setLocActive(false);
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("userlostpet") !== (null || undefined)) {
      localStorage.removeItem("userlostpet");
    }

    console.log("Corg from: Charles the CSS Corgi - Mok Jee Jin");
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  // ACTIVA LA UBICACION ACTUAL (Obtener LAT y LNG para usar en la sig funcion)

  return (
    <Stack direction="column" align="center" justify="center">
      <Stack p={6} gap={[2, 8]}>
        <Stack>
          <Heading fontSize={[42, null, 52]} textAlign="center">
            Mascotas perdidas cerca tuyo
          </Heading>
          <Text textAlign="center" color="gray.400" fontWeight={500}>
            (A 2km de radio)
          </Text>
        </Stack>
        {!dataExist && (
          <Stack pt={0} px={4}>
            <Text
              fontWeight={500}
              pb={6}
              fontSize={[18, null, 20]}
              textAlign="center"
              color={gumMode}
            >
              No hay mascotas reportadas como perdidas cerca tuyo
            </Text>
            <Stack>
              <Corgi />
            </Stack>
          </Stack>
        )}

        {!locActive && (
          <Stack spacing={10} maxW="xl" justify="center" alignSelf="center">
            <Text
              opacity="0.85"
              fontWeight="500"
              fontSize={[16, 16, 20]}
              textAlign="center"
            >
              PARA VER LAS MASCOTAS REPORTADAS CERCA TUYO NECESITAMOS PERMISO
              PARA CONOCER TU UBICACIÓN
            </Text>
            {/* <Button bgColor={buttonGum} h={12} onClick={myLocation}>
              Dar mi ubicación
            </Button> */}
            {!locActive && (
              <Stack align="center">
                <Link href={URLvariant} isExternal color="tomato">
                  <Stack direction="row" align="center">
                    <Text fontWeight={600} textAlign="center">
                      Cómo activar ubicación en Chrome{" "}
                    </Text>
                    <BiLinkExternal />
                  </Stack>
                </Link>
              </Stack>
            )}
          </Stack>
        )}

        <SimpleGrid py={4} minChildWidth="300px" gap={6} justifyItems="center">
          {dataPetDB?.map((el: any) => (
            <HomePetCard key={el.objectID} petData={el} />
          ))}
        </SimpleGrid>

        {loading && (
          <Stack align="center" justify="center">
            <Spinner size="xl" />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

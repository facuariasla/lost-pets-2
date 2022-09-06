import {
  Button,
  Heading,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import MapBoxR from "../libs/mapbox/MapBoxR";
import DropChakra from "../libs/dropzone/DropChakra";
import { PetData } from "../Types";
import { createPet } from "../queries";

const initialPet: PetData = {
  petname: "",
  description: "",
  location: "",
  lat: 0,
  lng: 0,
  petPhoto: "",
};


const NewPet = () => {
  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");
  const buttonGrey = useColorModeValue("#8b8b8b", "#636363");

  const [petPhoto, setPetPhoto] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [petData, setPetData] = useState<PetData>(initialPet);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleDATA = () => {
    console.log({ ...petData, petPhoto, lat, lng });
  };

  const handleFORM = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const allData = { ...petData, petPhoto, lat, lng };

    console.log(allData);
    const newPet = await createPet(allData);
    if (newPet.postgres.objectID && newPet.algolia.taskID) {
      setLoading(false);
      toast({
        title: "Mascota agregada como perdida",
        description: "Redireccionando al inicio",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.replace(`${window.location.origin}`);
      }, 1500);
      return;
    }
    setLoading(false);
    console.log("La mascota no pudo ser creada, intentelo mas tarde");
    alert("La mascota no pudo ser creada, intentelo mas tarde");
  };

  return (
    <Stack align="center">
      <Stack p={6} maxW="600px">
        <Heading pb={8} onClick={() => handleDATA()}>
          Mi mascota perdida
        </Heading>

        <Stack>
          <form action="" onSubmit={handleFORM} autoComplete="off">
            <FormControl isRequired>
              <Stack pb={8}>
                <FormLabel m={0} htmlFor="first-name">
                  Nombre de la mascota
                </FormLabel>
                <Input
                  name="petname"
                  variant="outline"
                  maxLength={100}
                  id="first-name"
                  placeholder="Ej: Pituso"
                  isRequired
                  value={petData?.petname}
                  onChange={(e) =>
                    setPetData({
                      ...petData,
                      petname: e.target.value,
                    })
                  }
                />
              </Stack>

              <Stack pb={8}>
                <FormLabel m={0} htmlFor="none">
                  Foto de la mascota
                </FormLabel>
                <DropChakra imageData={setPetPhoto} imgDB={petPhoto} />
              </Stack>

              <Stack pb={8}>
                <MapBoxR formLat={setLat} formLng={setLng} />
                <FormLabel m="0">Indica ciudad y barrio</FormLabel>
                <Input
                  type="text"
                  name="location"
                  isRequired
                  placeholder="Ej: Neuquén, Santa Genoveva"
                  maxLength={200}
                  value={petData?.location}
                  onChange={(e) =>
                    setPetData({
                      ...petData,
                      location: e.target.value,
                    })
                  }
                />
              </Stack>

              <Stack pb={8}>
                <FormLabel m={0} htmlFor="description">
                  Descripción
                </FormLabel>
                <Textarea
                  maxLength={400}
                  name="description"
                  resize="none"
                  id="description"
                  placeholder="Caniche con camiseta de Lanús, amistoso con las personas, asustadizo (...)"
                  isRequired
                  value={petData?.description}
                  onChange={(e) =>
                    setPetData({
                      ...petData,
                      description: e.target.value,
                    })
                  }
                />
              </Stack>

              {loading && (
                <Stack align="center" justify="center">
                  <Spinner size="xl" />
                </Stack>
              )}

              {!loading && (
                <Stack>
                  <Stack pb={8}>
                    <Button type="submit" bgColor={buttonGreenie}>
                      Reportar como perdido
                    </Button>
                  </Stack>

                  <Stack pb={8}>
                    <Button
                      type="button"
                      bgColor={buttonGrey}
                      onClick={() => window.history.back()}
                    >
                      Cancelar
                    </Button>
                  </Stack>
                </Stack>
              )}
            </FormControl>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NewPet;

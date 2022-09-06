import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  Spinner,
  Stack,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FindedAlert from "../components/FindedAlert";
import { editPet, getOnePet } from "../queries";
import DropChakra from "../libs/dropzone/DropChakra";
import MapBoxR from "../libs/mapbox/MapBoxR";
import { PetData } from "../Types";

const initialPet: PetData = {
  petname: "",
  description: "",
  location: "",
  lat: 0,
  lng: 0,
  petPhoto: "",
};

const EditPet = () => {
  const buttonGrey = useColorModeValue("#8b8b8b", "#636363");
  const buttonGum = useColorModeValue("#FF9DF5", "#874b80");

  const [petPhoto, setPetPhoto] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [petData, setPetData] = useState<PetData>(initialPet);

  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const { objectID } = useParams();

  useEffect(() => {
    const petData = async () => {
      const petToEdit = await getOnePet(objectID);
      console.log(petToEdit)
      if(petToEdit.message){
        console.log(petToEdit)
        setInterval(() => {
          window.location.replace(`${window.location.origin}`);
        }, 1000);
        return
      }
      setPetData(petToEdit);
      setPetPhoto(petToEdit.petPhoto);
      setLat(petToEdit.lat);
      setLng(petToEdit.lng)
      setLoading(false);
    };
    petData();
  }, []);

  const handleUpdate = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const newData = { ...petData, petPhoto, lat, lng };
    console.log(newData);

    const sendPetUpdated = await editPet(newData);
    if (sendPetUpdated.postgres && sendPetUpdated.algolia.taskID) {
      toast({
        title: "Información actualizada",
        status: "success",
        description: "Seras redireccionado al inicio...",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      setInterval(() => {
        window.location.replace(`${window.location.origin}`);
      }, 2000);
      return;
    } else {
      console.log("La mascota no pudo ser actualizada");
      toast({
        title: "No pudo ser actualizada",
        status: "error",
        description: "Intentelo mas tarde",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
  
    console.log({formLat:lat,formLng:lng})
  
  }, [lat, lng])
  

  // LLAMAR A LA DATA DEL PET DESDE LA DATABASE

  return (
    <Stack align="center">
      {loading && (
        <Stack align="center" justify="center">
          <Progress w="100vw" size="xs" isIndeterminate />
        </Stack>
      )}

      <Stack p={6} maxW="600px">
        <Heading pb={8} onClick={() => console.log({ ...petData, petPhoto,lat,lng })}>
          Editar mascota perdida
        </Heading>

        <Stack>
          <form action="" onSubmit={handleUpdate} autoComplete="off" noValidate>
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
                    <Button type="submit" bgColor={buttonGum}>
                      Actualizar información
                    </Button>
                  </Stack>

                  <Stack pb={8}>
                    <FindedAlert dataPet={petData} setLoading={setLoading}/>
                  </Stack>

                  <Stack pb={8}>
                    <Link to="/mypets">
                      <Button type="button" bgColor={buttonGrey} w="100%" onClick={() => window.history.back()}>
                        Cancelar
                      </Button>
                    </Link>
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

export default EditPet;

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../queries";

const Signup = () => {
  const buttonGum = useColorModeValue("#FF9DF5", "#874b80");
  const inputColorMode = useColorModeValue("gray.200", "gray.700");

  const [userLoged, setUserLoged] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // PONER UN BREAD SI YA EXISTE CUENTA REGISTRADA
  const toast = useToast();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    let password = e.target.password.value;
    let password2 = e.target.password2.value;

    if (password !== password2) {
      setLoading(false);
      toast({
        title: "Las contraseñas deben coincidir",
        status: "warning",
        isClosable: true,
        duration: 4000,
      });
      return;
    }
    // LAS PASSWORD COINCIDEN
    let data = {
      firstname: e.target.firstname.value,
      email: e.target.email.value,
      password,
    };

    const sendSignUp = await createUser(data);
    if (sendSignUp.message) {
      setLoading(false);
      toast({
        title: "El usuario ya se encuentra registrado",
        status: "error",
        isClosable: true,
        duration: 4000,
      });
      return
    } else {
      localStorage.removeItem("token_lostpet");
      localStorage.removeItem("user_lostpet");
      localStorage.setItem("token_lostpet", sendSignUp.token);
      localStorage.setItem("user_lostpet", sendSignUp.userAuth.userId);
      setUserLoged(true);
      setLoading(false);
      window.location.replace(`${window.location.origin}`);
    }
  };

  return (
    <Stack align="center">
      <Stack p={6} pb={0} w={["xs", "sm", "600px"]}>
        <Heading pb={8}>Registrarse</Heading>
        <Stack>
          <form action="" onSubmit={handleSubmit}>
            <FormControl isRequired>
              <Stack pb={8}>
                <FormLabel m={0} htmlFor="firstname">
                  Nombre
                </FormLabel>
                <Input
                  variant="outline"
                  maxLength={100}
                  id="firstname"
                  placeholder="Ej: Juan"
                  name="firstname"
                  type='text'
                  isRequired
                />
              </Stack>

              <Stack pb={8}>
                <FormLabel m={0} htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  variant="outline"
                  maxLength={100}
                  id="email"
                  type='email'
                  placeholder="Ej: juanperez@gmail.com"
                  isRequired
                  name="email"
                />
              </Stack>

              <Stack pb={8}>
                <FormLabel m={0} htmlFor="password">
                  Contraseña
                </FormLabel>
                <Input
                  name="password"
                  id="password"
                  isRequired
                  type="password"
                  minLength={4}
                  maxLength={16}
                />
              </Stack>

              <Stack pb={8}>
                <FormLabel m={0} htmlFor="password2">
                  Repetir contraseña
                </FormLabel>
                <Input
                  name="password2"
                  id="password2"
                  isRequired
                  type="password"
                  minLength={4}
                  maxLength={16}
                />
                <Stack w="200px" alignSelf="center">
                  {/* <Link to="">
                    <Text
                      textAlign="center"
                      opacity="0.8"
                      fontSize="14px"
                      _hover={{ color: "tomato" }}
                    >
                      Olvidé mi contraseña
                    </Text>
                  </Link> */}
                  <Link to="/login">
                    <Text
                      textAlign="center"
                      opacity="0.8"
                      fontSize="14px"
                      _hover={{ color: "tomato" }}
                    >
                      Ir a 'Iniciar Sesión'
                    </Text>
                  </Link>
                </Stack>
              </Stack>

              {loading && (
                <Stack align="center" justify="center">
                  <Spinner size="xl" />
                </Stack>
              )}

              {!loading && (
                <Stack pb={8}>
                  <Button
                    type="submit"
                    bgColor={buttonGum}
                    _hover={{ bgColor: "#b749ac" }}
                  >
                    Registrarse
                  </Button>
                </Stack>
              )}
            </FormControl>
          </form>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Signup;

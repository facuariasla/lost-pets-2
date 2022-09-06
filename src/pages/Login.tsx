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
import { loginUser } from "../queries";

const Login = () => {
  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");
  const [userLoged, setUserLoged] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleLog = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    const userTryLogin = await loginUser(data);
    const logRes = await userTryLogin;

    if (logRes.invalid) {
      toast({
        title: "El email y constraseña no coinciden",
        status: "warning",
        isClosable: true,
        duration: 5000,
      });
      setLoading(false);
      console.log(logRes.invalid);
    } else {
      // redireccionar a home
      console.log(logRes);
      localStorage.removeItem("token_lostpet");
      localStorage.removeItem("user_lostpet");
      localStorage.setItem("token_lostpet", logRes.token);
      localStorage.setItem("user_lostpet", logRes.auth.userId);
      setUserLoged(true);
      setLoading(false);
      window.location.replace(`${window.location.origin}`);
    }
  };

  return (
    <Stack align="center">
      <Stack p={6} w={["xs", "sm", "600px"]}>
        <Heading pb={8}>Ingresar</Heading>

        <Stack>
          <form action="" onSubmit={handleLog}>
            <FormControl isRequired>
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
                  type="password"
                  isRequired
                  minLength={4}
                  maxLength={16}
                />
                <Stack w="200px" alignSelf="center">
                  <Link to="/signup">
                    <Text
                      textAlign="center"
                      opacity="0.8"
                      fontSize="14px"
                      _hover={{ color: "tomato" }}
                    >
                      Registrarse
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
                    bgColor={buttonGreenie}
                    _hover={{ bgColor: "#6fad75" }}
                  >
                    Ingresar
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

export default Login;

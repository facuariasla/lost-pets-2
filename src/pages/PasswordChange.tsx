import {
  Button,
  Divider,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PassChangeAlert from "../components/PassChangeAlert";

const PasswordChange = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [dataChange, setDataChange] = useState<any>("");
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(!show);

  const handleData = () => {
    console.log(dataChange);
  };

  return (
    <Stack p={6} spacing={6} align="center">
      <Heading fontSize={22} textAlign="center" onClick={handleData}>
        Cambiar contraseña
      </Heading>
      {loading && (
        <Stack align="center" justify="center">
          <Spinner size="xl" />
        </Stack>
      )}
      <Stack w={["auto", "400px"]}>
        <form action="">
          <Stack spacing={4}>
            <Stack w="100%">
              <FormLabel m={0} htmlFor="actualpass">
                Contraseña actual
              </FormLabel>

              <InputGroup size="md">
                <Input
                  type={show ? 'text' : 'password'}
                  id="actualpass"
                  name="actualpass"
                  value={dataChange.actualPass}
                  minLength={4}
                  maxLength={16}
                  onChange={(e) =>
                    setDataChange({ ...dataChange, actualpass: e.target.value })
                  }
                />
                <InputRightElement w="20%">
                  <Button
                    borderLeftRadius={0}
                    bgColor="rgba(140, 140, 140, 0.1)"
                    h="90%"
                    w="100%"
                    onClick={handleShow}
                  >
                    {show ? "Ocultar" : "Ver"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Divider />
            </Stack>


            <Stack>
              <FormLabel m={0} htmlFor="newpass">
                Nueva contraseña
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? 'text' : 'password'}
                  name="newpass"
                  id="newpass"
                  minLength={4}
                  maxLength={16}
                  value={dataChange.actualPass}
                  onChange={(e) =>
                    setDataChange({ ...dataChange, newpass: e.target.value })
                  }
                />
                <InputRightElement w="20%">
                  <Button
                    borderLeftRadius={0}
                    bgColor="rgba(140, 140, 140, 0.1)"
                    h="90%"
                    w="100%"
                    onClick={handleShow}
                  >
                    {show ? "Ocultar" : "Ver"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>


            <Stack>
              <FormLabel m={0} htmlFor="newpass2">
                Repetir contraseña nueva
              </FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? 'text' : 'password'}
                  name="newpass2"
                  id="newpass2"
                  value={dataChange.actualPass}
                  minLength={4}
                  maxLength={16}
                  onChange={(e) =>
                    setDataChange({ ...dataChange, newpass2: e.target.value })
                  }
                />
                <InputRightElement w="20%">
                  <Button
                    borderLeftRadius={0}
                    bgColor="rgba(140, 140, 140, 0.1)"
                    h="90%"
                    w="100%"
                    onClick={handleShow}
                  >
                    {show ? "Ocultar" : "Ver"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            {loading2 && (
              <Stack align="center" justify="center">
                <Spinner size="xl" />
              </Stack>
            )}

            {!loading2 && (
              <Stack>
                <PassChangeAlert
                  dataChange={dataChange}
                  setLoading2={setLoading2}
                />
                <Button type="button" onClick={() => window.history.back()}>
                  Cancelar
                </Button>
              </Stack>
            )}
          </Stack>
        </form>
      </Stack>
    </Stack>
  );
};

export default PasswordChange;

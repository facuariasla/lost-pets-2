import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  useColorModeValue,
  useColorMode,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { RiMenu3Fill, RiMoonClearLine, RiSunLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import pawerblackicon from "../../assets/pawerlogo_black.svg";
import pawerwhiteicon from "../../assets/pawerlogo_white.svg";
import { FaGratipay } from "react-icons/fa";

const MenuBurger = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonGreenie = useColorModeValue("#6383d4", "#F09F2E");

  const [userLoged, setUserLoged] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("token_lostpet");
    if (localToken) {
      setUserLoged(true);
    } else {
      setUserLoged(false);
    }
  }, []);

  const logOut = () => {
    setInterval(() => {
      window.location.replace(`${window.location.origin}`);
    }, 1000);
    localStorage.removeItem("token_lostpet");
    localStorage.removeItem("user_lostpet");
    setUserLoged(false);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<RiMenu3Fill />}
        aria-label="Options"
        fontSize={28}
        variant="outline"
      />
      <MenuList>
        <Stack justifyItems="center">
          <Link to="/">
            <MenuItem fontWeight="500">Inicio</MenuItem>
          </Link>

          {userLoged ? (
            <Stack>
              <Link to="/profile">
                <MenuItem fontWeight="500">Mi cuenta</MenuItem>
              </Link>
              <Link to="/mypets">
                <MenuItem fontWeight="500">Mis mascotas reportadas</MenuItem>
              </Link>
              <Link to="/newpet">
                <MenuItem fontWeight="500">Nueva mascota perdida</MenuItem>
              </Link>
              {/* CERRAR SESION y REDIRECCIONAR A HOME */}
              <Link to="/">
                <MenuItem
                  fontWeight="500"
                  color="#ea5252"
                  _hover={{ color: "#ff0000" }}
                  onClick={logOut}
                >
                  Cerrar sesión
                </MenuItem>
              </Link>

              <ChakraLink href="https://pawer.cl/" target="_blank">
                <MenuList fontWeight="500" transition="all 0.3s">
                  <Stack justify="center" alignItems="center" direction="row">
                    <Text>Pawer!</Text>
                    <Image
                      boxSize="20px"
                      objectFit="cover"
                      src={
                        colorMode === "light" ? pawerblackicon : pawerwhiteicon
                      }
                    />
                  </Stack>
                </MenuList>
              </ChakraLink>
            </Stack>
          ) : (
            <Stack>
              <Link to="/login">
                <MenuItem fontWeight="500">Iniciar Sesión</MenuItem>
              </Link>
              <Link to="/signup">
                <MenuItem fontWeight="500">Registrarse</MenuItem>
              </Link>
              <ChakraLink href="https://pawer.cl/" target="_blank">
                <MenuList fontWeight="500" transition="all 0.3s">
                  <Stack justify="center" alignItems="center" direction="row">
                    <Text>Pawer!</Text>
                    <Image
                      boxSize="20px"
                      objectFit="cover"
                      src={
                        colorMode === "light" ? pawerblackicon : pawerwhiteicon
                      }
                    />
                  </Stack>
                </MenuList>
              </ChakraLink>
            </Stack>
          )}

          <Button
            onClick={toggleColorMode}
            fontSize={22}
            bgColor={buttonGreenie}
          >
            {colorMode === "light" ? <RiMoonClearLine /> : <RiSunLine />}
          </Button>
        </Stack>
      </MenuList>
    </Menu>
  );
};

export default MenuBurger;

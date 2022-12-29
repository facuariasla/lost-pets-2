import { Stack, Box, Icon, Image, useColorMode } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuBurger from "./MenuBurger";
import pawerblackicon from "../../assets/pawerlogo_black.svg";
import pawerwhiteicon from "../../assets/pawerlogo_white.svg";

MenuBurger;

const HeaderOne = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" bgColor={colorMode === "light" ? "light" : "dark"}>
      <Stack
        h="10vh"
        // bgColor="pinkie.500"
        bgColor={colorMode === "light" ? "light" : "dark"}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingX={[4, 4, 10]}
      >
        <Stack>
          <Link to="/">
            {/* <Icon as={FaPaw} h={10} w={10} cursor="pointer" /> */}
            <Image
              boxSize="60px"
              src={colorMode === "light" ? pawerblackicon : pawerwhiteicon}
              objectFit="cover"
            />
          </Link>
        </Stack>

        {/* RESPONSIVO ESTA PARTE */}
        <Box>
          <MenuBurger />
        </Box>
      </Stack>
    </Box>
  );
};

export default HeaderOne;

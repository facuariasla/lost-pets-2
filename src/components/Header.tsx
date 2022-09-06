import { Stack, Box, Icon } from "@chakra-ui/react";
import { FaPaw } from "react-icons/fa";
import { Link } from "react-router-dom";
import MenuBurger from "./MenuBurger";

MenuBurger;

const HeaderOne = () => {
  return (
    <Box as="header" bgColor="pinkie.500" >
      <Stack
        h="10vh"
        bgColor="pinkie.500"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingX={[4,4,10]}
      >
        <Stack>
          <Link to="/">
            <Icon as={FaPaw} h={10} w={10} cursor="pointer" />
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

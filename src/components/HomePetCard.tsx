import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import HomeInfo from "./HomeInfo";
import HomeReport from "./HomeReport";

const HomePetCard = ({ petData }: any) => {

  return (
    <Stack w={['250px', '280px']} h="250px" borderRadius={3} boxShadow="dark-lg">
      <Stack
        w="100%"
        h="60%"
        bgColor="#a8a8a855"
        justify="center"
        align="center"
      >
        <Image
          src={petData.petPhoto}
          w="100%"
          objectFit="contain"
          overflow="hidden"
          borderTopRadius={3}
          alt='foto de mascota'
        />
      </Stack>
      <Stack h="40%" direction="row" justify="space-between" px={4}>
        <Stack
          justify="center"
          spacing={3}
          textOverflow="ellipsis"
          overflow="hidden"
        >
          <Heading fontSize={22} color="pinkie.500" noOfLines={1} textOverflow="ellipsis">
            {petData.petname}
          </Heading>
          <Text textOverflow="ellipsis" noOfLines={1}>
            📍 {petData.location}
          </Text>
        </Stack>

        <Stack justify="center" spacing={3}>
            <HomeReport petData={petData}/>
            <HomeInfo petData={petData}/>

        </Stack>
      </Stack>

      

    </Stack>
  );
};

export default HomePetCard;

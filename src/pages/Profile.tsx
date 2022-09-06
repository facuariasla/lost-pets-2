import {
  Input,
  Stack,
  Image,
  Text,
  Heading,
  Spinner,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileEditAlert from "../components/ProfileEditAlert";
import { myProfile } from "../queries";

interface UserData {
  email: string;
  firstname: string;
  id: number;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

// CustomControlsExample()
function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  const [userAvatar, setUserAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [editing, setEditing] = useState(true)

  useEffect(() => {
    const profileInfoDB = async () => {
      setLoading(true);
      const infoDB = await myProfile();

      setUserData(infoDB);
      console.log(infoDB);
      let avatarUSER = `https://ui-avatars.com/api/?name=${infoDB.firstname}&background=FF6868&color=fff&size=150`;

      setUserAvatar(avatarUSER);
      setLoading(false);
    };
    profileInfoDB();
  }, []);


  return (
    <Stack p={6} spacing={6} align="center">
      <Heading>Mi Perfil</Heading>
      {loading && (
        <Stack align="center" justify="center">
          <Spinner size="xl" />
        </Stack>
      )}

      {userData && (
        <Stack align="center" spacing={6}>
          <Image
            boxSize="130px"
            alt="foto de perfil"
            borderRadius="full"
            src={userAvatar}
            objectFit="cover"
          />

          <form action="">
            <Stack w={["auto", "300px", "400px"]} spacing={4}>
              <Stack>
                <FormLabel  htmlFor="firstname" pb={0} m={0}>
                  Nombre
                </FormLabel>
                <Input
                  w="100%"
                  type="text"
                  id="firstname"
                  name="firstname"
                  isRequired
                  maxLength={40}
                  value={userData?.firstname}
                  variant="filled"
                  disabled={editing}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      firstname: e.target.value,
                    })
                  }
                />
              </Stack>
              <Stack>
                <FormLabel htmlFor="email" pb={0} m={0}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  isRequired
                  maxLength={40}
                  value={userData?.email}
                  variant="filled"
                  disabled={editing}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
              </Stack>
              <Stack>
                <Button onClick={()=> setEditing(!editing)}>{editing? 'Editar': 'Cancelar'}</Button>
              </Stack>
              {loading2 && (
                <Stack align="center" justify="center">
                  <Spinner size="xl" />
                </Stack>
              )}

              {!loading2 && (
                <Stack>
                  <ProfileEditAlert
                    userData={userData}
                    setLoading2={setLoading2}
                    disabled={editing}
                  />

                  <Link to='/passwordchange'>
                    <Text textAlign='center' fontWeight={500} _hover={{color: 'tomato'}} _active={{color: 'tomato'}}>Cambiar password</Text>
                  </Link>

                </Stack>
              )}

              
            </Stack>
          </form>


        </Stack>
      )}
    </Stack>
  );
}

export default Profile;

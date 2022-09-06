import { Button, Image, Input, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const DropChakra = ({ imageData, imgDB }:any) => {
  const [image, setImage] = useState<File | null>();
  const [preview, setPreview] = useState<string | null>();
  const fileInputRef = useRef<any>();
  const toast = useToast();


  // preview es el dato IMPORTANTE para subir
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        console.log(reader);
        imageData(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleInput = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image" && file.size < 4194304) {
      setImage(file);
    } else {
      setImage(null);
      toast({
        title: 'Tamaño',
        description: "La imagen debe pesar menos de 4MB",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setPreview(imgDB);
  }, [imgDB])
  


  return (
    <Stack w="100%" align='center' >
      {/* CONTAINER DROPZONE */}
      <Stack h="200px" w="300px" align="center" justify="center">
        {preview ? (
          <Image
            maxH="180px"
            src={preview}
            transition="all .3s"
            cursor="pointer"
            alt='foto de mascota'
            _hover={{ bgColor: "red", opacity: "0.4" }}
            onClick={(e) => {
              setImage(null);
              setPreview(null);
              e.preventDefault();
              fileInputRef.current.click();
            }}
          />
        ) : (
          <Button
            w="100%"
            h="100%"
            border='2px dashed gray'
            opacity='0.8'
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
          >
            Agregar foto
          </Button>
        )}

        <Input
          type="file"
          display="none"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleInput}
        />
      </Stack>
    </Stack>
  );
};

export default DropChakra;

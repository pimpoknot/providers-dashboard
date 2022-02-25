import axios from "axios";
import { useRouter } from "next/router";
import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Flex,
    CloseButton,
    Text,
    Image,
    Stack,
    Heading,
    Center,
    useColorModeValue,
    Badge
  } from "@chakra-ui/react";
import { IMAGE_PROVIDERS_URL } from "../../utils/variables";
import { ReactNode, useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { DBProviders } from "../../models/databaseModel";
import AlertDialogRemove from "../../components/AlertDialog/AlertDialogRemove";
import { ToastStatus } from "../../components/Toast";
import { InputProps, ModalForm } from "../../components/ModalForm";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import  Modal  from "react-modal";
import { cnpjMask } from "../../components/Input/cnpjMask";
import { PhoneIcon } from "@chakra-ui/icons";
import InputMask from "react-input-mask";
import { findProvider } from "../../database/FindProvider";

interface Props extends DBProviders {
  provider: DBProviders
}

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

const ProviderProfile: NextPage<Props> = ({ provider }) => {
  const router = useRouter();
  const { push } = useRouter();

  const { id } = router.query;
  const { name, phone, address, corporate, cnpj, email, segment } = provider;
  const [success, setSucesss] = useState(false);
  const [formErrorToast, setFormErrorToast] = useState(false);
  const { register, handleSubmit,watch,formState: { errors }} = useForm<InputProps>();
  const [activeLoader, setLoader] = useState(false);
  const [modalIsOpen, setModalOpen] = useState(false)
  const [valuesCNPJ, setValueCNPJ] = useState({ cnpj: '' })
  

  const deleteProvider = async () => {
    await axios
      .delete(`/api/users/${provider.id}`)
      .then(() => {
        setSucesss(true);
        setSucesss(false);
        push("/");
      })
      .catch((err) => {
        console.log(err);
        setFormErrorToast(true);
        setFormErrorToast(false);
      });
  };


  const handleFormEdit: SubmitHandler<InputProps> = async (data) => {
    setLoader(true);
     await axios.put(`/api/users/${provider.id}`, data).then(() => {
      push('/')
      setTimeout(() => {
        setLoader(false);
      }, 3000);
      setSucesss(true)
      setSucesss(false)
    }).catch(err =>{
      setFormErrorToast(true)
    }).then(() =>{
      setTimeout(() => {
        setLoader(false);
      }, 3000);
      setFormErrorToast(false)
    })
  };

  function OpenModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const inputChangeCnpj = (e: any) => {
    const { name, value } = e.target
    setValueCNPJ({
      ...valuesCNPJ,
      [name]: value
    })
  }
  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image objectFit="cover" boxSize="100%" src={IMAGE_PROVIDERS_URL} />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}
        >
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            {name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            {corporate}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            CNPJ:{cnpj}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Telefone: {phone}
          </Text>
          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            Email: {email}
          </Text>
          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #{segment}
            </Badge>
          </Stack>

          <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Link href={`/`}>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
              >
                Voltar
              </Button>
            </Link>

            <Button
              colorScheme="yellow"
              size="md"
              fontSize={"sm"}
              onClick={OpenModal}
            >
              Editar
            </Button>
            <AlertDialogRemove handleRemoveProvider={deleteProvider} />
          </Stack>
        </Stack>
      </Stack>
      {success ? (
        <ToastStatus status="success" title="Forcenedor deletado com sucesso" />
      ) : (
        ""
      )}
      {formErrorToast ? (
        <ToastStatus status="error" title="Erro ao deletar fornecedor" />
      ) : (
        ""
      )}
     <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <Text fontSize="xl" fontWeight={600} fontFamily="sans-serif" textAlign="center">Editar dados do Fornecedor</Text>
      <CloseButton position={"absolute"} right="6px" top="10px" size='lg' onClick={closeModal} />
      <form action="PUT" onSubmit={handleSubmit(handleFormEdit)}>
        <FormControl p={10} width={900} isRequired>
         <Flex>
          <FormControl width="50%" mr={5} mt={1}>
              <FormControl >
                <FormLabel htmlFor="email">Email de contato</FormLabel>
                <Input id="email" type="email" defaultValue={email} {...register("email", { required: true })}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="username"> CNPJ </FormLabel>
                <Input id="username" type="text"  
                p={5} defaultValue={cnpjMask(valuesCNPJ.cnpj)} {...register("cnpj", { required: true })} onChange={inputChangeCnpj}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="name">Nome Fantasia </FormLabel>
                <Input id="name" type="name" p={5} defaultValue={name}{...register("name", { required: true })} />
              </FormControl>
            </FormControl>
            <FormControl width="50%" ml={5} mt={1}>
              <FormControl>
                <FormLabel>Razão social</FormLabel>
                <Input id="corporate" {...register("corporate")} defaultValue={corporate}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="password">
                  Segmento
                </FormLabel>
                <InputGroup>
                  <Input
                    id="segment"
                    p={5}
                    defaultValue={segment}
                    {...register("segment", { required: true })}
                    pr="4.5rem"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="email">
                  Telefone de contato
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none"children={<PhoneIcon color="gray.300" />} mr={5}/>
                    <Input as={InputMask} mask="(**) *****-****" maskChar={null} type="phone" {...register('phone')} defaultValue={phone}/>
                </InputGroup>
              </FormControl>
            </FormControl>
         </Flex>
          
          <FormControl>
            <FormLabel mt={2}>Endereço</FormLabel>
            <Divider />
            <Input  p={5}mt={2} placeholder="Rua" {...register("address.street")} defaultValue={address.street}/>
            <Input mt={2} placeholder="Numero" {...register("address.number")} defaultValue={address.number}/>
            <Input as={InputMask} mask="*****-***" maskChar={null} mt={2} placeholder="CEP" {...register("address.cep")} defaultValue={address.cep}/>
            <Input mt={2} placeholder="Complemento"{...register("address.aditional")} defaultValue={address.aditional}/>
          </FormControl >

          <FormControl>
            <Flex align={"center"}>
              <Button
                m="0 auto"
                mt={5}
                colorScheme="teal"
                isLoading={activeLoader ? true : false}
                loadingText="Submitting"
                type="submit"
                width="250px"
                p="30px"
              >
                Editar
              </Button>
            </Flex>
          </FormControl>
         
          <FormHelperText textAlign={"center"} mt={10}>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        { success ? <ToastStatus status="success" title="Fornecedor editado com sucesso"/> : '' }
        { formErrorToast ? <ToastStatus status="error" title="Erro ao editar fornecedor"/> : '' }
      </form>
    </Modal>
    </Center>
  );
};

export default ProviderProfile;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const { id } = params as { id: string };
  const provider = await findProvider(id);

  return {
    props: {
      provider,
    },
  };
};

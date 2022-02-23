import { ReactText, useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  CloseButton,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { PhoneIcon } from "@chakra-ui/icons";
import { Address, Providers } from "@prisma/client";
import { cnpjMask } from '../Input/cnpjMask'
import { ToastStatus } from "../Toast";
import { useRouter } from "next/router";
import InputMask from "react-input-mask";

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

interface IModalForm {
  modalIsOpen: boolean;
  onRequestClose: () => void;
  closeModal: () => void;
  modalTitle: ReactText;
  defaultData?: InputProps;
}

export type InputProps = Omit<Providers, "addressId" | "id"> & {
  address: Omit<Address, "id">;
  
};


export const ModalForm = ({
  defaultData,
  modalIsOpen,
  onRequestClose,
  modalTitle,
}: IModalForm) => {
  const [input, setInput] = useState("");
  const { register, handleSubmit, reset, formState: { isSubmitSuccessful }} = useForm<InputProps>();
  const [activeLoader, setLoader] = useState(false);

  const handleInputChange = (e: any) => setInput(e.target.value);

  const { push } = useRouter();

  const isError = input === "";
  const [success, setSucesss] = useState(false)
  const [formErrorToast, setFormErrorToast] = useState(false)

  const handleFormSubmit: SubmitHandler<InputProps> = async (data) => {
    setLoader(true);
    await axios.post("/api/users/data", data).then(() => {
      push('/')
      setTimeout(() => {
        setLoader(false);
        reset()
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

  const [valuesCNPJ, setValueCNPJ] = useState({ cnpj: '' })

  const inputChangeCnpj = (e: any) => {
    const { name, value } = e.target
    setValueCNPJ({
      ...valuesCNPJ,
      [name]: value
    })
  }


  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}

    >
      <Text fontSize="xl" fontWeight={600} fontFamily="sans-serif" textAlign="center">{modalTitle}</Text>
      <CloseButton position={"absolute"} right="6px" top="10px" size='lg' onClick={onRequestClose} />
      <form action="POST" onSubmit={handleSubmit(handleFormSubmit)} >
        <FormControl p={10} width={900} isRequired>
         <Flex>
          <FormControl width="50%" mr={5} mt={1}>
              <FormControl >
                <FormLabel htmlFor="email">Email de contato</FormLabel>
                <Input id="email" type="email" defaultValue={defaultData?.email} {...register("email", { required: true })}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="username"> CNPJ </FormLabel>
                <Input id="username" type="text"  
                p={5} defaultValue={cnpjMask(valuesCNPJ.cnpj)} {...register("cnpj", { required: true })} onChange={inputChangeCnpj}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="name">Nome Fantasia </FormLabel>
                <Input id="name" type="name" p={5} defaultValue={defaultData?.name}{...register("name", { required: true })} />
              </FormControl>
            </FormControl>
            <FormControl width="50%" ml={5} mt={1}>
              <FormControl>
                <FormLabel>Razão social</FormLabel>
                <Input id="corporate" {...register("corporate")} defaultValue={defaultData?.corporate}/>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel htmlFor="password">
                  Segmento
                </FormLabel>
                <InputGroup>
                  <Input
                    id="segment"
                    p={5}
                    defaultValue={defaultData?.segment}
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
                    <Input as={InputMask} mask="(**) *****-****" maskChar={null} type="phone" placeholder="(00) 00000-0000" value={defaultData?.phone} {...register('phone')} />
                </InputGroup>
              </FormControl>
            </FormControl>
         </Flex>
          
          <FormControl>
            <FormLabel mt={2}>Endereço</FormLabel>
            <Divider />
            <Input  p={5}mt={2} placeholder="Rua" {...register("address.street")} value={defaultData?.address.street}/>
            <Input mt={2} placeholder="Numero" {...register("address.number")} value={defaultData?.address.number}/>
            <Input as={InputMask} mask="*****-***" maskChar={null} mt={2} placeholder="CEP" {...register("address.cep")} value={defaultData?.address.cep}/>
            <Input mt={2} placeholder="Complemento"{...register("address.aditional")} value={defaultData?.address.aditional}/>
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
                Criar
              </Button>
            </Flex>
          </FormControl>
         
          <FormHelperText textAlign={"center"} mt={10}>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
        { success ? <ToastStatus status="success" title="Fornecedor criado com sucesso"/> : '' }
        { formErrorToast ? <ToastStatus status="error" title="Erro ao criar fornecedor"/> : '' }
      </form>
    </Modal>
  );
};

import { Box, CloseButton, Flex, useColorModeValue,Text, BoxProps } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { IconType } from "react-icons";
import { FiHome, FiCompass, FiStar, FiSettings } from "react-icons/fi";
import ReactModal from "react-modal";
import { ModalForm } from "../../ModalForm";
import { NavItem } from "../NavItem";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";

interface LinkItemProps {
    name: string;
    icon: IconType;
  }

  interface SidebarProps extends BoxProps {
    onClose: () => void;
  }


export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {

      const [modalIsOpen, setModalOpen] = useState(false)

      const { push } = useRouter()

      function OpenModal() {
        setModalOpen(true)
      }

      function closeModal() {
        setModalOpen(false)
      }
      
      const providerListLink = () => push("/providerList")
      const homeLink = () => push("/")
  
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="md" fontFamily="sans-serif" fontWeight="bold">
            Cadastro de Fornecedores 1.0
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        <NavItem children={'Home'} icon={FiHome} onClick={homeLink}/>
        <NavItem children={'Cadastrar'} icon={IoIosAddCircleOutline} onClick={OpenModal}/>
        <NavItem children={'Lista de Fornecedores'} icon={FiCompass} onClick={providerListLink}/>
        <ModalForm
          modalTitle="Criar"
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          onRequestClose={closeModal}
        />
      </Box>
    );
  };
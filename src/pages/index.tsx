import type { NextPage } from "next";
import Head from "next/head";
import { Box, Image, Badge, SimpleGrid, Text } from "@chakra-ui/react";
import SidebarWithHeader from "../components/SideBar/SideBarWithHeader";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import { options } from "../services/http/api";
import { useEffect, useState } from "react";
import { InputProps } from "../components/ModalForm";
import Link from "next/link";
import { DBProviders } from "../models/databaseModel";
import ProviderList from "./providerList";

const Home: NextPage = () => {
  return (
    <>
        <h1>Home</h1>
    </>
  );
};

export default Home;

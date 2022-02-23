import type { NextPage } from "next";
import Head from "next/head";
import { Box, Image, Badge, SimpleGrid, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import axios from "axios";

import { useEffect, useState } from "react";
import { DBProviders } from "../models/databaseModel";
import SidebarWithHeader from "../components/SideBar/SideBarWithHeader";
import Link from "next/link";



const ProviderList: NextPage = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    axios.get("/api/users/data").then((response) => {
      setProviders(response.data);
    });
  }, []);

  console.log(providers);
  return (
      <SimpleGrid columns={4} spacing={10}>
        {providers.map(({ name, segment, id }: DBProviders, key) => {
          return (
            <Link href={`/users/${id}`}>
              <Box p={5} key={key} cursor="pointer">
                <SimpleGrid minChildWidth="220px" spacing={5}>
                  <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src="https://blog.medicalway.com.br/wp-content/uploads/2017/05/fornecedores-icone.png"
                      alt="22"
                      padding={10}
                    />
                    <Box p="6">
                      <Box display="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          New
                        </Badge>
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {/* {property.beds} beds &bull; {property.baths} baths */}
                        </Box>
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        <p>{name}</p>
                      </Box>

                      <Box>
                        <Box as="span" color="gray.600" fontSize="sm">
                          <Text fontWeight={600}>Segmento: {segment}</Text>
                        </Box>
                      </Box>

                      <Box display="flex" mt="2" alignItems="center">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              // color={
                              //   i < property.rating ? "teal.500" : "gray.300"
                              // }
                            />
                          ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                          {/* {property.reviewCount} reviews */}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </SimpleGrid>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
  );
}

export default ProviderList;
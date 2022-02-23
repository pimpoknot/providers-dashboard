import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import SidebarWithHeader from '../components/SideBar/SideBarWithHeader'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SidebarWithHeader>
        <Component {...pageProps} />
      </SidebarWithHeader>
    </ChakraProvider>
  )
}

export default MyApp

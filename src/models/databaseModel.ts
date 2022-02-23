import { Address, Providers } from "@prisma/client";


export type DBProviders = Providers & {
    address: Address
}
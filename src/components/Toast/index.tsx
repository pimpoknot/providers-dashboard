import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react"


interface IToast {
    status: "info" | "warning" | "success" | "error" | undefined;
    title: string;

}

export function ToastStatus({ status, title }: IToast) {

    const toast = useToast({
        status: status,
        isClosable: true,
        title: title,
        position: "top-left"
        
    })
    return (
     <>
        { toast() }
     </>
    )
  }
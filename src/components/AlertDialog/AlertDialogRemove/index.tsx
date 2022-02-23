import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef, useState } from "react"


interface IAlertRemove {
    handleRemoveProvider: () => void
}


export default function AlertDialogRemove(props: IAlertRemove) {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef(null)
  
    return (
      <>
        <Button colorScheme='red' onClick={() => setIsOpen(true)} fontSize={"sm"}>
          Deletar
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Deletar fornecedor
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Tem certeza que você quer deletar esse fornecedor?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme='red' onClick={props.handleRemoveProvider} ml={3}>
                  Deletar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
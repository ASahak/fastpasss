import { useRef } from 'react'

import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react'

import { POPUP_TYPES } from '@/common/constants/popup'
import { usePopup } from '@/providers/popupProvider'
import Connect from './connect'

const overlayColor = '#1717177a' // gray.800/50
function Popup() {
  const {
    popupData,
    popupSettings,
    popupTitle,
    motionPreset,
    popupType,
    isOpen,
    onCloseComplete,
    onClose
  } = usePopup()
  const isCentered = popupSettings.isCenter ?? true
  const modalRef = useRef(null)

  const renderContent = () => {
    switch (popupType) {
      case POPUP_TYPES.CONNECT_WALLET:
        return <Connect {...(popupData as any)} />
      default:
        return <div>Unknown popup type</div>
    }
  }

  return (
    <Modal
      initialFocusRef={modalRef}
      key={motionPreset}
      isCentered={isCentered}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      onCloseComplete={onCloseComplete}
      preserveScrollBarGap
      motionPreset={motionPreset as any}
      scrollBehavior="inside"
      closeOnOverlayClick={popupSettings.closeOnOverlayClick}
    >
      <ModalOverlay bg={overlayColor} backdropFilter="blur(2px)" />
      <ModalContent
        my={10}
        ref={modalRef}
        p="2.4rem"
        borderRadius="xl"
        bg="gray.800"
        border="1px solid"
        borderColor="gray.700"
        w={{
          xs: 'calc(100% - 1.6rem)',
          base: 'calc(100% - 3.9rem)',
          md: 'fit-content'
        }}
        maxW="fit-content"
        {...(popupSettings.modalContainerProps || {})}
      >
        <VStack
          spacing={popupSettings.hideCloseIcon ? '0' : '2.4rem'}
          flex={1}
          overflow="hidden"
          minH={0}
        >
          {popupTitle ? (
            <ModalHeader
              w="full"
              p={0}
              pr={!popupSettings.hideCloseIcon ? '3rem' : 0}
            >
              {typeof popupTitle === 'function' ? (
                popupTitle()
              ) : (
                <Heading variant="page-title" fontSize="2rem">
                  {popupTitle}
                </Heading>
              )}
            </ModalHeader>
          ) : null}
          {!popupSettings.hideCloseIcon && (
            <ModalCloseButton fontSize="1rem" top="2.4rem" right="2.4rem" border="1px solid" rounded="full" p={2} />
          )}
          <ModalBody
            w="full"
            p={0}
            {...popupSettings.modalBodyProps}
            overflow="hidden"
            display="grid"
          >
            {renderContent()}
          </ModalBody>
        </VStack>
      </ModalContent>
    </Modal>
  )
}

export default Popup

'use client'

import { createContext, type ReactNode, useContext, useState } from 'react'

import { type ChakraProps, useDisclosure } from '@chakra-ui/react'

import { useStateWithCallback } from '@/hooks'

export interface PopupSettingsType {
  hideCloseIcon?: boolean
  closeOnOverlayClick?: boolean
  modalBodyProps?: ChakraProps
  modalContainerProps?: ChakraProps
  mobileDrawer?: boolean
  isCenter?: boolean
  afterOnClose?: () => void
}

export interface PopupContextType {
  openPopup: (
    type: string,
    title: (() => ReactNode) | string | null,
    data?: Record<string, any>,
    popupSettings?: PopupSettingsType
  ) => void
  onCloseAsync: () => Promise<unknown>
  onClose: () => void
  onCloseComplete: () => void
  onCloseWithNoAnimation: (cb: () => void) => void
  popupData: Record<string, any>
  popupSettings: PopupSettingsType
  popupType: string
  motionPreset: string
  isOpen: boolean
  popupTitle: (() => ReactNode) | string
}

export const PopupContext = createContext<PopupContextType>({
  openPopup: () => void 0,
  onClose: () => void 0,
  onCloseComplete: () => void 0,
  onCloseWithNoAnimation: () => void 0,
  onCloseAsync: async () => void 0,
  popupData: {},
  popupSettings: {
    closeOnOverlayClick: false,
    hideCloseIcon: false,
    modalBodyProps: {},
    modalContainerProps: {},
    mobileDrawer: false,
    isCenter: true
  },
  popupType: '',
  motionPreset: 'scale',
  isOpen: false,
  popupTitle: ''
})

export const usePopup = (): PopupContextType => {
  const context = useContext(PopupContext)

  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupContext')
  }

  return context
}

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [popupType, setPopupType] = useState('')
  const [motionPreset, setMotionPreset] = useStateWithCallback('scale')
  const [popupTitle, setPopupTitle] = useState<(() => ReactNode) | string>('')
  const [popupData, setPopupData] = useState<Record<string, any>>({})
  const [popupSettings, setPopupSettings] = useState<PopupSettingsType>({})
  const [onCloseResolve, setOnCloseResolve] = useState<(() => void) | null>(
    null
  )

  const openPopup = (
    type: string,
    title: (() => ReactNode) | string | null,
    data?: Record<string, unknown>,
    popupSettings?: PopupSettingsType
  ) => {
    onOpen()
    setPopupTitle(title ?? '')
    setPopupType(type)
    if (data) {
      setPopupData(data)
    }
    if (popupSettings) {
      setPopupSettings(popupSettings)
    } else {
      setPopupSettings({})
    }
  }

  const onCloseComplete = () => {
    popupSettings.afterOnClose?.()
    setPopupType('')
    setPopupTitle('')
    setPopupData({})
    setPopupSettings({})
    setMotionPreset('scale')

    if (onCloseResolve) {
      onCloseResolve()
      setOnCloseResolve(null)
    }
  }

  const onCloseWithNoAnimation = (cb: () => void) => {
    setMotionPreset('none', () => {
      onClose()
      onCloseComplete()
      cb()
    })
  }

  const onCloseAsync = async () => {
    return new Promise<void>((resolve) => {
      setOnCloseResolve(() => resolve)
      onClose()
    })
  }

  return (
    <PopupContext.Provider
      value={{
        onCloseAsync,
        openPopup,
        onCloseComplete,
        onClose,
        onCloseWithNoAnimation,
        popupData,
        popupSettings,
        motionPreset,
        popupType,
        popupTitle,
        isOpen
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}

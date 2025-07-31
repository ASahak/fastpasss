import React, { RefObject, useState, useRef, useEffect, useMemo } from 'react';
import {
  Box, Button,
  Flex, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { useIntersection, useUpdateEffect } from 'react-use';
import { IChildren } from '@/types/global';
import { HiOutlineAdjustments } from "react-icons/hi";

type ITag = {
  label: string
  value: string
}
type IProps = {
  elements: ITag[],
  renderTag: (tagValue: string) => React.ReactNode,
  defaultActiveIndex: number,
  emitTabChange: (index: number) => void,
}
type ISmartTagProps = {
  tag: { visible: boolean, value: string },
  onVisibilityChange: (visible: boolean, value: string) => void,
  onClick: () => void,
}
const SmartTags = React.memo(
  ({
     elements,
     renderTag,
     defaultActiveIndex = 0,
     emitTabChange,
   }: IProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [mutateTags, setMutateTags] = useState(() =>
      elements.map((t) => ({ visible: false, value: t.value, label: t.label })),
    );
    const [tabIndex, setTabIndex] = useState(defaultActiveIndex);

    const onTagChange = (index: number) => {
      setTabIndex(index);
    };

    const onVisibilityChange = (fullVisible: boolean, value: string) => {
      setMutateTags((prevState) => {
        const _prevList = prevState.map((t) => ({
          ...t,
          visible: t.value === value ? fullVisible : t.visible,
        }));

        const invisibleItems = _prevList.filter((t) => !t.visible);
        if (invisibleItems.length < prevState.length) {
          return _prevList;
        }
        return prevState;
      });
    };

    const invisibleItems = useMemo(() => mutateTags.filter((t) => !t.visible), [mutateTags]);

    const hasInvisibleItems = useMemo(() => {
      return invisibleItems.length > 0 && !mutateTags.every((t) => !t.visible);
    }, [mutateTags, invisibleItems])

    const activeIsFromInvisibleList = useMemo(() => {
      return invisibleItems.some(e => e.value === elements[tabIndex].value)
    }, [tabIndex, elements, invisibleItems])

    useUpdateEffect(() => {
      emitTabChange?.(tabIndex);
    }, [tabIndex]);

    return (
      <Flex gap={4} position="relative" w="full" pr={hasInvisibleItems ? '5rem' : '0'}>
        <HStack spacing="1rem" w="full" overflow="hidden">
          {mutateTags.map((tag, index) => (
            <SmartTag
              onClick={() => onTagChange(index)}
              onVisibilityChange={onVisibilityChange}
              key={tag.value}
              tag={tag}
            >{renderTag(tag.value)}</SmartTag>
          ))}
        </HStack>
        {hasInvisibleItems ? (
          <Box position="absolute" right={0}>
            {activeIsFromInvisibleList ? <Box
              position="absolute"
              top=".4rem"
              zIndex={1}
              w="8px"
              h="8px"
              right={0}
              borderRadius="full"
              bgColor="red.400"
            /> : null}
            <Menu
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              variant="base"
              placement="bottom-end"
              autoSelect={false}
            >
              <MenuButton
                as={Button}
                variant="popover-btn"
                h="3.6rem"
                w="3.6rem"
                borderRadius="full"
                display="flex"
                p={0}
              >
                <Flex
                  as="span"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={HiOutlineAdjustments} fontSize="2rem" color="white"/>
                </Flex>
              </MenuButton>
              <Portal appendToParentPortal={false}>
                <MenuList>
                  {invisibleItems.map((opt, index) => (
                    <MenuItem
                      key={opt.value}
                      fontSize="1.4rem"
                      onClick={() => onTagChange((mutateTags.length - invisibleItems.length) + index)}
                      {...(elements[tabIndex].value === opt.value && {
                        bgColor: 'gray.600 !important',
                        color: 'gray.100 !important'
                      })}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        ) : null}
      </Flex>
    );
  },
);


const SmartTag = ({ tag, onClick, onVisibilityChange, children }: ISmartTagProps & IChildren) => {
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef as unknown as RefObject<HTMLElement>, {
    root: (intersectionRef.current as unknown as HTMLElement)?.parentNode as never,
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    if (intersection?.intersectionRatio !== undefined) {
      onVisibilityChange(intersection.intersectionRatio === 1, tag.value);
    }
  }, [intersection?.intersectionRatio]);

  return (
    <Box
      onClick={() => onClick()}
      ref={intersectionRef}
      opacity={tag.visible ? '1' : '0'}
      visibility={tag.visible ? 'visible' : 'hidden'}
      flexShrink={0}
      gap="0.5rem"
      key={tag.value}
    >
      {children}
    </Box>
  );
};

export default SmartTags;
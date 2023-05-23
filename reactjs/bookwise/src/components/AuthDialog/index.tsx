import React from 'react'
import { DialogClose, DialogContent, DialogOverlay } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { AuthButton } from '../AuthButton'

interface AuthDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AuthDialog({ open, setOpen }: AuthDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Dialog.Title>Faça login para deixar sua avaliação</Dialog.Title>
          <AuthButton icon={{ name: 'google' }} text="Entrar com Google" />
          <AuthButton icon={{ name: 'github' }} text="Entrar com Github" />
          <DialogClose>
            <X />
          </DialogClose>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

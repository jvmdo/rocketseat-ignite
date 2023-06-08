import React, { useContext } from 'react'
import { DialogClose, DialogContent, DialogOverlay } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from '@phosphor-icons/react'
import { AuthButton } from '../AuthButton'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { signIn } from 'next-auth/react'

export function AuthDialog() {
  const { dialogOpen, setDialogOpen } = useContext(MainLayoutContext)

  function handleSignInClick(provider: string) {
    signIn(provider)
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            <Dialog.Title>Faça login para deixar sua avaliação</Dialog.Title>
            <AuthButton
              icon={{ name: 'google' }}
              text="Entrar com Google"
              onClick={() => handleSignInClick('google')}
            />
            <AuthButton
              icon={{ name: 'github' }}
              text="Entrar com Github"
              onClick={() => handleSignInClick('github')}
            />
            <DialogClose>
              <X />
            </DialogClose>
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

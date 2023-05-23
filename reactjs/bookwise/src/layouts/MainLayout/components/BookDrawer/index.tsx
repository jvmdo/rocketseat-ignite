import * as Dialog from '@radix-ui/react-dialog'
import { DialogCloseButton, DialogContent, DialogOverlay } from './styles'
import { X } from '@phosphor-icons/react'
import { BookDetails } from './components/BookDetails'
import { BookReviews } from './components/BookReviews'

export function BookDrawer() {
  return (
    <div>
      <Dialog.Root defaultOpen /* open={open} onOpenChange={setOpen} */>
        <Dialog.Portal>
          <DialogOverlay />
          <DialogContent asChild>
            <article>
              <BookDetails />
              <BookReviews />
              <Dialog.Close asChild>
                <DialogCloseButton>
                  <X />
                </DialogCloseButton>
              </Dialog.Close>
            </article>
          </DialogContent>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

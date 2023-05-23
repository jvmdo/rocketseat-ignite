import * as Drawer from '@radix-ui/react-dialog'
import { DrawerCloseButton, DrawerContent, DrawerOverlay } from './styles'
import { X } from '@phosphor-icons/react'
import { BookDetails } from './components/BookDetails'
import { BookReviews } from './components/BookReviews'

interface BookDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function BookDrawer({ open, setOpen }: BookDrawerProps) {
  return (
    <div>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <DrawerOverlay />
          <DrawerContent asChild>
            <article>
              <BookDetails />
              <BookReviews />
              <DrawerCloseButton>
                <X />
              </DrawerCloseButton>
            </article>
          </DrawerContent>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}

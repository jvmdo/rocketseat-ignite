import * as Drawer from '@radix-ui/react-dialog'
import { DrawerCloseButton, DrawerContent, DrawerOverlay } from './styles'
import { X } from '@phosphor-icons/react'
import { BookDetails } from './components/BookDetails'
import { BookReviews } from './components/BookReviews'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'

export function BookDrawer() {
  const { drawerBook, setDrawerBook } = useContext(MainLayoutContext)

  const open = Boolean(drawerBook)

  function setOpen(open: boolean) {
    setDrawerBook(open ? drawerBook : undefined)
  }

  return (
    <div>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <DrawerOverlay>
            <DrawerContent asChild>
              <article>
                {drawerBook && <BookDetails {...drawerBook} />}
                <BookReviews bookId={drawerBook?.id ?? ''} />
                <DrawerCloseButton>
                  <X />
                </DrawerCloseButton>
              </article>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}

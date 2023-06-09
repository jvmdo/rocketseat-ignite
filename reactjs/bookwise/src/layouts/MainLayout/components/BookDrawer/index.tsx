import * as Drawer from '@radix-ui/react-dialog'
import { DrawerCloseButton, DrawerContent, DrawerOverlay } from './styles'
import { X } from '@phosphor-icons/react'
import { BookDetails } from './components/BookDetails'
import { BookReviews } from './components/BookReviews'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'
import useSWRMutation from 'swr/mutation'

export function BookDrawer() {
  const { drawerBook, setDrawerBook } = useContext(MainLayoutContext)
  const { data: session, status } = useSession()
  const { mutate } = useSWRConfig()

  const open = Boolean(drawerBook)
  const userId = session?.user.id
  const bookId = drawerBook?.id

  const lastReadKey = `/users/${userId}/last-read`
  const { trigger } = useSWRMutation(lastReadKey, updater)

  function setOpen(open: boolean) {
    setDrawerBook(open ? drawerBook : undefined)

    // On drawer close
    if (!open && status === 'authenticated') {
      try {
        // Update last read book
        trigger(bookId)
        // Add read tag for books in Explorer page
        mutate((key) => Array.isArray(key) && key[0] === '/books')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <DrawerOverlay>
            <DrawerContent asChild>
              <article>
                {drawerBook && <BookDetails book={drawerBook} />}
                <BookReviews bookId={drawerBook?.id ?? 'error'} />
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

async function updater(url: string, { arg: bookId }: { arg?: string }) {
  return (await api.put(url, { bookId })).data
}

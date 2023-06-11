import * as Drawer from '@radix-ui/react-dialog'
import {
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './styles'
import { X } from '@phosphor-icons/react'
import { BookDetails } from './components/BookDetails'
import { BookReviews } from './components/BookReviews'
import { useContext } from 'react'
import { MainLayoutContext } from '@/contexts/MainLayoutContext'
import { api } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import { EBook } from '@/@types/entities'

export function BookDrawer() {
  const { drawerBook, setDrawerBook } = useContext(MainLayoutContext)
  const { data: session, status } = useSession()

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
        trigger(bookId, {
          optimisticData: {
            updatedAt: new Date().toISOString(),
            book: drawerBook,
          },
        })

        // Add read tag for the opened book in Explorer page
        mutate(
          (key) => Array.isArray(key) && key[0] === '/books',
          (books) => mutator(books, drawerBook),
          {
            revalidate: false,
          },
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <DrawerOverlay>
          <DrawerContent>
            <ScrollAreaRoot>
              <ScrollAreaViewport>
                <article>
                  {drawerBook && <BookDetails book={drawerBook} />}
                  <BookReviews bookId={drawerBook?.id ?? 'error'} />
                </article>
                <DrawerCloseButton>
                  <X />
                </DrawerCloseButton>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar orientation="vertical">
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
            </ScrollAreaRoot>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

async function updater(url: string, { arg: bookId }: { arg?: string }) {
  return (await api.put(url, { bookId })).data
}

function mutator(books: EBook[] | undefined, drawerBook: EBook | undefined) {
  if (books && drawerBook) {
    const { restBooks, bookDrawerPos } = booksFilter(books, drawerBook)

    const optimisticBook: EBook = {
      ...drawerBook,
      userHasRead: true,
    }

    // Insert [optimisticBook] at position [bookDrawerPos]
    restBooks.splice(bookDrawerPos, 0, optimisticBook)

    return restBooks
  }

  return books
}

function booksFilter(books: EBook[], drawerBook: EBook) {
  let bookDrawerPos = -1

  const restBooks = books.filter((book, i) => {
    if (book.id === drawerBook.id) {
      bookDrawerPos = i
      return false
    }
    return true
  })

  return { restBooks, bookDrawerPos }
}

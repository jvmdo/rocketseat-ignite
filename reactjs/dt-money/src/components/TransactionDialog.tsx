import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import styled, { useTheme } from 'styled-components'
import { FluidText } from './FluidText'
import { StyledButton, TransactionButton } from './TransactionButton'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { breakpoint } from '../styles/global'

const StyledDialogOverlay = styled(Dialog.Overlay)`
  background-color: ${(p) => p.theme.black};
  opacity: 0.75;
  position: fixed;
  inset: 0;
`

const StyledDialogContent = styled(Dialog.Content)`
  background-color: ${(p) => p.theme['gray-800']};
  border-top-left-radius: ${(p) => p.theme['br-xl']};
  border-top-right-radius: ${(p) => p.theme['br-xl']};
  box-shadow: 0 0.25rem 2rem ${(p) => p.theme.black};
  padding-block: clamp(2rem, 1.392rem + 2.59vw, 3rem) 2.5rem;
  padding-inline: clamp(1.5rem, 0.588rem + 3.89vw, 3rem);
  position: fixed;
  inset-inline: 0;
  inset-block: auto 0;
  min-height: 58.22%;
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoint.lg}) {
    border-radius: ${(p) => p.theme.br};
    inset: unset;
    width: 33.4375rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 50%;
  }

  @media (max-width: ${breakpoint.lg}) and (orientation: landscape) {
    min-height: unset;
    height: 100dvh;
    overflow: scroll;
  }
`

const StyledDialogTitle = styled(Dialog.Title)`
  color: ${(p) => p.theme['gray-100']};
  font-weight: ${(p) => p.theme['fw-b']};
  margin-bottom: clamp(1.25rem, 0.794rem + 1.94vw, 2rem);
`

const StyledCloseButton = styled(Dialog.Close)`
  background-color: transparent;
  border: none;
  color: ${(p) => p.theme['gray-500']};
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 0;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
`

const StyledRadioGroup = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(0.5rem, 0.196rem + 1.3vw, 1rem);
`

interface StyledRadioItemProps {
  variant: 'income' | 'outcome'
}

const StyledRadioItem = styled(RadioGroup.Item)<StyledRadioItemProps>`
  background-color: ${(p) => p.theme['gray-700']};
  border: 0;
  border-radius: ${(p) => p.theme.br};
  color: ${(p) => p.theme['gray-300']};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;

  svg {
    color: ${(p) =>
      p.variant === 'income' ? p.theme['green-300'] : p.theme['red-300']};
    font-size: ${(p) => p.theme['fs-xxl']};
  }

  &[data-state='unchecked']:hover {
    background-color: ${(p) => p.theme['gray-600']};
    transition: background-color 0.2s;
  }

  &[data-state='checked'] {
    background-color: ${(p) =>
      p.variant === 'income' ? p.theme['green-500'] : p.theme['red-500']};
    color: ${(p) => p.theme.white};

    svg {
      color: ${(p) => p.theme.white};
    }
  }
`

const StyledForm = styled.form`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, min-content);
  gap: clamp(0.75rem, 0.598rem + 0.65vw, 1rem);

  input {
    background-color: ${(p) => p.theme['gray-900']};
    border: none;
    border-radius: ${(p) => p.theme.br};
    color: ${(p) => p.theme['gray-300']};
    font-size: clamp(1rem, 0.924rem + 0.32vw, 1.125rem);
    height: 3.375rem;
    padding-inline: 1rem;
  }

  input::placeholder {
    color: ${(p) => p.theme['gray-500']};
    font-size: ${(p) => p.theme.fs};
  }

  input:focus-visible {
    box-shadow: 0 0 0 2px ${(p) => p.theme['green-500']};
  }

  input:not(:placeholder-shown):invalid {
    box-shadow: 0 0 0 2px ${(p) => p.theme['red-500']};
  }

  ${StyledButton} {
    align-self: end;
    margin-top: clamp(2rem, 1.696rem + 1.3vw, 2.5rem);
  }
`

interface DialogProps {
  children: ReactNode
}

export function TransactionDialog({ children }: DialogProps) {
  const theme = useTheme()

  function handleNewTransaction() {
    console.count('New transaction registered!')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent>
          <StyledDialogTitle>
            <FluidText min={theme['fs-xl']} max={theme['fs-xxl']}>
              New transaction
            </FluidText>
          </StyledDialogTitle>
          <Dialog.Close asChild>
            <StyledCloseButton>
              <X />
            </StyledCloseButton>
          </Dialog.Close>
          <StyledForm method="dialog">
            <input
              type="text"
              name="description"
              placeholder="Description"
              required
            />
            <input
              type="tel"
              inputMode="numeric"
              name="price"
              placeholder="Price"
              pattern="^\d+(\.\d{0,2})?$"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              required
            />
            <StyledRadioGroup>
              <StyledRadioItem value="income" variant="income" required>
                <ArrowCircleUp size={24} />
                <FluidText min={theme.fs} max={theme['fs-lg']}>
                  Income
                </FluidText>
              </StyledRadioItem>
              <StyledRadioItem value="outcome" variant="outcome" required>
                <ArrowCircleDown size={24} />
                <FluidText min={theme.fs} max={theme['fs-lg']}>
                  Outcome
                </FluidText>
              </StyledRadioItem>
            </StyledRadioGroup>
            <Dialog.Close asChild>
              <TransactionButton
                height="3.625rem"
                width="100%"
                fontSizes={[theme.fs, theme['fs-lg']]}
                onClick={handleNewTransaction}
              >
                Register
              </TransactionButton>
            </Dialog.Close>
          </StyledForm>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

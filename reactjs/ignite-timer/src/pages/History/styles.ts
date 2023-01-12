import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  color: ${(props) => props.theme['gray-100']};
  padding-block: 3rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`

export const TableContainer = styled.div`
  overflow: auto;
  max-height: 50vh;

  table {
    border-collapse: collapse;
    font-size: 0.875rem;
    min-width: 32rem;
    width: 100%;

    thead {
      height: 3.5rem;

      th {
        text-align: start;
        background-color: ${(props) => props.theme['gray-600']};

        &:first-of-type {
          padding-left: 1.5rem;
          border-top-left-radius: ${(props) => props.theme['border-radius']};
        }

        &:last-of-type {
          text-align: center;
          padding-right: 1.5rem;
          border-top-right-radius: ${(props) => props.theme['border-radius']};
        }
      }
    }

    tbody {
      color: ${(props) => props.theme['gray-300']};

      td {
        height: 3.5rem;
        background-color: ${(props) => props.theme['gray-700']};
        border-top: 3px solid ${(props) => props.theme['gray-800']};
        padding-right: 0.75rem;

        &:first-of-type {
          padding-left: 1.5rem;
          width: 52%;
        }

        &:not(:first-of-type) {
          width: 16%;
        }

        &:last-of-type {
          padding-right: 1.5rem;
        }
      }
    }
  }
`

const STATUS_PROPS_MAP = Object.freeze({
  green: 'green-500',
  yellow: 'yellow-500',
  red: 'red-500',
})

interface StatusProps {
  color: keyof typeof STATUS_PROPS_MAP
}

export const StatusFlag = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  &::before {
    content: '';
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme[STATUS_PROPS_MAP[props.color]]};
    flex-shrink: 0;
  }
`

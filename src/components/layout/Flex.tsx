import styled from 'styled-components'

export type JustifyContent =
  | 'start'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'normal'
  | 'stretch'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'

interface Props {
  justifyContent?: JustifyContent
}

const FlexLayout = styled.div<Props>`
  display: flex;
  justify-content: ${(props) => props.justifyContent || 'center'};
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout

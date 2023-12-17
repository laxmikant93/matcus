import styled from 'styled-components'

export const Container = styled.div`
//  max-width: ${({ theme }) => theme.Global.container.containerMaxWidth};
  width: 80%;
  max-width: 1366px;
  margin-right: auto;
  margin-left: auto;
  padding-right: .75rem;
  padding-left: .75rem;
  @media screen and (max-width: 1440px) {
    width: 80%;
  }
  @media screen and (max-width: 1200px) {
    width: 80%;
  }
  @media screen and (max-width: 992px) {
    width: 80%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;

  }
  @media screen and (max-width: 576px) {
    width: 90%;

  }
`

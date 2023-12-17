import React from "react";
import styled from 'styled-components';

const ModalBodyWTC = styled.div`
padding: 16px 48px 16px 48px;
min-height: 75vh;
max-height: 75vh;
overflow: hidden;
overflow-y: auto;
@media screen and (max-width: 768px) {
  padding: 16px;
}
h2{
  font-weight: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.FontWeight};
  font-size: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.FontSize};
  line-height: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.LineHeight};
  font-family: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.FontFamily};
  font-style: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.FontStyle};
  letter-spacing: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.Alignment};
  color: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h2.Color};
  }
  h3{
    font-weight: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.FontWeight};
    font-size: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.FontSize};
    line-height: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.LineHeight};
    font-style: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.FontStyle};
    font-family: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.LetterSpacing};
    text-align: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.Alignment};
    color: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.Color};
    }
  p{
    
    font-weight: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.FontWeight};
    font-size: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.FontSize};
    line-height: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.LineHeight};
    font-style: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.FontStyle};
    font-family: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.FontFamily};
    letter-spacing: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.LetterSpacing};
    text-align: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.Alignment};
    color: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.p.Color};
    }
`;
const ModalBody = ({ children, className }) => {
  return <ModalBodyWTC className={className}>{children}</ModalBodyWTC>;
};

export default ModalBody;

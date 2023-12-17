import { bool, string } from "prop-types";
import React from "react";
import styled from "styled-components";

const ModalHeadWtc = styled.div`
padding: 32px 48px 16px 48px;
min-height: 10vh;
max-height: 15vh;
@media screen and (max-width: 768px) {
  padding: 16px;
}
h2{
  font-weight: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.FontWeight};
  font-size: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.FontSize};
  line-height: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.LineHeight};
  font-family: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.FontFamily};
  font-style: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.FontStyle};
  letter-spacing: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.LetterSpacing};
  text-align: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.Alignment};
  color: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h2.Color};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  display: -webkit-box;
  }
  h3{
    
    font-weight: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h3.FontWeight};
    font-size: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h3.FontSize};
    line-height: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h3.LineHeight};
    font-style: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.FontStyle};
    font-family: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.FontFamily};
    letter-spacing: ${({ theme }) => theme.Global.Modal.ModalBodyWTC.h3.LetterSpacing};
    text-align: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h3.Alignment};
    color: ${({ theme }) => theme.Global.Modal.ModalHeadWtc.h3.Color};
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    }
`;
const ModalHeader = ({
  title,
  subtitle,
  children,
  className,
  closeButton,
  onclose,
  TitleClass,
  SubTitleClass,
}) => {
  window.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
      onclose();
    }
  });
  return (
    <ModalHeadWtc className={` ${className}`}>
      {title && <h2 className={TitleClass} title={title}>{title}</h2>}
      {subtitle && <h3 className={SubTitleClass} title={subtitle}>{subtitle}</h3>}
      {children}
    </ModalHeadWtc>
  );
};

ModalHeader.defaultProps = {
  title: undefined,
  subtitle: undefined,
  closeButton: false,
};

ModalHeader.propTypes = {
  title: string,
  subtitle: string,
  closeButton: bool,
};

export default ModalHeader;

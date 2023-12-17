import { useState, useEffect, useRef } from "react";
import { useOutsideClick } from "rooks";

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 * @param {boolean} initialState
 */
export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  const ref=useRef()
  
  useOutsideClick(el?el:ref, () => {
    setIsActive(false)
  });
  return [isActive, setIsActive];
};

// import React, { useState, useRef } from 'react'
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';


// const MenuScroll = ({ MouseLeave, refDrop, shopDropdown, hoverId, children, id }) => {
//   const dropRef = useRef()
//   const [scrollX, setscrollX] = useState(0);
//   const [scrollEnd, setScrollEnd] = useState(false);



//   const scroll = (scrollOffset) => {
//     dropRef.current.scrollLeft += scrollOffset;
//     setscrollX(scrollX + scrollOffset);

//     // for checking if the scoll has end
//     if (
//       Math.floor(dropRef.current.scrollWidth - dropRef.current.scrollLeft) <=
//       dropRef.current.offsetWidth
//     ) {
//       setScrollEnd(true);
//     } else {
//       setScrollEnd(false)
//     }
//   };
//   const scrollCheck = () => {
//     // for checking scroll width
//     setscrollX(dropRef.current.scrollLeft);
//     if (
//       Math.floor(dropRef.current.scrollWidth - dropRef.current.scrollLeft) <=
//       dropRef.current.offsetWidth
//     ) {
//       setScrollEnd(true);
//     } else {
//       setScrollEnd(false);
//     }
//   };
//   // useEffect(() => {
//   //   //Check width of the scollings
//   //   if (
//   //     dropRef.current &&
//   //     dropRef?.current?.scrollWidth === dropRef?.current?.offsetWidth
//   //   ) {
//   //     setScrollEnd(true);
//   //   } else {
//   //     setScrollEnd(false);
//   //   }
//   //   return () => { };
//   // }, [dropRef?.current?.scrollWidth, dropRef?.current?.offsetWidth]);


//   return (
//     <React.Fragment>
//       <div style={{ "width": "600px" }}>
//         <div className="tab-header">
//           {scrollX !== 0 && (
//             <button className="arrow" onClick={() => scroll(-200)}><i className={`arrow-left`}>&#10094;</i></button>
//           )}
//           <ul className="drop-head" ref={dropRef} onScroll={scrollCheck}>
//             {children}
//           </ul>
//           {
//             !scrollEnd && (
//               <button className="arrow Posi-right" onClick={() => scroll(200)}><i className="arrow-right">&#10095;</i></button>
//             )
//           }
//         </div>
//       </div>
//     </React.Fragment >
//   )
// }

// export default MenuScroll
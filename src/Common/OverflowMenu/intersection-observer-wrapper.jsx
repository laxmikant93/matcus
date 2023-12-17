import React, { useRef, useEffect, useState } from "react";
import classnames from "classnames";
// import { makeStyles } from "@material-ui/core/styles";
import OverflowMenu from "./OverflowMenu";
import Styles from "./style.module.scss";
import DropdownButton from "../Dropdown/DropdownButton";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function IntersectionObserverWrap({ children, LongMenuWrapProp }) {
  // const classes = useIntersectionStyles();
  const navRef = useRef(null);
  const { dynamicHeaderData } = useSelector((state) => state.websiteTemplate.getTemplate.data)
  const [visibilityMap, setVisibilityMap] = useState({});
  const handleIntersection = (entries) => {
    const updatedEntries = {};
    console.log(entries,"jijijiji")
    entries.forEach((entry) => {
      const targetid = entry.target.dataset.targetid;
      console.log(entry, targetid);
      if (entry.isIntersecting) {
        updatedEntries[targetid] = true;
      } else {
        updatedEntries[targetid] = false;
      }
    });

    setVisibilityMap((prev) => ({
      ...updatedEntries
    }));
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 0.7
    });

    // We are addting observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute observerid on the child elemeent
    Array.from(navRef.current.children).forEach((item) => {
      if (item.dataset.targetid) {
        observer.observe(item);
      }
    });
    return () => observer.disconnect();
  }, [children]);

  // const shouldShowMenu = useMemo(
  //   () => Object.values(visibilityMap).some((v) => v === false),
  //   [visibilityMap]
  // );
  // const [show,hide]=useState(false)
  // useEffect(()=>{
  
  //   if (!shouldShowMenu) {
  //     hide(true)
  //   }
  // },[])
  
  const [show,hide]=useState(false)
  console.log(visibilityMap,"hihiihhihihi")
  useMemo(()=>{
    if(Object.values(visibilityMap).some((v) => v === false)){
      hide(true)
    }else{
      hide(false)
    }
  },[visibilityMap])



  return (
    <div className={Styles.ToolbarWrapper}>
      <div className={Styles.ToolbarWrapperInner} ref={navRef}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            className: classnames(child.props.className, {
              [Styles.Visible]: !!visibilityMap[child.props["data-targetid"]],
              [Styles.InVisible]: !visibilityMap[child.props["data-targetid"]]
            })
          });
        })}

</div>
  {show && <div className={Styles.OverflowStyle}><DropdownButton

// onClick={handleDropdown}
Title="OverFlowMenuDropdown"
>
More<i>&nbsp;</i>+
</DropdownButton>
</div> 
}
     
        
      {show && <OverflowMenu
        visibilityMap={visibilityMap}
        className={Styles.OverflowStyle}
        classNameInner={Styles.OverflowStyleInner}
        LongMenuWrapProp={LongMenuWrapProp}
      >
        {children}
      </OverflowMenu>}
    </div>
  );
}

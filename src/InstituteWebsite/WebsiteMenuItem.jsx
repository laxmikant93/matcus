import { forwardRef } from "react";
import { any, bool, func, string } from "prop-types";
import { NavLink } from "react-router-dom";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";

const WebsiteMenuItem = forwardRef(
  ({ icon, id, title, link, active, eventId, onSelect, titlekey }, ref) => {
    return (
      <DynamicHeaderConsumer>
        {
          (value) => <li id={id} ref={ref} >
            {link ? <NavLink to={link}>{value[titlekey] || title}</NavLink> : title}
          </li>}
      </DynamicHeaderConsumer>
    );
  }
);

WebsiteMenuItem.defaultProps = {
  icon: undefined,
  id: undefined,
  title: "Untitled",
  active: false,
  eventId: Math.random(),
  link: undefined,
  titlekey: undefined,
  onSelect: () => { },
};
WebsiteMenuItem.propTypes = {
  icon: string,
  id: string,
  title: string.isRequired,
  active: bool,
  eventId: any,
  link: string,
  titlekey: string,
  onSelect: func,
};

export default WebsiteMenuItem;

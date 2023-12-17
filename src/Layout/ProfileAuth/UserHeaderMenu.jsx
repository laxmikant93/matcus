import React, { useState, useEffect } from "react";
import AppLink from "../../Common/AppLink";
import UserMenuHoc from "../../Hoc/UserMenuHoc";
import { Fullname } from "../../Common/UserElement";
import CurrentRole from "../../Common/CurrentRole";
import NonLoginHeaderMenuHoc from "../../Hoc/NonLoginHeaderMenuHoc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getUserRole,
  applyNewRole,
  updateUserActiveRole,
} from "../../store/actions/userRole";
import AppLinkUrl from "../../Common/AppLink/AppLinkUrl";
import Auth from "../../Classes/Auth";
import ImageViewer from "../../Common/ImageViewer";

export function UserHeaderMenuItem({ children, title, url, className }) {
  function getDashboardLink() {
    if (title === "Manage Profile") {
      return title === "Manage Profile" && AppLinkUrl.privateDomain()
        ? url
        : AppLinkUrl.mainBaseUrl(`${url}`);
    } else if (title === "Account Setting") {
      return title === "Account Setting" && AppLinkUrl.privateDomain()
        ? url
        : AppLinkUrl.mainBaseUrl(`${url}`);
    } else if (title === "Edneed Reviews") {
      return title === "Edneed Reviews" && AppLinkUrl.privateDomain()
        ? url
        : AppLinkUrl.mainBaseUrl(`${url}`);
    } else if (title === "Manage Website") {
      return title === "Manage Website" && AppLinkUrl.privateDomain()
        ? url
        : AppLinkUrl.mainBaseUrl(`${url}`);
    } else if (title === "My Bookings") {
      return title === "My Bookings" && (AppLinkUrl.privateDomain() || AppLinkUrl.subdomain())
        ? url
        : AppLinkUrl.mainBaseUrl(`${url}`);
    } else {
      return title === "Dashboard" && AppLinkUrl.privateDomain()
        ? `${url}dashboard`
        : AppLinkUrl.subdomain()
          ? AppLinkUrl.mainBaseUrl("/")
          : url;
    }
  }

  return children ? (
    children
  ) : (
    <li>
      <a className={className} href={getDashboardLink()}>
        {title}
      </a>
    </li>
  );
}

export function UserRole() {
  const history = useNavigate();

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      setPrivateDomainLogin(true);
    }
  }, []);
  const [privateDomainLogin, setPrivateDomainLogin] = useState(false);
  const { user_institute, user_activeRole } = useSelector(
    (state) => state.user
  );
  const userRole = useSelector((state) => state.userRole.data.arrayData);
  const users = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const switchRole = (selectedRole) => {
    dispatch(applyNewRole(selectedRole));
    // dispatch(setDefaultUserRole(selectedRole))
    dispatch(updateUserActiveRole(selectedRole));
  };
  useEffect(() => {
    dispatch(getUserRole(users._id, users.user_business_type));
    document.addEventListener("RoleChanged", () => {
      if (AppLinkUrl.privateDomain()) {
        window.location.href = `${AppLinkUrl.baseUrl()}dashboard`
      } else {
        history("/dashboard");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history]);



  if (userRole && !userRole.length) {
    return null;
  }

  return (
    <>
      <ul className="ManageAccountRoleListCst">
        <li className="m-roleHead">
          <p className="text-xxs base uppercase">Institute & Roles</p>
        </li>
        {userRole &&
          userRole.length > 0 ?
          userRole.map((data, index) => {
            return (
              <React.Fragment key={index}>
                {user_institute === data.institute && privateDomainLogin ? (
                  <li
                    key={`role_${data.type}_${index}`}
                    id={`role_${data.type}_${index}`}
                    onClick={() => switchRole(data)}
                    className={

                      user_activeRole === data.role &&
                        user_institute === data.institute
                        ? "active"
                        : ""
                    }
                  >
                    <p className="RoleNameCst text-xs w-500">
                      {data.institute_name}
                    </p>
                    <div className="RoleCustomizationCst">
                      <button className="btnText text-xxs">
                        {data.type}
                      </button>
                      <button
                        className="btnText text-xxs"
                        onClick={() => switchRole(data)}
                      >
                        {user_activeRole === data.role &&
                          user_institute === data.institute
                          ? "Active"
                          : "Set as Default"}
                      </button>
                    </div>
                  </li>
                ) : (
                  <li
                    key={`role_${data.type}_${index}`}
                    id={`role_${data.type}_${index}`}
                    onClick={() => switchRole(data)}
                    className={
                      user_activeRole === data.role &&
                        user_institute === data.institute
                        ? "active"
                        : ""
                    }
                  >
                    <p className="RoleNameCst text-refd w-500">
                      {data.institute_name}
                    </p>
                    <div className="RoleCustomizationCst">
                      <button className="btnText text-xxs">
                        {data.type}
                      </button>
                      <button
                        className="btnText text-xxs"
                        onClick={() => switchRole(data)}
                      >
                        {user_activeRole === data.role &&
                          user_institute === data.institute
                          ? "Active"
                          : "Set as Default"}
                      </button>
                    </div>
                  </li>
                )}
              </React.Fragment>
            );
          }) :
          <li className="m">
            <p className="text-xxs">Loading...</p>
          </li>
        }
      </ul>
    </>
  );
}

const UserHeaderMenu = () => {

  const userDropdownMenu = (usertype, user, subdomainuser, usertypeSubdomain) => {
    let usertypeCheck = "";
    let userData = {}
    if (Auth.isSubdomainLogin()) {
      usertypeCheck = usertypeSubdomain
      userData = subdomainuser
    }
    else {
      usertypeCheck = usertype
      userData = user
    }

    switch (usertypeCheck) {
      case process.env.REACT_APP_TEACHER:
        return (
          <NonLoginHeaderMenuHoc>
            <TeacherMenuOption user={userData} />
          </NonLoginHeaderMenuHoc>
        );

      case process.env.REACT_APP_STUDENT:
        return (
          <NonLoginHeaderMenuHoc>
            <StudentMenuOptions user={userData} />
          </NonLoginHeaderMenuHoc>
        );

      case process.env.REACT_APP_PAGE_OWNER:
        return (
          <NonLoginHeaderMenuHoc>
            <OwnerMenuOptions user={userData} />
          </NonLoginHeaderMenuHoc>
        );
      case process.env.REACT_APP_EMPLOYEE:
        return (
          <NonLoginHeaderMenuHoc>
            <EmployeeMenuOptions user={userData} />
          </NonLoginHeaderMenuHoc>
        );

      case process.env.REACT_APP_ECOMMERCE_CUSTOMER:
        return (
          <NonLoginHeaderMenuHoc>
            <CustomerEcommerceMenuOptions user={userData} />
          </NonLoginHeaderMenuHoc>
        );
      case process.env.REACT_APP_SERVICE_CUSTOMER:
        return (
          <NonLoginHeaderMenuHoc>
            <CustomerServicesMenuOptions user={userData} />
          </NonLoginHeaderMenuHoc>
        );

      default:
        return (
          <NonLoginHeaderMenuHoc>
            <DefaultMenuOptions user={userData} />
          </NonLoginHeaderMenuHoc>
        );
    }
  };

  return (
    <UserMenuHoc>

      {({ usertype, user, subdomainuser, usertypeSubdomain }) => userDropdownMenu(usertype, user, subdomainuser, usertypeSubdomain)}
    </UserMenuHoc>
  );
};

export default UserHeaderMenu;

export function LogoutOption() {
  return (
    <li>
      <NavLink to="/auth/logout" className="navLogoutCustom">
        Logout
      </NavLink>
    </li>
  );
}

export function TeacherMenuOption({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(words) {
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  return (
    <React.Fragment>
      <NavUserNameAndRole />
      <div className="profileNav">
        <div className="profileNavCst">
          {user.user_profile_picture === null ||
            user.user_profile_picture === undefined ||
            user.user_profile_picture === "" ? (
            <React.Fragment>
              {user.user_fullname.substring(0, 1)}
              {getLastWord(user.user_fullname)}
            </React.Fragment>
          ) : (
           <ImageViewer src={user && user.user_profile_picture} />
          )}
        </div>
        <div className="profileNavDropdownWrapper">
          <div className="profileNavDropdownCustom teacher">
            <div className="profileNavDropdownHead">
              <div className="profileNameCst">
                <p className="gray">
                  {" "}
                  Hello,
                  <span className="profileUserName w-600">
                    {getFirstWord(user.user_fullname)}
                  </span>
                </p>
              </div>
              <div className="roleHead">
                <p className="text-xxs base uppercase">Institute & Roles</p>
              </div>
            </div>
            <ul className="ManageAccountListCst">
              {/* <UserHeaderMenuItem>
                <li className="profileNameHead">
                  <p className="gray">
                    Hello,
                    <span className="profileUserName w-600">
                      <Fullname />
                    </span>
                  </p>
                </li>
              </UserHeaderMenuItem> */}

              {/* <UserHeaderMenuItem
                className="base"
                title="Manage Website"
                url="/"
              /> */}
              <UserHeaderMenuItem className="base" title="Dashboard" url="/" />
              <UserHeaderMenuItem
                className="base"
                title="Manage Profile"
                url={`/profile/${user.user_username}`}
              />
              <UserHeaderMenuItem
                className="base"
                title="Account Setting"
                url="/account-setting"
              />
              {/* <CurrentRole /> */}
              <LogoutOption />
            </ul>

            <UserRole />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export function StudentMenuOptions({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(words) {
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  return (
    <React.Fragment>
      <NavUserNameAndRole />
      <div className="profileNav">
        <div className="profileNavCst">
          {user.user_profile_picture === null ||
            user.user_profile_picture === undefined ||
            user.user_profile_picture === "" ? (
            <React.Fragment>
              {user.user_fullname.substring(0, 1)}
              {getLastWord(user.user_fullname)}{" "}
            </React.Fragment>
          ) : (
            <ImageViewer src={user && user.user_profile_picture} />
          )}
        </div>
        <div className="profileNavDropdownWrapper">
          <div className="profileNavDropdownCustom student">
            <div className="profileNavDropdownHead">
              <div className="profileNameCst">
                <p className="gray">
                  {" "}
                  Hello,
                  <span className="profileUserName w-600">
                    {getFirstWord(user.user_fullname)}
                  </span>
                </p>
              </div>
              <div className="roleHead">
                <p className="text-xxs base uppercase">Institute & Roles</p>
              </div>
            </div>
            <ul className="ManageAccountListCst">
              {/* <UserHeaderMenuItem>
                <li className="profileNameHead">
                  <p className="gray">
                    Hello,
                    <span className="profileUserName w-600">
                      <Fullname />
                    </span>
                  </p>
                </li>
              </UserHeaderMenuItem> */}

              {/* <UserHeaderMenuItem
                className="base"
                title="Manage Website"
                url="/website-manage"
              /> */}

              <UserHeaderMenuItem className="base" title="Dashboard" url="/" />
              <UserHeaderMenuItem
                className="base"
                title="Manage Profile"
                url={`/profile/${user.user_username}`}
              />
              <UserHeaderMenuItem
                className="base"
                title="Account Setting"
                url="/account-setting"
              />
              {/* <CurrentRole /> */}
              <LogoutOption />
            </ul>

            <UserRole />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export function OwnerMenuOptions({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(words) {
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  return (
    <React.Fragment>
      <NavUserNameAndRole />
      <div className="profileNav">
        <div className="profileNavCst">
          {user.user_profile_picture === null ||
            user.user_profile_picture === undefined ||
            user.user_profile_picture === "" ? (
            <React.Fragment>
              {user.user_fullname.substring(0, 1)}
              {getLastWord(user.user_fullname)}{" "}
            </React.Fragment>
          ) : (
           <ImageViewer src={user && user.user_profile_picture} />
          )}
        </div>
        <div className="profileNavDropdownWrapper">
          <div className="profileNavDropdownCustom insAdmin">
            <div className="profileNavDropdownHead">
              <div className="profileNameCst">
                <p className="gray">
                  {" "}
                  Hello,
                  <span className="profileUserName w-600">
                    {getFirstWord(user.user_fullname)}
                  </span>
                </p>
              </div>
              <div className="roleHead">
                <p className="text-xxs base uppercase">Institute & Roles</p>
              </div>
            </div>
            <ul className="ManageAccountListCst">
              <UserHeaderMenuItem className="base" title="Dashboard" url="/" />
              {/* <UserHeaderMenuItem
                className="base"
                title="Manage Website"
                url="/website-manage"
              /> */}
              <UserHeaderMenuItem
                className="base"
                title="Manage Profile"
                url={`/profile/${user.user_username}`}
              />
              <UserHeaderMenuItem
                className="base"
                title="Account Setting"
                url="/account-setting"
              />
             
              {/* <CurrentRole /> */}
              <LogoutOption />
            </ul>

            <UserRole />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export function EmployeeMenuOptions({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(words) {
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  return (
    <React.Fragment>
      <NavUserNameAndRole />
      <div className="profileNav">
        <div className="profileNavCst">
          {user.user_profile_picture === null ||
            user.user_profile_picture === undefined ||
            user.user_profile_picture === "" ? (
            <React.Fragment>
              {user.user_fullname.substring(0, 1)}
              {getLastWord(user.user_fullname)}{" "}
            </React.Fragment>
          ) : (
             <ImageViewer src={user && user.user_profile_picture} />
          )}
        </div>
        <div className="profileNavDropdownWrapper">
          <div className="profileNavDropdownCustom insAdmin">
            <div className="profileNavDropdownHead">
              <div className="profileNameCst">
                <p className="gray">
                  {" "}
                  Hello,
                  <span className="profileUserName w-600">
                    {getFirstWord(user.user_fullname)}
                  </span>
                </p>
              </div>
              <div className="roleHead">
                <p className="text-xxs base uppercase">Institute & Roles</p>
              </div>
            </div>
            <ul className="ManageAccountListCst">
              <UserHeaderMenuItem className="base" title="Dashboard" url="/" />
              {/* <UserHeaderMenuItem
                className="base"
                title="Manage Website"
                url="/website-manage"
              /> */}
              <UserHeaderMenuItem
                className="base"
                title="Manage Profile"
                url={`/profile/${user.user_username}`}
              />
              <UserHeaderMenuItem
                className="base"
                title="Account Setting"
                url="/account-setting"
              />
              {/* <CurrentRole /> */}
              <LogoutOption />
            </ul>

            <UserRole />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export function CustomerEcommerceMenuOptions({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(words) {
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  const fullName = user && user.user_fullname ? user.user_fullname : "";
  return (
    <div className="profileNav">
      <div className="profileNavCst">
        {
          /* user.user_profile_picture === null || user.user_profile_picture ===
      undefined || user.user_profile_picture === "" ? (  */
          user && !user.user_profile_picture ? (
            <React.Fragment>
              {fullName.substring(0, 1)}
              {getLastWord(fullName)}
            </React.Fragment>
          ) : (
            <ImageViewer src={user && user.user_profile_picture} />
          )
        }
      </div>
      <div className="profileNavDropdownWrapper">
        <div className="profileNavDropdownCustom otherRole">
          <div className="profileNavDropdownHead">
            <div className="profileNameCst">
              <p className="gray">
                {" "}
                Hello,
                <span className="profileUserName w-600">
                  {getFirstWord(user.user_fullname)}
                </span>
              </p>
            </div>
            {/* <div className="roleHead">
              <p className="text-xxs base uppercase">Institute & Roles</p>
            </div> */}
          </div>
          <ul className="ManageAccountListCst">
            {/* <UserHeaderMenuItem>
              <li className="profileNameHead">
                <p className="gray">
                  Hello,
                  <span className="profileUserName w-600">
                    <Fullname />
                  </span>
                </p>
              </li>
            </UserHeaderMenuItem> */}

            {/* <UserHeaderMenuItem
              className="base"
              title="Manage Website"
              url="/"
            /> */}
            {/* <UserHeaderMenuItem className="base" title="Dashboard" url="/" /> */}

            {/* {user.user_business_type === "LMS" && <UserHeaderMenuItem
              className="base"
              title="Manage Profile"
              url={`/profile/${user.user_username}`}
            />}
            <UserHeaderMenuItem
              className="base"
              title="Account Setting"
              url="/account-setting"
            />
            <UserHeaderMenuItem
              className="base"
              title="Edneed Reviews"
              url="/edneed-review-list"
            /> */}

            {/* <CurrentRole /> */}
            <LogoutOption />
          </ul>

          {/* <UserRole /> */}
        </div>
      </div>
    </div>
  );
}
export function CustomerServicesMenuOptions({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(wordCheck) {
    let words = wordCheck.toString()
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(wordCheck) {
    let words = wordCheck.toString()
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  const fullName = user && user.user_fullname ? user.user_fullname : "";
  return (
    <div className="profileNav">
      <div className="profileNavCst">
        {user && !user.user_profile_picture ? (
          <React.Fragment>
            {fullName.toString().substring(0, 1)}
            {getLastWord(fullName)}
          </React.Fragment>
        ) : (
           <ImageViewer src={user && user.user_profile_picture} />
        )
        }
      </div>
      <div className="profileNavDropdownWrapper">
        <div className="profileNavDropdownCustom otherRole">
          <div className="profileNavDropdownHead">
            <div className="profileNameCst">
              <p className="gray">
                {" "}
                Hello,
                <span className="profileUserName w-600">
                  {getFirstWord(user.user_fullname)}
                  {/* {user.user_fullname} */}
                </span>
              </p>
            </div>
            {/* <div className="roleHead">
              <p className="text-xxs base uppercase">Institute & Roles</p>
            </div> */}
          </div>
          <ul className="ManageAccountListCst">
            {/* <UserHeaderMenuItem>
              <li className="profileNameHead">
                <p className="gray">
                  Hello,
                  <span className="profileUserName w-600">
                    <Fullname />
                  </span>
                </p>
              </li>
            </UserHeaderMenuItem> */}

            {/* <UserHeaderMenuItem
              className="base"
              title="Manage Website"
              url="/"
            /> */}
            {/* <UserHeaderMenuItem className="base" title="Dashboard" url="/" /> */}

            {/* {user.user_business_type === "LMS" && <UserHeaderMenuItem
              className="base"
              title="Manage Profile"
              url={`/profile/${user.user_username}`}
            />}
            <UserHeaderMenuItem
              className="base"
              title="Account Setting"
              url="/account-setting"
            />
            <UserHeaderMenuItem
              className="base"
              title="Edneed Reviews"
              url="/edneed-review-list"
            /> */}
            <UserHeaderMenuItem
              className="base"
              title="My Bookings"
              url="/my-booking"
            />
            {/* <NavLink
              className="base"
              title="My Bookings"
              to="/my-booking"
            /> */}
            {/* <CurrentRole /> */}
            <LogoutOption />
          </ul>

          {/* <UserRole /> */}
        </div>
      </div>
    </div>
  );
}

// export function CustomerEcommerceMenuOptions({ user }) {
//   //* Get last word from Institute Name */
//   function getLastWord(words) {
//     var lastLetter = words.split(" ");
//     return lastLetter[lastLetter.length - 1][0];
//   }
//   function getFirstWord(words) {
//     let firstLetter = words && words.split(" ");
//     return firstLetter && firstLetter.length && firstLetter[0];
//   }
//   return (
//     <React.Fragment>
//       <NavUserNameAndRole />
//       <div className="profileNav">
//         <div className="profileNavCst">
//           {user.user_profile_picture === null ||
//             user.user_profile_picture === undefined ||
//             user.user_profile_picture === "" ? (
//             <React.Fragment>
//               {user.user_fullname.substring(0, 1)}
//               {getLastWord(user.user_fullname)}{" "}
//             </React.Fragment>
//           ) : (
//             <img src={user.user_profile_picture} alt="user profile" />
//           )}
//         </div>
//         <div className="profileNavDropdownWrapper">
//           <div className="profileNavDropdownCustom insAdmin">
//             <div className="profileNavDropdownHead">
//               <div className="profileNameCst">
//                 <p className="gray">
//                   {" "}
//                   Hello,
//                   <span className="profileUserName w-600">
//                     {getFirstWord(user.user_fullname)}
//                   </span>
//                 </p>
//               </div>
//               <div className="roleHead">
//                 <p className="text-xxs base uppercase">Institute & Roles</p>
//               </div>
//             </div>
//             <ul className="ManageAccountListCst">
//               <UserHeaderMenuItem className="base" title="Dashboard" url="/" />
//               {/* <UserHeaderMenuItem
//                 className="base"
//                 title="Manage Website"
//                 url="/website-manage"
//               /> */}
//               <UserHeaderMenuItem
//                 className="base"
//                 title="Manage Profile"
//                 url={`/profile/${user.user_username}`}
//               />
//               <UserHeaderMenuItem
//                 className="base"
//                 title="Account Setting"
//                 url="/account-setting"
//               />
//               <UserHeaderMenuItem
//                 className="base"
//                 title="Edneed Reviews"
//                 url="/edneed-review-list"
//               />

//               {/* <CurrentRole /> */}
//               <LogoutOption />
//             </ul>

//             <UserRole />
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }
// export function CustomerServicesMenuOptions({ user }) {
//   //* Get last word from Institute Name */
//   function getLastWord(words) {
//     var lastLetter = words.split(" ");
//     return lastLetter[lastLetter.length - 1][0];
//   }
//   function getFirstWord(words) {
//     let firstLetter = words && words.split(" ");
//     return firstLetter && firstLetter.length && firstLetter[0];
//   }
//   return (
//     <React.Fragment>
//       <NavUserNameAndRole />
//       <div className="profileNav">
//         <div className="profileNavCst">
//           {user.user_profile_picture === null ||
//             user.user_profile_picture === undefined ||
//             user.user_profile_picture === "" ? (
//             <React.Fragment>
//               {user.user_fullname}
//               {/* {getLastWord(user.user_fullname)}{" "} */}
//             </React.Fragment>
//           ) : (
//             <img src={user.user_profile_picture} alt="user profile" />
//           )}
//         </div>
//         <div className="profileNavDropdownWrapper">
//           <div className="profileNavDropdownCustom insAdmin">
//             <div className="profileNavDropdownHead">
//               <div className="profileNameCst">
//                 <p className="gray">
//                   {" "}
//                   Hello,
//                   <span className="profileUserName w-600">
//                     {user.user_fullname}
//                   </span>
//                 </p>
//               </div>
//               <div className="roleHead">
//                 <p className="text-xxs base uppercase">Institute & Roles</p>
//               </div>
//             </div>
//             <ul className="ManageAccountListCst">
//               {/* <UserHeaderMenuItem className="base" title="Dashboard" url="/" /> */}
//               {/* <CurrentRole /> */}
//               <LogoutOption />
//             </ul>

//             {/* <UserRole /> */}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// }
export function DefaultMenuOptions({ user }) {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    var lastLetter = words.split(" ");
    return lastLetter[lastLetter.length - 1][0];
  }
  function getFirstWord(words) {
    let firstLetter = words && words.split(" ");
    return firstLetter && firstLetter.length && firstLetter[0];
  }
  const fullName = user && user.user_fullname ? user.user_fullname : "";
  return (
    <div className="profileNav">
      <div className="profileNavCst">
        {
          /* user.user_profile_picture === null || user.user_profile_picture ===
      undefined || user.user_profile_picture === "" ? (  */
          user && !user.user_profile_picture ? (
            <React.Fragment>
              {fullName.substring(0, 1)}
              {getLastWord(fullName)}
            </React.Fragment>
          ) : (
            <ImageViewer src={user && user.user_profile_picture} />
          )
        }
      </div>
      <div className="profileNavDropdownWrapper">
        <div className="profileNavDropdownCustom otherRole">
          <div className="profileNavDropdownHead">
            <div className="profileNameCst">
              <p className="gray">
                {" "}
                Hello,
                <span className="profileUserName w-600">
                  {getFirstWord(user.user_fullname)}
                </span>
              </p>
            </div>
            {/* <div className="roleHead">
              <p className="text-xxs base uppercase">Institute & Roles</p>
            </div> */}
          </div>
          <ul className="ManageAccountListCst">
            {/* <UserHeaderMenuItem>
              <li className="profileNameHead">
                <p className="gray">
                  Hello,
                  <span className="profileUserName w-600">
                    <Fullname />
                  </span>
                </p>
              </li>
            </UserHeaderMenuItem> */}

            {/* <UserHeaderMenuItem
              className="base"
              title="Manage Website"
              url="/"
            /> */}
            {/* <UserHeaderMenuItem className="base" title="Dashboard" url="/" /> */}

            {user.user_business_type === "LMS" &&
              <React.Fragment>
                <UserHeaderMenuItem
                  className="base"
                  title="Manage Profile"
                  url={`/profile/${user.user_username}`}
                />
              </React.Fragment>
            }
            <UserHeaderMenuItem
              className="base"
              title="Account Setting"
              url="/account-setting"
            />
            {/* <UserHeaderMenuItem
              className="base"
              title="Edneed Reviews"
              url="/edneed-review-list"
            /> */}

            {/* <CurrentRole /> */}
            <LogoutOption />
          </ul>

          {/* <UserRole /> */}
        </div>
      </div>
    </div>
  );
}


export function NavUserNameAndRole() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <React.Fragment>
      {!AppLinkUrl.subdomain() && windowSize.width >= 992 ? (
        <div className="nav-user-name">
          <p>
            <Fullname />
          </p>
          <CurrentRole showTitle={false} />
        </div>
      ) : null}
    </React.Fragment>
  );
}

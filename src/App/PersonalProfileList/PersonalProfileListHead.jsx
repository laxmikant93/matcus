import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../Common/Icon";
import {
  sortPublicProfile,
  getPublicProfiles,
  searchpublicprofiles,
  searchpublicprofilesTypes,
} from "../../store/actions/publicProfile";
import { useDispatch } from "react-redux";
import SearchControl from "../../Common/SearchControl";
const PersonalProfileListHead = ({ setType, setSearchValue, type }) => {
  const [toggle, setToggle] = useState("All");
  const limit = 10;
  const skip = 0;
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermRequest, setsearchTermRequest] = useState("");
  useEffect(() => {
    switch (toggle) {
      case "Other": {
        setType("Other");
        dispatch(sortPublicProfile("Other", limit, skip));
        break;
      }
      case "InstituteOwner": {
        setType("InstituteOwner");
        dispatch(sortPublicProfile("InstituteOwner", limit, skip));
        break;
      }
      case "Teacher": {
        setType("Teacher");
        dispatch(sortPublicProfile("Teacher", limit, skip));
        break;
      }
      case "Student": {
        setType("Student");
        dispatch(sortPublicProfile("Student", limit, skip));
        break;
      }
      case "All": {
        setType("All");
        dispatch(getPublicProfiles(limit, skip));
        break;
      }
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, dispatch]);

  useEffect(() => {
    if (!searchTerm) {
      switch (toggle) {
        case "Other": {
          setType("Other");
          dispatch(sortPublicProfile("Other", limit, skip));
          break;
        }
        case "InstituteOwner": {
          setType("InstituteOwner");
          dispatch(sortPublicProfile("InstituteOwner", limit, skip));
          break;
        }
        case "Teacher": {
          setType("Teacher");
          dispatch(sortPublicProfile("Teacher", limit, skip));
          break;
        }
        case "Student": {
          setType("Student");
          dispatch(sortPublicProfile("Student", limit, skip));
          break;
        }
        case "All": {
          setType("All");
          dispatch(getPublicProfiles(limit, skip));
          break;
        }
        default:
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // handle Search

  let typing;

  const handleChange = (event) => {
    event.preventDefault();
    setsearchTermRequest(event.target.value);
    clearTimeout(typing);

    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
      setSearchValue(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (type === "All" && searchTerm) {
      dispatch(searchpublicprofiles(searchTerm, 10, 0));
    } else if (searchTerm) {
      dispatch(searchpublicprofilesTypes(searchTerm, type, 10, 0));
    }
  }, [dispatch, searchTerm, type]);

  useEffect(() => {
    setSearchTerm("");
    setsearchTermRequest("");
    setType(toggle);
  }, [type, toggle, setType]);
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="PageTopHead PTH-PersonalProfileList mt-100">
          <div className="PTH-Item scroll-nav-tab-wrapper">
            <div className="scroll-nav-tab">
              <button
                className={`button btn-sm base ${toggle === "All" ? "button-base" : "btn-o-base"
                  }`}
                onClick={() => setToggle("All")}
              >
                All
              </button>
              <button
                className={`button btn-sm base ${toggle === "InstituteOwner" ? "button-base" : "btn-o-base"
                  }`}
                onClick={() => setToggle("InstituteOwner")}
              >
                Institute Admin
              </button>
              <button
                className={`button btn-sm base ${toggle === "Teacher" ? "button-base" : "btn-o-base"
                  }`}
                onClick={() => setToggle("Teacher")}
              >
                Teachers
              </button>
              <button
                className={`button btn-sm base ${toggle === "Student" ? "button-base" : "btn-o-base"
                  }`}
                onClick={() => setToggle("Student")}
              >
                Students
              </button>
              <button
                className={`button btn-sm base ${toggle === "Other" ? "button-base" : "btn-o-base"
                  }`}
                onClick={() => setToggle("Other")}
              >
                Others
              </button>
            </div>
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              value={searchTermRequest}
              // onKeyUp={searchresult}
              placeholder="Search"
              onChange={handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default PersonalProfileListHead;

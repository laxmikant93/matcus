/* eslint-disable eqeqeq */
import React from "react";
import { connect } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import NotFound from "../ErrorPage/NotFound";

class OwnerRoutes extends React.Component {

    render() {

        // const activeRole = UserActiveRole()
        return <Route path="/owner">
            {
                this.props.user.user_activeRole == process.env.REACT_APP_PAGE_OWNER ?
                    <React.Fragment>
                        <Route path="/owner/add" component={() => <div style={{ margin: "10rem" }}>/owner/add <NavLink to="/owner/update">Edit</NavLink></div>} />
                        <Route path="/owner/update" component={() => <div style={{ margin: "10rem" }}>/owner/add <NavLink to="/owner/add">Add</NavLink></div>} />
                        <Route component={NotFound} />
                    </React.Fragment>
                    :
                    <></>
            }

        </Route>
    }
}

const maps = state => {
    return {
        user: state.user
    }
}

export default connect(maps, null)(OwnerRoutes);
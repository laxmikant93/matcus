import React from "react";
import { connect } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import NotFound from "../ErrorPage/NotFound";
class StudentRoutes extends React.Component {

    render(){
        return <Route path="/student">
            {
                this.props.user.user_activeRole===process.env.REACT_APP_STUDENT?
                <React.Fragment>
                    <Route path="/student/add" component={()=><div>/student/add <NavLink to="/student/update">Edit</NavLink></div>} />
                    <Route path="/student/update" component={()=><div>/student/add <NavLink to="/student/add">Add</NavLink></div>} />
                    <Route component={NotFound}/>
                </React.Fragment>
                :
                <></>
            }
        
        </Route>
    }
}

const maps = state => {
    return {
        user:state.user
    }
}

export default connect(maps, null)(StudentRoutes);
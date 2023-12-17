import React from "react";
import { NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
import NotFound from "../ErrorPage/NotFound";
class TeacherRoutes extends React.Component {

    render(){
        return <Route path="/teacher">
            {
                this.props.user.user_activeRole===process.env.REACT_APP_TEACHER?
                <React.Fragment>
                    <Route path="/teacher/add" component={()=><div>/teacher/add <NavLink to="/teacher/update">Edit</NavLink></div>} />
                    <Route path="/teacher/update" component={()=><div>/teacher/add <NavLink to="/teacher/add">Add</NavLink></div>} />
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

export default connect(maps, null)(TeacherRoutes);
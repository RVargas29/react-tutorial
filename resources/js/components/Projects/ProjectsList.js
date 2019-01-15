import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProjectsList extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        axios.get('/api/projects').then(
            response => {
                this.setState({
                    projects: response.data
                })
            }
        )
    }

    render() {
        const { projects } = this.state;
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">Project List</div>
                <div className="panel-body">
                    <Link className='btn btn-primary' to='/create'>Create</Link>
                    <ul className="list-group">
                        {projects.map(
                            project => (
                                <li className="list-group-item" key={project.id}>
                                    <Link to={`/$project.id`} >
                                        {project.name}
                                        <span className="badge badge-primary">
                                            {project.tasks_count}
                                        </span>
                                    </Link>
                                </li> 
                            )
                        )}
                    </ul>
                </div>
            </div> 
        )
    }

}

export default ProjectsList;
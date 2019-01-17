import axios from 'axios';
import React, { Component } from 'react';

class ShowProject extends Component {
    constructor (props) {
        super(props);
        this.state = {
            project: {},
            tasks: [],
            title: '',
            errors: []
        }

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleMarkCompleted = this.handleMarkCompleted.bind(this);
    }

    componentDidMount() {
        const projectId = this.props.match.params.id;

        axios.get(`/api/projects/${projectId}`).then(response => {
            this.setState({
                project: response.data,
                tasks: response.data.tasks
            })
        })
    }

    handleFieldChange(event) {
        this.setState({
            title: event.target.value
        })
    }

    handleAddTask(event) {
        event.preventDefault();

        const task = {
            title: this.state.title,
            project_id: this.state.project.id
        }

        axios.post('/api/tasks', task)
        .then(response => {
            this.setState({
                title: ''
            });
            this.setState(prevState => ({
                tasks: prevState.tasks.concat(response.data)
            }))
        })
        .catch(error => {
            this.setState({
                errors: error.response.data.errors
            })
        });
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if(this.hasErrorFor(field)) {
            return (
                <span className='error'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    handleMarkCompleted() {
        const {history} = this.props;

        axios.put(`/api/projects/${this.state.project.id}`)
        .then(response => history.push('/'));
    }

    handleMarkTaksCompleted(taskId) {
        axios.put(`/api/tasks/${taskId}`).then(response => {
            this.setState(prevState => ({
                tasks: prevState.tasks.filter( task => {
                    return task.id !== taskId
                })
            }))
        })
    }

    render() {
        const {project, tasks} = this.state
        return(
            <div className="panel panel-primary">
                <div className="panel-heading">
                    {project.name}
                </div>
                <div className="panel-body">
                    <p>{project.description}</p>
                    <button className="btn btn-primary" onClick={this.handleMarkCompleted}>
                        Complete project
                    </button>
                    <hr />
                    <form onSubmit={this.handleAddTask}>
                        <div className="input-group">
                            <input
                            type="text"
                            name="title"
                            className={`form-control &{this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                            placeholder='Task title'
                            value={this.state.title}
                            onChange={this.handleFieldChange}
                            ></input>
                            <div className='input-group'>
                                <button className="btn btn-primary">Add</button>
                            </div>                        
                        </div>
                        {this.renderErrorFor('title')}
                    </form>
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li className="list-group-item"
                            key={task.id}>
                                {task.title}
                                <button className="btn btn-secondary btn-sm" onClick={this.handleMarkTaksCompleted.bind(this, task.id)}>
                                    Mark completed
                                </button>                            
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ShowProject;
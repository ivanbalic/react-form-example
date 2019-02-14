import React, { Component } from 'react';

import { dataService } from '../../../services/dataService';

import './StatusSwitch.css';

class StatusSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            status: this.props.status,
            budget: this.props.budget,
            index: this.props.index,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.checked;
        
        let newStatus;
        if (value) {
            newStatus = 'active';
        } else {
            newStatus = 'paused';
        }

        this.setState({
            status: newStatus,
        });
    }

    componentDidUpdate(prevProps, prevState){

        if (prevState.status !== this.state.status) {
            const {name, status, budget, index} = this.state;
            const payload = {
                name,
                status,
                budget,
            }
            
            dataService.editCampaign(index, payload)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.message);
                    this.props.loadData();  
                } else {
                    throw new Error(response.message);
                }
            })
            .catch( error => {
                console.log(error.message);         
            });
        } else if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
    }

    render() {
        
        const { status } = this.state;

        return (
            <span className="ui-switch is-animated">
                {
                    status === 'active' ? 
                    <input type="checkbox" className="ui-checkbox"  checked={true} onChange={this.handleChange} />
                    : <input type="checkbox" className="ui-checkbox" checked={false} onChange={this.handleChange} />
                }
                <span className="ui-button"></span>
            </span>
        );
    }
}

export default StatusSwitch ;

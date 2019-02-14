import React, { Component } from 'react';

import { dataService } from '../../../services/dataService';

import './CampaignForm.css'

class CampaignForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name,
            status: this.props.status,
            budget: this.props.budget,
            index: this.props.index,
            statusMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleSubmit(event) {

        const {name, status, budget, index} = this.state;
        const payload = {
            name,
            status,
            budget,
        }

        if (this.state.index >= 0) {
            
            dataService.editCampaign(index, payload)
            .then(response => {
                
                if (response.status === 200) {
                    console.log(response.message);
                    this.props.loadData();
                    this.props.toggleFormDisplay();
                } else {
                    throw new Error(response.message)
                }
            })
            .catch( error => {
                this.setState({
                    statusMessage: error.message,
                });
            });
            event.preventDefault();
        } else {
            
            dataService.addCampaign(payload)
            .then(response => {
                
                if (response.status === 200) {
                    console.log(response.message);
                    this.props.loadData();
                    this.props.toggleFormDisplay();
                } else {
                    throw new Error(response.message)
                }
            })
            .catch( error => {
                this.setState({
                    statusMessage: error.message,
                });
            });
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className='form-container'>
                <h2>Add Campaign</h2>

                <form onSubmit={this.handleSubmit}>
                    <input
                    name='name'
                    type='text' 
                    value={this.state.name} 
                    placeholder='Name' 
                    onChange={this.handleChange}/>

                    <select
                    className="select-css" 
                    name='status'
                    value={this.state.status}
                    onChange={this.handleChange}>
                        <option value='status'>Status</option>
                        <option value='active'>Active</option>
                        <option value='paused'>Paused</option>
                    </select>

                    <input
                    name='budget'
                    type='number'
                    value={this.state.budget}
                    placeholder='Budget'
                    onChange={this.handleChange} />

                    <small>{this.state.statusMessage}</small>

                    <input className='button' type='reset' value='Cancel' onClick={this.props.toggleFormDisplay} />
                    <input className='button float-right' type='submit' value='Add'/>
                </form>
            </div>
        );
    }
}

export default CampaignForm;

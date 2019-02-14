import React, {Component} from 'react';

import CampaignForm from './components/CampaignForm/CampaignForm';
import { Table } from './components/Table/Table';
import { dataService } from '../services/dataService';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormActive: false,
      name: '',
      status: 'status',
      budget: '',
      index: -1,
      items: null,
    }
    this.loadData = this.loadData.bind(this);
    this.toggleFormDisplay = this.toggleFormDisplay.bind(this);
  }

  loadData() {
    
    const sessionId = JSON.parse(sessionStorage.getItem('sessionId'));
    
    dataService.fetchData(sessionId)
    .then(mappedItems => {
        this.setState({
          items: mappedItems,
        })
    });
  }

  toggleFormDisplay(name='', status='status', budget='', index=-1) {
    
    const newState = !this.state.isFormActive;
    
    this.setState({
      isFormActive: newState,
      name,
      status,
      budget,
      index,
    });
  }
  
  componentDidMount(){
    this.loadData();
  }

  render() {
    const {name, status, budget, index, items, isFormActive} = this.state;

    if (!items) {
      return(
        <></>
      );
    }
    
    return (
      <>
        <button className='add-button' onClick={() => {this.toggleFormDisplay()}} ><i className="fas fa-plus"></i><span className='btn-text'>Add</span></button>
        <Table toggleFormDisplay={this.toggleFormDisplay} items={items} loadData={this.loadData} />
        {isFormActive ? 
        <CampaignForm
        toggleFormDisplay={this.toggleFormDisplay}
        loadData={this.loadData}
        name={name}
        status={status}
        budget={budget}
        index={index} />
        : null}
      </>
    );
  }

}

export default App;

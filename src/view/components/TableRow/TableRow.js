import React from 'react';

import StatusSwitch from '../StatusSwitch/StatusSwitch';

const TableRow = ({item, index, toggleFormDisplay, loadData}) => {

    const {name, status, budget} = item;
    
    return (
        <tr>
            <td>{name}</td>
            <td>
                <StatusSwitch
                status={status}
                name={name}
                budget={budget}
                loadData={loadData}
                index={index}/>
            </td>
            <td>{`$${budget}`}</td>
            <td>
                <i className="fas fa-edit" onClick={() => {toggleFormDisplay(name, status, budget, index)}}></i>
            </td>
        </tr>
    );
}

export { TableRow };

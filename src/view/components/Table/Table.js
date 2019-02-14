import React from 'react';

import  { TableBody } from '../TableBody/TableBody';

import './Table.css';

const Table = ({toggleFormDisplay, items, loadData}) => {
   
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Budget</th>
                    <th>Action</th>
                </tr>
            </thead>
            <TableBody items={items} toggleFormDisplay={toggleFormDisplay} loadData={loadData} />
        </table>
    );
}

export { Table };

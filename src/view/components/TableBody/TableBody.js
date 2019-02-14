import React from 'react';

import { TableRow } from '../TableRow/TableRow';

const TableBody = ({items, toggleFormDisplay, loadData}) => {

    return (
        <tbody>
            {items.map((item, index) => {
            return <TableRow
                key={index}
                item={item}
                toggleFormDisplay={toggleFormDisplay}
                index={index}
                loadData={loadData} />
            })}
        </tbody>
    );
}

export { TableBody };

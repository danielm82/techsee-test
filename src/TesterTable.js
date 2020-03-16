import React, {useState, useEffect} from 'react';
import './TesterTable.scss';
import { Table } from 'react-bootstrap';

function TesterTable({data}) {

  const [tableData, setTableData] = useState([]);
  const [currentPivot, setCurrentPivot] = useState('');


  useEffect(() => {
    if (data.length > 1) {
      sortTable('firstName');
    } else {
      setTableData(data);
    }    
  }, [data]);

  const sortTable = pivot => {
    let pClone = [...data];
    let descending = pivot === currentPivot;
    const sortFunc = descending ? (a, b) => b[pivot].localeCompare(a[pivot]) : (a, b) => a[pivot].localeCompare(b[pivot]);
    setTableData(pClone.sort(sortFunc));
    setCurrentPivot(descending ? '' : pivot);
  }

  return (
    <div className="TesterTable">
      <Table striped bordered variant="dark">
        <thead>
          <tr>
            <th onClick={() => sortTable('firstName')}>First Name</th>
            <th onClick={() => sortTable('lastName')}>Last Name</th>
            <th onClick={() => sortTable('country')}>Country</th>
            <th>Bugs</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(tester => {
            return (
              <tr key={`${tester.firstName}${tester.lastName}`}>
                <td>{tester.firstName}</td>
                <td>{tester.lastName}</td>
                <td>{tester.country}</td>
                {/*Could have use map and join here for a simpler solution, but I'm kinda proud of this reduce solution*/}
                <td>{tester.bugs.reduce((list, next, index) => `${list}${index !== 0 ? ', ' : ''}${next.title}`, '')}</td>
              </tr>
              );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default TesterTable;

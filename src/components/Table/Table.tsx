import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './Table.module.css';
import data from '../../data/dummy_table_data.json';
import { useEffect, useState } from 'react';

const Table = () => { //tableData in props for actual data
  const [newTableData, setNewTableData] = useState(data);

  const headerStyle = {
    color: '#A3AED0',
    fontWeight: 'bold',
  }

  const convertDate = (rowData) => {
    const date = new Date(rowData.shiftStartTime);
    return date.toLocaleDateString();
  }

  useEffect(() => {
    if(data?.length > 10){setNewTableData(data.slice(0, 10));

    let currentIndex = 10;

    const interval = setInterval(() => {
      setNewTableData((prevData) => {
        const newData = [...prevData];
        if (currentIndex < data.length) {
          newData.unshift(data[currentIndex]);
          currentIndex++;
        } else {
          currentIndex = 0;
          newData.unshift(data[currentIndex]);
          currentIndex++;
        }
        if (newData.length > 10) {
          newData.pop();
        }
        return newData;
      })
    }, 1000)

    return () => {
      clearInterval(interval);
    }}
  }, []);

  const rowStyle = {
    padding: '0.6rem',
    color: '#2B3674',
  }

  return (
    <div className={styles.table_container}>
      <h2 className={styles.table_title}>Open tickets</h2>
      <DataTable value={newTableData}>
        <Column
          header="S no"
          headerStyle={headerStyle}
          body={(rowData, { rowIndex }) => rowIndex + 1}
          style={rowStyle}
        />
        <Column field="deputyId" header="Ticket ID" headerStyle={headerStyle} style={rowStyle}/>
        <Column field="name" header="Employee name" headerStyle={headerStyle} style={rowStyle} />
        <Column field="site" header="Site name" headerStyle={headerStyle} style={rowStyle} />
        <Column field="shiftStartDate" header="Shift date" body={(rowData) => convertDate(rowData)} headerStyle={headerStyle} style={rowStyle} />
        <Column field="shiftStartTime" header="Shift time" headerStyle={headerStyle} style={rowStyle} />
        <Column field="cancellationReason" header="Shift time" headerStyle={headerStyle} style={rowStyle} />
        <Column field="assignedController" header="Controller name" headerStyle={headerStyle} style={rowStyle} />
      </DataTable>
    </div>
  )
}

export default Table
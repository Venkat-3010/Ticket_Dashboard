import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './Table.module.css';
import data from '../../data/dummy_table_data.json';
import { useEffect, useRef } from 'react';

const Table = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval: any;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer && scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
          scrollContainer.scrollTop = 0;
        } else if (scrollContainer) {
          scrollContainer.scrollTop += 1;
        }
      }, 40);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, []);

  const headerStyle = {
    color: '#A3AED0',
    fontWeight: 'bold',
  }

  const convertDate = (rowData: []) => {
    const date = new Date(rowData.shiftStartTime);
    return date.toLocaleDateString();
  }

  const rowStyle = {
    padding: '0.6rem',
    color: '#2B3674',
  }

  return (
    <div className={styles.table_container}>
      <h2 className={styles.table_title}>Open tickets</h2>
      <div className={styles.scrollable_container} ref={scrollRef}>
          <DataTable value={data} scrollable>
            <Column
              header="S no"
              headerStyle={headerStyle}
              body={(rowData, { rowIndex }) => rowIndex + 1}
              style={rowStyle}
            />
            <Column field="deputyId" header="Ticket ID" headerStyle={headerStyle} style={rowStyle} />
            <Column field="name" header="Employee name" headerStyle={headerStyle} style={rowStyle} />
            <Column field="site" header="Site name" headerStyle={headerStyle} style={rowStyle} />
            <Column field="shiftStartDate" header="Shift date" body={(rowData) => convertDate(rowData)} headerStyle={headerStyle} style={rowStyle} />
            <Column field="shiftStartTime" header="Shift time" headerStyle={headerStyle} style={rowStyle} />
            <Column field="cancellationReason" header="Reason" headerStyle={headerStyle} style={rowStyle} />
          </DataTable>
      </div>
    </div>
  )
}

export default Table
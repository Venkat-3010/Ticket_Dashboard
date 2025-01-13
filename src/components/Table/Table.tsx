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

  const convertDate = (rowData: { shiftStartDate: string }) => {
    const date = new Date(rowData?.shiftStartDate);
    return date.toLocaleDateString();
  }

  return (
    <div className={styles.table_container}>
      <h2 className={styles.table_title}>Open tickets</h2>
      <div className={styles.scrollable_container} ref={scrollRef}>
        <DataTable value={data} scrollable>
          <Column
            header="S no"
            headerClassName={styles.table_header}
            className={styles.table_row}
            body={(rowData, { rowIndex }) => rowIndex + 1}
          />
          <Column
            field="deputyId"
            header="Ticket ID"
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="name"
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="site"
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="shiftStartDate"
            header="Shift date"
            body={(rowData) => convertDate(rowData)}
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="shiftStartTime"
            header="Shift time"
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="cancellationReason"
            header="Reason"
            headerClassName={styles.table_header}
            className={styles.table_row} />
        </DataTable>
      </div>
    </div>
  )
}

export default Table
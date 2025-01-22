import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from './Table.module.css';
import data from '../../data/dummy_table_data.json';
import { useEffect, useRef } from 'react';

interface ExtendedDataTable extends DataTable<any> {
  getElement: () => HTMLDivElement;
}

interface TableProps {
  tableData: Array<{
    deputyId: string;
    name: string;
    site: string;
    shiftStartDate: string;
    shiftStartTime: string;
    cancellationReason: string;
  }>;
}

const Table = ({ tableData }: TableProps) => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval: any;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer && scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 2) {
          scrollContainer.scrollTop = 0;
        } else if (scrollContainer) {
          scrollContainer.scrollTop += 1;
        }
      }, 40);
    };

    startScrolling();

    return () => clearInterval(scrollInterval);
  }, [scrollRef]);

  const convertDate = (rowData: { shiftStartDate: string }) => {
    const date = new Date(rowData?.shiftStartDate);
    return date.toLocaleDateString();
  }

  return (
    <div className={styles.table_container}>
      <h2 className={styles.table_title}>Open tickets</h2>
      <div className={styles.scrollable_container}>
        <DataTable value={data} scrollable scrollHeight='350px' ref={(el: ExtendedDataTable | null) => {
          if (el) {
            scrollRef.current = el.getElement().querySelector('.p-datatable-wrapper');
          }
        }}>
          <Column
            header="Sl no"
            headerClassName={styles.table_header}
            className={styles.table_row}
            body={(_, { rowIndex }) => rowIndex + 1}
          />
          <Column
            field="deputyId"
            header="Ticket ID"
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="name"
            header="Employee name"
            headerClassName={styles.table_header}
            className={styles.table_row} />
          <Column
            field="site"
            header="Site name"
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
            field="assignedController"
            body={(rowData) => rowData.assignedController || "N/A"}
            header="Controller name"
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
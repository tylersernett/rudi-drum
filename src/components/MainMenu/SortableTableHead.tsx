import { TableRow, TableCell, TableSortLabel, TableHead } from '@mui/material';
import { Direction } from '../../types';

const columns = [
  { id: 'title', label: 'Title' },
  { id: 'bpm', label: 'BPM' },
  { id: 'subdivisions', label: 'Subs' },
];
interface SortableTableHeadProps {
  sortConfig: {
    key: string;
    direction: Direction;
  };
  handleSort: (column: string) => void;
  isMobile: boolean;
}
const SortableTableHead: React.FC<SortableTableHeadProps> = ({ sortConfig, handleSort, isMobile }) => {
  return (
    <TableHead sx={{ fontWeight: 'bold' }}>
      <TableRow>
        {columns.map((column) => {
          if (isMobile && column.id === 'subdivisions') {
            // Don't render the "Subs" column header when isMobile is true
            return null;
          }
          return (
            <TableCell key={column.id}>
              <TableSortLabel
                active={sortConfig.key === column.id}
                direction={sortConfig.key === column.id ? sortConfig.direction : 'asc'}
                onClick={() => handleSort(column.id)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
        <TableCell>Delete</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default SortableTableHead;
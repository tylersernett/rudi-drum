import { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, TableSortLabel, Typography, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import metronomesService from '../../services/metronomes';
import { useUserContext } from '../../context/UserContext';
import { Title } from '@mui/icons-material';
import { useMetronomeContext } from '../../context/MetronomeContext';
import { MetronomeItem } from '../../context/MetronomeContext';

type Direction = 'asc' | 'desc' | undefined;

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

const LoadMenu = () => {
  const { user } = useUserContext();
  const { setMetronome } = useMetronomeContext();
  const [metronomeData, setMetronomeData] = useState([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: Direction }>({
    key: 'title',
    direction: 'asc', 
  });
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint here

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.token) {
          const data = await metronomesService.getOwn(user.token);
          console.log('Fetched metronome data:', data);
          setMetronomeData(data);
        }
      } catch (error) {
        console.error('Error fetching metronome data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleLoad = (metronomeItem: MetronomeItem) => {
    console.log('Clicked on row, metronome data:', metronomeItem);
    const { title, bpm, subdivisions, blinkToggle } = metronomeItem;
    setMetronome({ title, bpm, subdivisions, blinkToggle });
  };

  const handleDelete = (metronomeItem: MetronomeItem) => {
    console.log('Clicked trash, metronome data:', metronomeItem);
  };

  const handleSort = (key: string) => {
    let newDirection: Direction = 'asc';

    if (sortConfig.key === key) {
      // If the same column is clicked again, toggle the direction
      newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }

    setSortConfig({ key, direction: newDirection });
  };

  const sortedMetronomeData = [...metronomeData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{backgroundColor:'#2f2f2f'}}>
        <SortableTableHead sortConfig={sortConfig} handleSort={handleSort} isMobile={isMobile}/>
        <TableBody>
          {sortedMetronomeData.map((metronomeItem: MetronomeItem) => (
            <TableRow key={metronomeItem.id}>
              <TableCell onClick={() => handleLoad(metronomeItem)}>
                <Button variant="contained" size="small">
                  {metronomeItem.title}
                </Button>
              </TableCell>
              <TableCell onClick={() => handleLoad(metronomeItem)}>
                {metronomeItem.bpm}
              </TableCell>
              {!isMobile && (
                <TableCell onClick={() => handleLoad(metronomeItem)}>
                  {metronomeItem.subdivisions}
                </TableCell>
              )}
              <TableCell onClick={() => handleDelete(metronomeItem)}>
                <IconButton color='primary'>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoadMenu
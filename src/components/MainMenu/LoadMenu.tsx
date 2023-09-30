import { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, TableSortLabel, Typography, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import metronomesService from '../../services/metronomes';
import { useUserContext } from '../../context/UserContext';
import { useMetronomeContext } from '../../context/MetronomeContext';
import { MetronomeItem } from '../../context/MetronomeContext';
import { Direction } from '../../types';
import SortableTableHead from './SortableTableHead';
import DeleteDialog from './DeleteDialog';

const LoadMenu = () => {
  const { user } = useUserContext();
  const { setMetronome } = useMetronomeContext();
  const [metronomeLoaded, setMetronomeLoaded] = useState(false);
  const [metronomeData, setMetronomeData] = useState([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: Direction }>({
    key: 'title',
    direction: 'asc',
  });
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint here
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Metronome Item to Delete
  const [metronomeToDelete, setMetronomeToDelete] = useState<MetronomeItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.token) {
          setMetronomeLoaded(false);
          const data = await metronomesService.getOwn(user.token);
          console.log('Fetched metronome data:', data);
          setMetronomeData(data);
          setMetronomeLoaded(true);
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
    setMetronomeToDelete(metronomeItem);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setMetronomeToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      if (metronomeToDelete && user.token) {
        await metronomesService.remove(metronomeToDelete.id, user.token)
        // Fetch the updated list of metronomes
        const updatedMetronomeData = await metronomesService.getOwn(user.token);
        // Update the state with the updated data
        setMetronomeData(updatedMetronomeData);
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.log("Error deleting metronome: ", error)
    }
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
      <Table size="small" sx={{ backgroundColor: '#2f2f2f' }}>
        <SortableTableHead sortConfig={sortConfig} handleSort={handleSort} isMobile={isMobile} />

        <TableBody>
          {(metronomeLoaded && sortedMetronomeData.length === 0) ?
            <TableRow><TableCell>Nothing saved yet</TableCell></TableRow>
            :
            <>
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
            </>
          }
        </TableBody>
      </Table>
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
      />
    </TableContainer>
  );
};

export default LoadMenu
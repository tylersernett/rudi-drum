import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, TableSortLabel, Typography, useMediaQuery, Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import metronomesService from '../../services/metronomes';
import { useUserContext } from '../../context/UserContext';
import { useMetronomeContext } from '../../context/MetronomeContext';
import { MetronomeItem } from '../../context/MetronomeContext';
import { Direction } from '../../types';
import SortableTableHead from './SortableTableHead';
import DeleteDialog from './DeleteDialog';

interface BrowseDialogProps {
  open: boolean;
  onClose: () => void;
  metronomeData: MetronomeItem[];
  setMetronomeData: Dispatch<SetStateAction<MetronomeItem[]>>;
  metronomeLoaded: boolean;
}

const BrowseDialog: React.FC<BrowseDialogProps> = ({ open, onClose, metronomeData, setMetronomeData, metronomeLoaded }) => {
  const { user } = useUserContext();
  const { setMetronome } = useMetronomeContext();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: Direction }>({
    key: 'title',
    direction: 'asc',
  });
  const isMobile = useMediaQuery('(max-width: 440px)'); // Define your mobile breakpoint here
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Metronome Item to Delete
  const [metronomeToDelete, setMetronomeToDelete] = useState<MetronomeItem | null>(null);

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
    // Type assertion to tell TypeScript that `key` is a valid property
    const key = sortConfig.key as keyof MetronomeItem;
    if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
                      <Button variant="contained" size="small" sx={{ textTransform: 'none' }} >
                        {metronomeItem.title}
                      </Button>
                    </TableCell>
                    <TableCell >
                      {metronomeItem.bpm}
                    </TableCell>
                    {!isMobile && (
                      <TableCell >
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
    </Dialog>
  );
};

export default BrowseDialog
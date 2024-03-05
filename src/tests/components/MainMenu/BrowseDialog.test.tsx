import { expect, } from 'vitest';
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom'; // No need to explicitly extend expect
import BrowseDialog from '../../../components/MainMenu/BrowseDialog'; // Import your component
import { BlinkToggleOption, MetronomeDBItem, RampToggleOption } from '../../../types';
import { UserProvider } from '../../../context/UserContext';
import { MetronomeProvider } from '../../../context/MetronomeContext';

describe('BrowseDialog Component', () => {
  let metronomeData: MetronomeDBItem[];
  // let container: RenderResult;
  beforeEach(() => {
    metronomeData = [
      {
        title: 'Metronome A',
        bpm: 120,
        subdivisions: 3,
        blinkToggle: BlinkToggleOption.Off,
        rampToBpm: 120,
        rampDuration: 0,
        rampToggle: RampToggleOption.Off,
        id: 123,
        createdAt: '1000',
        updatedAt: '1000',
        user: { username: 'testUser' },
      },
      {
        title: 'Metronome B',
        bpm: 100,
        subdivisions: 4,
        blinkToggle: BlinkToggleOption.Off,
        rampToBpm: 120,
        rampDuration: 0,
        rampToggle: RampToggleOption.Off,
        id: 124,
        createdAt: '1002',
        updatedAt: '1002',
        user: { username: 'testUser' },
      },
      {
        title: 'Metronome C',
        bpm: 150,
        subdivisions: 6,
        blinkToggle: BlinkToggleOption.Off,
        rampToBpm: 120,
        rampDuration: 0,
        rampToggle: RampToggleOption.Off,
        id: 125,
        createdAt: '1003',
        updatedAt: '1003',
        user: { username: 'testUser' },
      },
    ];
    render(
      <UserProvider>
        <MetronomeProvider>
          <BrowseDialog
            open={true}
            onClose={() => { }}
            metronomeData={metronomeData}
            setMetronomeData={() => { }}
            metronomeLoaded={true}
          />
        </MetronomeProvider>
      </UserProvider>
    );
  })


  it('renders without errors', () => {
    // Assert that the component renders without errors
    const dialogTitle = screen.getByText('Title');
    expect(dialogTitle).toBeInTheDocument();
    const dialogBPM = screen.getByText('BPM');
    expect(dialogBPM).toBeInTheDocument();
    const dialogTitleExample = screen.getByText('Metronome B');
    expect(dialogTitleExample).toBeInTheDocument();

  });

  it('sorts data by title in ascending order by default', () => {
    const titles = screen.getAllByText(/Metronome/);
    expect(titles[0]).toHaveTextContent('Metronome A');
    expect(titles[1]).toHaveTextContent('Metronome B');
    expect(titles[2]).toHaveTextContent('Metronome C');
  });

  it('sorts data by BPM in ascending order when clicking the BPM column header', () => {
    const dialogBPM = screen.getByText('BPM');
    fireEvent.click(dialogBPM);
    const titles = screen.getAllByText(/Metronome/);
    expect(titles[0]).toHaveTextContent('Metronome B');
    expect(titles[1]).toHaveTextContent('Metronome A');
    expect(titles[2]).toHaveTextContent('Metronome C');
  })

  it('sorts data by BPM in descending order when clicking the BPM column header twice', () => {
    const dialogBPM = screen.getByText('BPM');
    fireEvent.click(dialogBPM);
    fireEvent.click(dialogBPM);
    const titles = screen.getAllByText(/Metronome/);
    expect(titles[0]).toHaveTextContent('Metronome C');
    expect(titles[1]).toHaveTextContent('Metronome A');
    expect(titles[2]).toHaveTextContent('Metronome B');
  });

});

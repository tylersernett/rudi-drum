import { render, screen, fireEvent } from '@testing-library/react';
import { expect, vi } from 'vitest';
import DeleteDialog from '../../../components/MainMenu/DeleteDialog'; // Adjust the import path as per your project structure

test('renders the delete confirmation dialog', () => {
  render(
    <DeleteDialog
      open={true}
      onClose={() => { }}
      onConfirmDelete={() => { }}
    />
  );
  const titleElement = screen.getByText('Delete metronome?');
  const bodyTextElement = screen.getByText('This action cannot be undone.');
  const cancelButton = screen.getByText('Cancel');
  const deleteButton = screen.getByText('Delete');

  expect(titleElement).toBeInTheDocument();
  expect(bodyTextElement).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

test('calls onClose when Cancel button is clicked', () => {
  const onClose = vi.fn();
  render(
    <DeleteDialog
      open={true}
      onClose={onClose}
      onConfirmDelete={() => { }}
    />
  );
  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);
  expect(onClose).toHaveBeenCalledTimes(1);
});

test('calls onConfirmDelete when Delete button is clicked', () => {
  const onConfirmDelete = vi.fn();
  render(<DeleteDialog open={true} onClose={() => { }} onConfirmDelete={onConfirmDelete} />);
  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  expect(onConfirmDelete).toHaveBeenCalledTimes(1);
});

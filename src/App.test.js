import { render, screen } from '@testing-library/react';
import App from './App';
import EnterIdModal from './Components/UI/Body/EnterIdModal/EnterIdModal';

test('renders learn react link', () => {
  render(<EnterIdModal />);
  const linkElement = screen.getByText(/Get Details/);
  expect(linkElement).toBeInTheDocument();
});
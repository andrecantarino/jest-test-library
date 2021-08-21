import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button turn from red to blue', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to blue/i });
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });

  expect(colorButton.textContent).toBe('Change to red');
});

test('initial conditions', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', { name: /change to blue/i });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('checkbox disabled button on first click and enables on second click', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Disabled button has gray background and reverts to red', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: 'Change to blue' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'red' });
});

test('Clicked disabled button has gray background and reverts to blue', () => {
  render(<App />);

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
  const button = screen.getByRole('button', { name: 'Change to blue' });

  // change button to blue
  fireEvent.click(button);

  // disabled button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'gray' });

  // re-enabled button
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: 'blue' });
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });
  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
});


import { render, screen } from '@testing-library/react';
import App from './App';
import About from './components/About';
import { Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('verify button on About screen', ()=>{
  render(

  <Router location={'/about'}>
    <About/>
  </Router>);

  const button = screen.getByRole('button');
  
  expect(button).toHaveTextContent("forward")
});
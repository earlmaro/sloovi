import './style.css';
import Sloovi from './components/Sloovi.js'
// routes
// ----------------------------------------------------------------------

export default function App() {
  const isInitialized = true;

  return (
    <div>
      {isInitialized ? <Sloovi /> : ''}
  </div>
  );
}

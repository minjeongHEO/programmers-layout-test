import { useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const handleOrderType = ({ target: { value } }:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedOption(value);
  };

  return (
    <div className="container">
      <div className="section __order">
        <select id="order_type" value={selectedOption} onChange={handleOrderType}>
          <option value="1">최근등록순</option>
          <option value="2">조회순</option>
        </select>
      </div>
      <div className="section">
        <Table orderType={selectedOption} />
      </div>
    </div>
  );
}

export default App;

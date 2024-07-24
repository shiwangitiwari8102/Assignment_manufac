import React from 'react';
import { MantineProvider } from '@mantine/core';
import CropMaxMinTable from './components/CropMaxMinTable';
import CropAverageTable from './components/CropAverageTable';

const App: React.FC = () => {
  return (
    <MantineProvider>
      <div style={{ padding: 20 }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', }}>Crop Production Analytics</h1>
        <h3 style={{ display: 'flex', justifyContent: 'center', }}>Maximum and Minimum Crop Production by Year</h3>
        <CropMaxMinTable />
        <h2 style={{ display: 'flex', justifyContent: 'center', }}>Average Crop Yield and Cultivation Area</h2>
        <CropAverageTable />
      </div>
    </MantineProvider>
  );
};

export default App;

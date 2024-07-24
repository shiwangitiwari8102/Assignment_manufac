import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/dataFetcher';
import { aggregateCropData } from '../utils/dataProcessor';
import styles from './TableStyles.module.css';

const CropMaxMinTable: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: { maxCrop: string; minCrop: string } }>({});

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const jsonData = await fetchData();
      const { maxMinByYear } = aggregateCropData(jsonData);
      setData(maxMinByYear);
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className='table-container'>
      <table className={styles.table} >
        <thead >
          <tr>
            <th className={styles.th}>Year</th>
            <th className={styles.th}>Crop with Maximum Production</th>
            <th className={styles.th}>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([year, { maxCrop, minCrop }]) => (
            <tr key={year} className={styles.tr}>
              <td className={styles.td} data-label="Year">{year}</td>
              <td className={styles.td} data-label="Crop with Maximum Production">{maxCrop}</td>
              <td className={styles.td} data-label="Crop with Minimum Production" >{minCrop}</td>
            </tr>
          ))}
        </tbody>
      </table>
   </div>
  );
};

export default CropMaxMinTable;

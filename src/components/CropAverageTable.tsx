import React, { useEffect, useState } from 'react';
import { fetchData } from '../utils/dataFetcher';
import { aggregateCropData } from '../utils/dataProcessor';
import styles from './TableStyles.module.css';

const CropAverageTable: React.FC = () => {
  const [data, setData] = useState<{ crop: string; avgYield: string; avgArea: string }[]>([]);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const jsonData = await fetchData();
      const { averageCropData } = aggregateCropData(jsonData);
      setData(averageCropData);
    };

    fetchAndProcessData();
  }, []);

  return (
    <div className='table-container'>
      <table className={styles.table}>
        <thead >
          <tr className={styles.tr}>
            <th className={styles.th}>Crop</th>
            <th className={styles.th}>Average Yield</th>
            <th className={styles.th}>Average Cultivation Area</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ crop, avgYield, avgArea }) => (
            <tr key={crop} className={styles.tr}>
              <td className={styles.td} data-label="Crop">{crop}</td>
              <td className={styles.td} data-label="Average Yield">{avgYield}</td>
              <td className={styles.td} data-label="Average Cultivation Area">{avgArea}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

  );
};

export default CropAverageTable;


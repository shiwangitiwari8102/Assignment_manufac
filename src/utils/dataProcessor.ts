interface CropData {
  Country: string;
  Year: string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': number;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string;
  'Area Under Cultivation (UOM:Ha(Hectares))': number | string; 
}

export function aggregateCropData(data: CropData[]) {
  const maxMinByYear: { [key: string]: { maxCrop: string; minCrop: string } } = {};
  const cropStats: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

  data.forEach((item) => {
    const year = item.Year;
    const crop = item['Crop Name'];
    const production = item['Crop Production (UOM:t(Tonnes))'];
    const cropyield = parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0;
    const area = parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))'] as string) || 0;

    if (!maxMinByYear[year]) {
      maxMinByYear[year] = { maxCrop: crop, minCrop: crop };
    }

    // Max and Min Crop Production
    const maxCropProduction = data.find(d => d.Year === year && d['Crop Name'] === maxMinByYear[year].maxCrop)?.['Crop Production (UOM:t(Tonnes))'] || 0;
    if (production > maxCropProduction) {
      maxMinByYear[year].maxCrop = crop;
    }

    const minCropProduction = data.find(d => d.Year === year && d['Crop Name'] === maxMinByYear[year].minCrop)?.['Crop Production (UOM:t(Tonnes))'] || Infinity;
    if (production < minCropProduction) {
      maxMinByYear[year].minCrop = crop;
    }

    // Aggregate Crop Stats
    if (!cropStats[crop]) {
      cropStats[crop] = { totalYield: 0, totalArea: 0, count: 0 };
    }

    cropStats[crop].totalYield += cropyield;
    cropStats[crop].totalArea += area;
    cropStats[crop].count += 1;
  });

  const averageCropData = Object.entries(cropStats).map(([crop, stats]) => ({
    crop,
    avgYield: (stats.totalYield / stats.count).toFixed(3),
    avgArea: (stats.totalArea / stats.count).toFixed(3)
  }));

  return { maxMinByYear, averageCropData };
}
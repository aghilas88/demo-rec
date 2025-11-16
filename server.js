const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Mock data generator
function generateEEBalances(page = 0, size = 20) {
  const total = 100;
  const start = page * size;
  const balances = [];
  
  for (let i = start; i < Math.min(start + size, total); i++) {
    balances.push({
      product: `PRODUCT_${i + 1}`,
      dossier: `DOS${String(i + 1).padStart(6, '0')}`,
      eeAmount: Math.round(Math.random() * 100000 * 100) / 100
    });
  }
  
  return balances;
}

function generateEIBalances(page = 0, size = 20) {
  const total = 100;
  const start = page * size;
  const balances = [];
  
  for (let i = start; i < Math.min(start + size, total); i++) {
    balances.push({
      product: `PRODUCT_${i + 1}`,
      dossier: `DOS${String(i + 1).padStart(6, '0')}`,
      eiAmount: Math.round(Math.random() * 100000 * 100) / 100
    });
  }
  
  return balances;
}

function generateReconciliation(page = 0, size = 20) {
  const total = 100;
  const start = page * size;
  const reconciliations = [];
  const statuses = ['OK', 'DIFFERENCE', 'MISSING_EE', 'MISSING_EI'];
  
  for (let i = start; i < Math.min(start + size, total); i++) {
    const eeAmount = Math.round(Math.random() * 100000 * 100) / 100;
    const eiAmount = Math.random() > 0.7 ? eeAmount : Math.round(Math.random() * 100000 * 100) / 100;
    
    reconciliations.push({
      product: `PRODUCT_${i + 1}`,
      dossier: `DOS${String(i + 1).padStart(6, '0')}`,
      eeAmount,
      eiAmount,
      status: eeAmount === eiAmount ? 'OK' : statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  
  return reconciliations;
}

// Filter function
function applyFilters(data, filters) {
  if (!filters || filters.length === 0) {
    return data;
  }
  
  return data.filter(item => {
    return filters.every(filter => {
      const { field, value, operator = 'equals', negate = false } = filter;
      const itemValue = item[field];
      
      if (itemValue === undefined) return !negate;
      
      let matches = false;
      
      switch (operator) {
        case 'equals':
          matches = String(itemValue).toLowerCase() === String(value).toLowerCase();
          break;
        case 'contains':
          matches = String(itemValue).toLowerCase().includes(String(value).toLowerCase());
          break;
        case 'gt':
          matches = Number(itemValue) > Number(value);
          break;
        case 'gte':
          matches = Number(itemValue) >= Number(value);
          break;
        case 'lt':
          matches = Number(itemValue) < Number(value);
          break;
        case 'lte':
          matches = Number(itemValue) <= Number(value);
          break;
        case 'ne':
          matches = String(itemValue).toLowerCase() !== String(value).toLowerCase();
          break;
        default:
          matches = String(itemValue).toLowerCase() === String(value).toLowerCase();
      }
      
      return negate ? !matches : matches;
    });
  });
}

// API endpoints
app.get('/balance/configs', (req, res) => {
  console.log('GET /balance/configs');
  
  const configs = [
    'CONFIG_PROD_01',
    'CONFIG_PROD_02',
    'CONFIG_DEV_01',
    'CONFIG_TEST_01',
    'CONFIG_UAT_01'
  ];
  
  res.json(configs);
});

app.get('/balance/ee/:configName', (req, res) => {
  const { configName } = req.params;
  const { balanceDate, page = '0', size = '20' } = req.query;
  
  console.log(`GET /balance/ee/${configName}?balanceDate=${balanceDate}&page=${page}&size=${size}`);
  
  const data = generateEEBalances(parseInt(page), parseInt(size));
  res.json(data);
});

app.get('/balance/ei/:configName', (req, res) => {
  const { configName } = req.params;
  const { balanceDate, page = '0', size = '20' } = req.query;
  
  console.log(`GET /balance/ei/${configName}?balanceDate=${balanceDate}&page=${page}&size=${size}`);
  
  const data = generateEIBalances(parseInt(page), parseInt(size));
  res.json(data);
});

app.get('/balance/reconciliation/:configName', (req, res) => {
  const { configName } = req.params;
  const { balanceDate, page = '0', size = '20' } = req.query;
  
  console.log(`GET /balance/reconciliation/${configName}?balanceDate=${balanceDate}&page=${page}&size=${size}`);
  
  const data = generateReconciliation(parseInt(page), parseInt(size));
  res.json(data);
});

// Search endpoints with filters
app.post('/balance/ee/:configName/search', (req, res) => {
  const { configName } = req.params;
  const { balanceDate, filters = [], page = 0, size = 20 } = req.body;
  
  console.log(`POST /balance/ee/${configName}/search`, { balanceDate, filters, page, size });
  
  // Generate all data first
  const allData = generateEEBalances(0, 100);
  
  // Apply filters
  const filteredData = applyFilters(allData, filters);
  
  // Apply pagination
  const start = page * size;
  const paginatedData = filteredData.slice(start, start + size);
  
  res.json(paginatedData);
});

app.post('/balance/ei/:configName/search', (req, res) => {
  const { configName } = req.params;
  const { balanceDate, filters = [], page = 0, size = 20 } = req.body;
  
  console.log(`POST /balance/ei/${configName}/search`, { balanceDate, filters, page, size });
  
  const allData = generateEIBalances(0, 100);
  const filteredData = applyFilters(allData, filters);
  const start = page * size;
  const paginatedData = filteredData.slice(start, start + size);
  
  res.json(paginatedData);
});

app.post('/balance/reconciliation/:configName/search', (req, res) => {
  const { configName } = req.params;
  const { balanceDate, filters = [], page = 0, size = 20 } = req.body;
  
  console.log(`POST /balance/reconciliation/${configName}/search`, { balanceDate, filters, page, size });
  
  const allData = generateReconciliation(0, 100);
  const filteredData = applyFilters(allData, filters);
  const start = page * size;
  const paginatedData = filteredData.slice(start, start + size);
  
  res.json(paginatedData);
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET /balance/configs`);
  console.log(`  GET /balance/ee/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`);
  console.log(`  GET /balance/ei/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`);
  console.log(`  GET /balance/reconciliation/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`);
  console.log(`  POST /balance/ee/:configName/search (with JSON body)`);
  console.log(`  POST /balance/ei/:configName/search (with JSON body)`);
  console.log(`  POST /balance/reconciliation/:configName/search (with JSON body)`);
});

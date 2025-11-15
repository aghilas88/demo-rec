const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET /balance/configs`);
  console.log(`  GET /balance/ee/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`);
  console.log(`  GET /balance/ei/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`);
  console.log(`  GET /balance/reconciliation/:configName?balanceDate=YYYY-MM-DD&page=0&size=20`);
});

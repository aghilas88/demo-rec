const fs = require('fs');
const path = require('path');

const basePath = 'c:\\dev\\bnp\\balance-explorer\\src\\app\\components';

// Rename ee-list
const eeOld = path.join(basePath, 'ee-list');
const eeNew = path.join(basePath, 'ee-balance-explorer');
if (fs.existsSync(eeOld)) {
  // Rename files first
  fs.renameSync(
    path.join(eeOld, 'ee-list.component.ts'),
    path.join(eeOld, 'ee-balance-explorer.component.ts')
  );
  fs.renameSync(
    path.join(eeOld, 'ee-list.component.html'),
    path.join(eeOld, 'ee-balance-explorer.component.html')
  );
  fs.renameSync(
    path.join(eeOld, 'ee-list.component.css'),
    path.join(eeOld, 'ee-balance-explorer.component.css')
  );
  // Rename folder
  fs.renameSync(eeOld, eeNew);
  console.log('✓ Renamed ee-list to ee-balance-explorer');
}

// Rename ei-list
const eiOld = path.join(basePath, 'ei-list');
const eiNew = path.join(basePath, 'ei-balance-explorer');
if (fs.existsSync(eiOld)) {
  // Rename files first
  fs.renameSync(
    path.join(eiOld, 'ei-list.component.ts'),
    path.join(eiOld, 'ei-balance-explorer.component.ts')
  );
  fs.renameSync(
    path.join(eiOld, 'ei-list.component.html'),
    path.join(eiOld, 'ei-balance-explorer.component.html')
  );
  fs.renameSync(
    path.join(eiOld, 'ei-list.component.css'),
    path.join(eiOld, 'ei-balance-explorer.component.css')
  );
  // Rename folder
  fs.renameSync(eiOld, eiNew);
  console.log('✓ Renamed ei-list to ei-balance-explorer');
}

// Rename reconciliation
const recOld = path.join(basePath, 'reconciliation');
const recNew = path.join(basePath, 'reconciliation-explorer');
if (fs.existsSync(recOld)) {
  // Rename files first
  fs.renameSync(
    path.join(recOld, 'reconciliation.component.ts'),
    path.join(recOld, 'reconciliation-explorer.component.ts')
  );
  fs.renameSync(
    path.join(recOld, 'reconciliation.component.html'),
    path.join(recOld, 'reconciliation-explorer.component.html')
  );
  fs.renameSync(
    path.join(recOld, 'reconciliation.component.css'),
    path.join(recOld, 'reconciliation-explorer.component.css')
  );
  // Rename folder
  fs.renameSync(recOld, recNew);
  console.log('✓ Renamed reconciliation to reconciliation-explorer');
}

console.log('\nRenommage terminé avec succès!');

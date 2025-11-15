@echo off
cd /d c:\dev\bnp\balance-explorer\src\app\components

REM Rename ee-list folder and files
git mv ee-list\ee-list.component.ts ee-list\ee-balance-explorer.component.ts
git mv ee-list\ee-list.component.html ee-list\ee-balance-explorer.component.html
git mv ee-list\ee-list.component.css ee-list\ee-balance-explorer.component.css
git mv ee-list ee-balance-explorer

REM Rename ei-list folder and files
git mv ei-list\ei-list.component.ts ei-list\ei-balance-explorer.component.ts
git mv ei-list\ei-list.component.html ei-list\ei-balance-explorer.component.html
git mv ei-list\ei-list.component.css ei-list\ei-balance-explorer.component.css
git mv ei-list ei-balance-explorer

REM Rename reconciliation folder and files
git mv reconciliation\reconciliation.component.ts reconciliation\reconciliation-explorer.component.ts
git mv reconciliation\reconciliation.component.html reconciliation\reconciliation-explorer.component.html
git mv reconciliation\reconciliation.component.css reconciliation\reconciliation-explorer.component.css
git mv reconciliation reconciliation-explorer

echo Renommage terminé!

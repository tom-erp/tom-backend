/**
 * Fix Unused Controllers in Route Files
 * Comments out unused controller requires in route files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MODULES_DIR = path.join(__dirname, '../src/modules');

function findRouteFiles() {
  const routeFiles = [];
  
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.routes.js')) {
        routeFiles.push(filePath);
      }
    }
  }
  
  walkDir(MODULES_DIR);
  return routeFiles;
}

function fixUnusedControllers() {
  const routeFiles = findRouteFiles();
  let fixedCount = 0;
  
  for (const filePath of routeFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file has controller require but no active router usage
      const hasControllerRequire = /^const\s+\w+Controller\s*=\s*require/.test(content);
      const hasActiveRouter = /^[^/]*router\.(get|post|put|delete|patch|use)/m.test(content);
      
      if (hasControllerRequire && !hasActiveRouter) {
        // Comment out the controller require
        const fixedContent = content.replace(
          /^(const\s+\w+Controller\s*=\s*require\([^)]+\);)$/m,
          '// $1'
        );
        
        fs.writeFileSync(filePath, fixedContent);
        console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
        fixedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }
  
  console.log(`\n✅ Fixed ${fixedCount} files`);
}

fixUnusedControllers();

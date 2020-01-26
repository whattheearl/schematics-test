import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    if(!tree.exists('package.json')) {
      return tree;
    }
    const pkgJson = tree.read('package.json')!.toString('utf-8');
    const pkg = JSON.parse(pkgJson);


    const version = '0.0.1';
    pkg['version'] = version;
    tree.overwrite('package.json', JSON.stringify(pkg, null, 2));
    _context.logger.log('info', 'modified version');
    return tree;
  };
}

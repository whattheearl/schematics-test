import { Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import * as ts from '../third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { insertImport, isImported, getSourceNodes } from '../utility/ast-utils';
import { Change, InsertChange } from '../utility/change';

function getSourceFile(host: Tree, path: string): ts.SourceFile {
    const buffer = host.read(path);
    if (!buffer) {
        throw new SchematicsException(`Could not find ${path}.`);
    }
    const content = buffer.toString();
    const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);

    return source;
}
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function tylerWebComponents(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const filePath = '/src/main.ts';
        let fileSource = getSourceFile(tree, filePath);

        const components = ['ButtonComponent','CardComponent','ProgressSpinnerComponent','TextFieldComponent','ToastComponent','DrawerComponent','ListComponent','ListItemComponent','LinearProgressComponent','DividerComponent','ScaffoldComponent','ToolbarComponent','SwitchComponent','ExpansionPanelComponent','AvatarComponent','SelectComponent','OmnibarComponent','OmnibarMenuButtonComponent','OmnibarProfileButtonComponent','OmnibarAppLauncherButtonComponent','TabBarComponent','ViewSwitcherComponent','ViewComponent','TableComponent','LabelValueComponent','OpenIconComponent','IconButtonComponent','BusyIndicatorComponent','CheckboxComponent']
        const pkg = "@tylertech/tyler-components-web";

        components.forEach(c => {
            if (!isImported(fileSource, c, pkg)) {
                const recorder = tree.beginUpdate(filePath);
                const importChange = insertImport(fileSource, filePath, c, pkg) as InsertChange;
                if (importChange.toAdd) {
                    recorder.insertLeft(importChange.pos, importChange.toAdd);
                }
                tree.commitUpdate(recorder);
            }
        })
        return tree;
    };
}

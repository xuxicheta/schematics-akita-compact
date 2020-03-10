import { Rule, SchematicContext, Tree, url, apply, template, mergeWith, move } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
import { getDefaultPath } from '../_helpers/get-default-path.helper';


interface Schema {
  name: string;
  project?: string;
  path?: string;
}

export function store(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options.path = options.path || getDefaultPath(tree, options);

    const sourceParametrizedTemplates = apply(url('./files'), [
      template({
        ...options,
        ...strings,
      }),
      move(normalize(options.path))
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, context);
  };
}



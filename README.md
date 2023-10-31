
## Development
- `mkdir dev_dir && cd dev_dir`
- Init `projen`
  ```bash
  npx projen new awscdk-construct
  ```
- Edit `.projenrc.ts` to install `codegen`
  ```typescript
   deps: [
      'constructs',
      'graphql',
   ],
   devDeps: [
      'esbuild',
      'constructs',
      '@graphql-codegen/cli',
      'typescript',
      '@graphql-codegen/introspection',
      '@graphql-codegen/client-preset',
   ],
  ```
  ```typescript
  project?.addScripts({
    codegen: 'graphql-codegen --config codegen.ts',
  });
  project?.eslint?.addIgnorePattern('codegen.ts');
  project?.tsconfigDev.addInclude('codegen.ts');
  ```
- Run `projen` (*NOTE:*  Do this every time `.projenrc.ts` is edited!)
  ```bash
  npx projen
  ```
- Copy/move/create the GraphQL docs into the project. `src/docs/` is nice.
- Init `codegen`
  1. From the generator if you like. _BEWARE_ `projen` replaces _everything_ other than `codegen.ts`
     ```bash
     npx graphql-code-generator init
     ```
  2. OR copy and edit an existing `codegen.ts`


- Edit `codegen.ts` to suit
- Run `codegen`
  ```bash
  npm run codegen
  ```

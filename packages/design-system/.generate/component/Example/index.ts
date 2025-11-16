const component = (name: string) => `import { ${name} } from './${name}';

export { ${name} };
`;

export { component };

import fs from 'fs';
import path from 'path';

const [name] = process.argv.slice(2);
if (!name) throw new Error('You must include a component name');

const dir = path.resolve('./src/components', `./${name}/`);
if (fs.existsSync(dir)) throw new Error('A component with that name already exists');

fs.mkdirSync(dir);

const componentDir = path.resolve('./.generate/component', './Example');

fs.readdir(componentDir, (err, filelist) => {
  filelist.forEach(async (file) => {
    let filename = '';

    if (file === 'index.ts') filename = file;
    else filename = [name, ...file.split('.').slice(1)].join('.');

    let content = '';

    const extension = file.split('.')[file.split('.').length - 1];
    if (extension !== 'scss') {
      const { component } = await import(path.resolve(componentDir, file));

      content = component(name);
    }

    fs.writeFile(`${dir}/${filename}`, content, (err) => {
      if (err) throw err;
    });
  });
});

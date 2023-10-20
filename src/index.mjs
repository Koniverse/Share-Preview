import  fs from 'fs-extra';
import  pug from 'pug';
import fetch from 'node-fetch';

const PAGE_LIST_URL = 'https://content.subwallet.app/api/list/share-preview'

async function main() {
    const pages = await fetch(PAGE_LIST_URL).then(res => res.json())
    // Write output HTML to files
    fs.emptyDirSync('build');
    fs.mkdirSync('build', {recursive: true});

    pages.forEach((params, index) => {
      const {slug, title} = params;
      const html = pug.renderFile('src/templates/webapp.pug', {...params})
      const filename = `${slug}.html`;
      fs.writeFileSync(`build/${filename}`, html);
    });
}


main();
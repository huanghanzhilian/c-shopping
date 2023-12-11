module.exports = {
  // Lint then format TypeScript and JavaScript files
  '/**/*.(ts|tsx|js)': filenames => [
    `eslint --fix ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '/**/*.(md|json)': filenames => `prettier --write ${filenames.join(' ')}`,
}

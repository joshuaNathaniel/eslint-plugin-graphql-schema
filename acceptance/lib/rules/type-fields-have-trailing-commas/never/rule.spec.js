const fs = require('fs');
const path = require('path');
const {spawn} = require("child_process");

describe('type-fields-have-trailing-commas never', () => {
  it('should throw an error', (done) => {
    const config = path.join(process.cwd(), 'lib','rules', 'type-fields-have-trailing-commas', 'never', '.eslintrc');
    let message = '';
    const pwd = path.join(process.cwd(), 'node_modules', '.bin', 'eslint')
    const eslint = spawn(pwd, ['--no-eslintrc', '-c', config, '--ext', '.graphql', './lib/rules/type-fields-have-trailing-commas/never']);

    eslint.stdout.on('data', (data) => {
      message += data;
    });

    eslint.on('close', () => {
      try {
        expect(message).toContain('The field `TrailingComma.withComma` has a trailing comma');
        expect(message).toContain('The field `TrailingComma.withCommaEnd` has a trailing comma');
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it('should fix and throw no error', (done) => {
    const config = path.join(process.cwd(), 'lib','rules', 'type-fields-have-trailing-commas', 'never', '.eslintrc');
    let message = '';
    const pwd = path.join(process.cwd(), 'node_modules', '.bin', 'eslint')
    const eslint = spawn(pwd, ['--no-eslintrc', '-c', config, '--ext', '.graphql', '--fix', './lib/rules/type-fields-have-trailing-commas/never']);

    eslint.stdout.on('data', (data) => {
      message += data;
    });

    eslint.on('close', () => {
      const schema = path.join(process.cwd(), 'lib','rules', 'type-fields-have-trailing-commas', 'never', 'schema.graphql');
      fs.readFile(schema, (err, data) => {
        try {
          const fixed = data.toString();
          expect(fixed).toStrictEqual('type TrailingComma {\n'
              + '  withComma: String\n'
              + '  withCommaEnd: String\n'
              + '}\n');
          done();
        } catch (error) {
          done(error);
        }
      })
    });
  });
});

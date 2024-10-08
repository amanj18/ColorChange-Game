const { execSync } = require('child_process');

(async () => {
  const chalk = (await import('chalk')).default;

  // Get the environment variable
  const env = process.env.npm_config_env;

  const log = console.log;

  if (!env) {
    log(chalk.red('Error: Environment is not specified. Use --env to specify the environment.'));
    process.exit(1);
  }

  const bucketName = `si-${env}-assets/static-assets/`;
  const profile = 'default';

  const command = `aws s3 cp ./dist s3://${bucketName} --profile ${profile} --recursive`;

  try {
    execSync(command, { stdio: 'inherit' });
    log(chalk.greenBright(`Successfully deployed to ${env} environment.`));
  } catch (error) {
    log(chalk.redBright(`Error deploying to ${env} environment:`), error);
  }
})();

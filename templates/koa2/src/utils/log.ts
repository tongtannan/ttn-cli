import chalk from 'chalk';

export const log = {
  info: (text: string, ...rest: any[]) => console.log(chalk.green([text]), ...rest),
  warn: (text: string, ...rest: any[]) => console.log(chalk.yellow([text]), ...rest),
  error: (text: string, ...rest: any[]) => console.log(chalk.red([text]), ...rest),
};

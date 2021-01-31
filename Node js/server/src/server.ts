import chalk from 'chalk';
import expressStatusMonitor from 'express-status-monitor';

import { app } from './app';
import sequelize from './db';

const server = sequelize.sync().then(() => {
  app.listen(app.get('port'), () => {
    console.log(
      '%s App is running at http://localhost:%d in %s mode',
      chalk.green('✓'),
      app.get('port'),
      app.get('env'),
    );
    console.log('  Press CTRL-C to stop\n');
  });
});

// Web sockets setup
const io = require('socket.io')(server);

// Status monitor uses it's own socket.io instance by default, so we need to
// pass our instance as a parameter else it will throw errors on client side
app.use(expressStatusMonitor({ websocket: io, port: app.get('port') } as any));

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import { welcomeController } from './controllers';

import { handle404Errors } from './middlewares/handleErrors';
import { IMessage } from './models/IMessage';

const app: express.Application = express();
const PORT: number = 3000 || process.env.PORT;
const server = http.createServer(app);
const users = {} as any;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', welcomeController);
app.use(handle404Errors);

const io: SocketIO.Server = SocketIO(server);

io.on('connection', (socket: any) => {
    console.info(socket);
    io.of('privatechat').on('connection', (socket: any) => {
        console.log('private chat');
        const updateNickNames = (io: any) => {
            io.of('privatechat').emit('usernames', Object.keys(users));
        };
        socket.on('new user', (data: any) => {
            console.log(data);
            if (data in users) {
                return;
            } else {
                socket.nickName = data;
                users[socket.nickName] = socket;
                updateNickNames(io);
            }
        });

        socket.on('sendmessage', (data: IMessage) => {
            console.log(data, 86);
            if (data.nickname in users) {
                // io.of('privatechat').emit('new message', { message: data, nickname: socket.nickname });
                console.log('im emitted');
                users[data.nickname].emit('new message', { message: data, nickname: socket.nickname });
            }
        });

        socket.on('disconnectsocket', (data: any) => {
            if (!socket.nickName) {
                return;
            }
            delete users[socket.nickName];
            updateNickNames(io);
        });

    });
});
server.listen(PORT, () => {
    console.log(`server started! Listening on ${PORT}`);
});

export const chatServer: express.Application = app;

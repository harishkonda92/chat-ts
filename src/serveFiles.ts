import express, { Express } from 'express';
import { join } from 'path';

export const serveFiles = (app: Express) => {
    const publicPath = join(process.cwd(), 'public');
    app.use(express.static(publicPath));
};

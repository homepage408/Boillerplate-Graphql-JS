import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '3mb' }));

app.use(cors());

app.disable('x-powered-by');
app.use((_, res, next) => {
    res.setHeader("Content-Security-Policy", "style-src 'unsafe-inline'; style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com");
    next();
})

export default app
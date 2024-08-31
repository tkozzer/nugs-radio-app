import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCurrentSong } from './controllers/songController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Fetch the production URL from environment variables
const prodUrl = process.env.PROD_URL || '';

console.log("prodUrl", prodUrl);

const corsOptions = {
    origin: function (origin, callback) {
        console.log("Request origin:", origin);
        if (process.env.NODE_ENV !== 'production') {
            // In development, allow all origins
            callback(null, true);
        } else {
            // In production, use the allowed origins list
            const allowedOrigins = [prodUrl, 'http://localhost:5173', 'http://localhost:3000'];
            if (!origin || allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// API routes
app.get('/api/current-song', getCurrentSong);

if (process.env.NODE_ENV === 'production') {
    // Serve static files from the Vue app build directory in production
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Handle any requests that don't match the ones above
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
} else {
    // In development, we'll proxy requests to the Vue dev server
    const { createProxyMiddleware } = await import('http-proxy-middleware');
    app.use('/', createProxyMiddleware({
        target: 'http://localhost:5173',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug'
    }));
}

// Start the server
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${port}`);
});

import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import categoryRoutes from './routes/category';
import userRoutes from './routes/user';
import packageRoutes from './routes/package';
import reviewRoutes from './routes/review';
import staffRoutes from './routes/staff';
import bookingRoutes from './routes/booking';

const NAMESPACE = 'Server';
const router = express();

/** Connect to MONGO **/ 
mongoose.connect(config.mongo.url, config.mongo.options)
    .then(result => {
        logging.info(NAMESPACE, "Connected to MongoDB!");
    }).catch(error => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })
    
    next();
});

/** Parse the body of the request */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

// Upload Files Setup
router.use(express.static("./source/images"));
// Note:- Simply save ( req.file/files.filename ) into the database and then get the file with URL:- http://localhost:1337/filename

/** Routes go here */
router.use('/api/categories', categoryRoutes);
router.use('/api/users', userRoutes);
router.use('/api/packages', packageRoutes);
router.use('/api/reviews', reviewRoutes);
router.use('/api/staff', staffRoutes);
router.use('/api/bookings', bookingRoutes)

// Simple Root Message
router.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Welcome to R1 Mobile</title></head>");
    res.write("<body><h4>Welcome to R1 Backend API's</h4></body>");
    res.write("</html>");
    return res.end(); 
});

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db';
import RegisterRouter from './routes/register';
import UtilsRouter from './routes/utils';
import SettingsRouter from './routes/settings';
import ProductsRouter from './routes/products';
import AlertRouter from './routes/alert';
import { app } from './server';

dotenv.config();
connectDB();

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

// Routes
app.use(RegisterRouter);
app.use(UtilsRouter);
app.use(SettingsRouter);
app.use(ProductsRouter);
app.use(AlertRouter);

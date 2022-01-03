import express from 'express';
import api from '../index';
import { TemplateAPI } from './TemplateAPI';

const router: express.Router = express.Router({ mergeParams: true });

router.get('/test', api.http(TemplateAPI.test));

export const V1Router = router;

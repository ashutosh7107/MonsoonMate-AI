import { Router } from 'express';
import { generatePlan } from '../controllers/preparednessController';

export const preparednessRouter = Router();

preparednessRouter.post('/generate-plan', generatePlan);

import express from 'express';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router();

routes.post('/feedbacks', async (request, response) => {
	const { type, comment, screenshot } = request.body;

	const PrismaFeedbackRepository = new PrismaFeedbacksRepository();
	const nodemailerMailAdapter = new NodeMailerMailAdapter();

	const submitFeedbackUseCase = new SubmitFeedbackUseCase(PrismaFeedbackRepository, nodemailerMailAdapter);

	await submitFeedbackUseCase.execute({ type: type, comment: comment, screenshot: screenshot });

	return response.status(201).send();
});

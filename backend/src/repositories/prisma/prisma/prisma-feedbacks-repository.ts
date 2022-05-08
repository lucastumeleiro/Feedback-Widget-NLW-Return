import { prisma } from '../../../prisma';
import { FeedbacksCreateData, FeedbacksRepository } from '../../Feedbacks-Repository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
	async create(data: FeedbacksCreateData) {
		const { type, comment, screenshot } = data;

		await prisma.feedback.create({
			data: {
				type: type,
				comment: comment,
				screenshot: screenshot,
			},
		});
	}
}

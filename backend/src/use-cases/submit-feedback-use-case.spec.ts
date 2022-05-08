import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase({ create: createFeedbackSpy }, { sendMail: sendMailSpy });

describe('Submit Feedback', () => {
	it('should be able to submit a feedback', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'example comment',
				screenshot: 'data:image/png;base64...qualquercoisa',
			})
		).resolves.not.toThrow();
	});

	it('should not be able to submit feedback without type', async () => {
		await expect(
			submitFeedback.execute({
				type: '',
				comment: 'example comment',
				screenshot: 'data:image/png;base64...qualquercoisa',
			})
		).rejects.toThrow();
	});

	it('should not be able to submit feedback without comment', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: '',
				screenshot: 'data:image/png;base64...qualquercoisa',
			})
		).rejects.toThrow();
	});

	it('should not be able to submit feedback with an invalid screenshot', async () => {
		await expect(
			submitFeedback.execute({
				type: 'BUG',
				comment: 'example comment',
				screenshot: 'test.png',
			})
		).rejects.toThrow();
	});
});

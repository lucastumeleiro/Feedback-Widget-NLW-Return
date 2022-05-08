import { FormEvent, useState } from 'react'
import { ArrowLeft } from 'phosphor-react'

import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from '../ScreenshotButton'
import { api } from '../../../lib/api'
import { Loading } from '../../Loading'

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    handleRestartFeedback: () => void
    onFeedbackSent: () => void
}

export function FeedbackContentStep(props: FeedbackContentStepProps) {
    const { feedbackType, handleRestartFeedback, onFeedbackSent } = props
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault()

        setIsSendingFeedback(true)

        await api.post('/feedbacks', {
            type: feedbackType,
            comment: comment,
            screenshot: screenshot,
        })

        setIsSendingFeedback(false)
        onFeedbackSent()
    }

    return (
        <>
            <header className="flex items-center justify-center">
                <button
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 p-1"
                    type="button"
                    onClick={handleRestartFeedback}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4" />
                </button>

                <div className="text-xl p-1 leading-6 flex items-center gap-2">
                    <img
                        className="w-6 h-6"
                        src={feedbackTypeInfo.image.source}
                        alt={feedbackTypeInfo.image.alt}
                    />
                    {feedbackTypeInfo.title}
                </div>
                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm
                        placeholder-zinc-400 text-zinc-100 border-zinc-600
                        bg-transparent rounded-md
                        focus:border-brand-500 focus:ring-brand-500 focus:ring-1
                        focus:outline-none resize-none
                        scrollbar-thin scrollbar-thumb-zinc-700
                        scrollbar-track-transparent "
                    placeholder='Conte com detalhes o que está acontecendo...'
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="min-w-[304px] w-full flex gap-2 my-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        setScreenshot={setScreenshot}
                    />

                    <button
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1
                        flex justify-center items-center text-sm hover:bg-brand-300
                        focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
                        disabled:opacity-50 disabled:hover:bg-brand-500"
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                    </button>
                </footer>

            </form>
        </>
    )
}
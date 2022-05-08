import { CloseButton } from "../../CloseButton";
import SuccessImageUrl from '../../../assets/success.svg'

interface FeedbackSucessStepProps {
    handleRestartFeedback: () => void
}

export function FeedbackSucessStep(props: FeedbackSucessStepProps) {
    const { handleRestartFeedback } = props
    return (
        <>
            <header>
                <CloseButton />
            </header>

            <div className="flex flex-col items-center py-10 w-[304px]">
                <img
                    className="w-6 h-6"
                    src={SuccessImageUrl}
                    alt='imagem sucesso'
                />

                <span className="text-xl mt-2">Agradecemos o feedback!</span>

                <button
                    className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent
                        text-sm leading-6 hover:bg-zinc-700 focus:border-brand-500 
                        focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none"
                    onClick={handleRestartFeedback}
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    )
}
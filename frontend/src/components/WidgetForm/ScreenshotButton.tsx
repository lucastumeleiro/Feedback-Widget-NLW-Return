import { useState } from 'react'
import { Camera, Trash } from 'phosphor-react'
import html2canvas from 'html2canvas'

import { Loading } from '../Loading'

interface ScreenshotButtonProps {
    screenshot: string | null
    setScreenshot: (screenshot: string | null) => void
}

export function ScreenshotButton(props: ScreenshotButtonProps) {
    const { screenshot, setScreenshot } = props
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true)

        const canvas = await html2canvas(document.querySelector('html')!)
        const base64Image = canvas.toDataURL('image/png')

        setScreenshot(base64Image)
        setIsTakingScreenshot(false)
    }
    if (screenshot) {
        return (
            <button
                className="p-1 w-10 h-10 rounded-md border-transparent
                    flex justify-end items-end text-zinc-400
                    hover:text-zinc-100 transition-colors"
                type="button"
                style={{ backgroundImage: `url(${screenshot})` }}
                onClick={() => setScreenshot(null)}
            >
                <Trash weight='fill' />
            </button>
        )
    }

    return (
        <button
            className="p-2 bg-zinc-800 rounded-md
                            border-transparent hover:bg-zinc-700 transition-colors
                            focus:outline-none focus:ring-2 focus:ring-offset-2 
                            focus:ring-offset-zinc-900 focus:ring-brand-500"
            type="button"
            onClick={handleTakeScreenshot}
        >
            {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
        </button>
    )
}
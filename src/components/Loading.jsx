/* eslint-disable react/prop-types */

export default function Loading({ className, text, width, height }) {
    return (
        <>
            <div className={`${className} w-full z-50 flex flex-col gap-3 justify-center items-center py-10 `} >
                <div className={`animate-spin`} style={{ width: width ?? 84, height: height ?? 84 }}>
                    <div className="h-full w-full border-4 border-t-violet-500 border-b-violet-700 rounded-full">
                    </div>
                </div>
                {text && <p className="text-2xl text-center text-violet-600">{text}</p>}
            </div>
        </>
    )
}

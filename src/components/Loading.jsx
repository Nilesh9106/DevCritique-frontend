/* eslint-disable react/prop-types */

export default function Loading({ className }) {
    return (
        <div className={`${className} w-full z-50 flex justify-center items-center py-10 `} >
            <div className={`animate-spin w-20 h-20`}>
                <div className="h-full w-full border-4 border-t-violet-500 border-b-violet-700 rounded-full">
                </div>
            </div>
        </div>
    )
}

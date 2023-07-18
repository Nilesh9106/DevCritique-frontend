
export default function Loading() {
    return (
        <div className="w-full absolute top-0 flex justify-center items-center h-[100vh] backdrop-blur-sm">
            <div className="animate-spin w-24 h-24">
                <div className="h-full w-full border-4 border-t-emerald-500 border-b-emerald-700 rounded-full">
                </div>
            </div>
        </div>
    )
}

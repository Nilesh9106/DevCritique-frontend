
export default function Loading() {
    return (
        <div className="w-full z-50 fixed top-0 flex justify-center items-center h-[100vh] bg-neutral-200 dark:bg-neutral-900" >
            <div className="animate-spin w-24 h-24">
                <div className="h-full w-full border-4 border-t-violet-500 border-b-violet-700 rounded-full">
                </div>
            </div>
        </div>
    )
}

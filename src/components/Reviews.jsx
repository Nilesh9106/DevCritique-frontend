/* eslint-disable react/prop-types */
import Review from "./Review"

export default function Reviews({ reviews, setReviews }) {
    return (
        <div className='w-full flex flex-col gap-2'>
            {reviews.length == 0 ?
                <p className="text-center text-violet-600 text-2xl"> No review yet!!</p>
                :
                reviews.map((review, index) => {
                    // console.log(project);
                    return <Review key={index} {...review} onDelete={() => {
                        reviews.splice(index, 1);
                        setReviews([...reviews]);
                    }} />
                })}
        </div>
    )
}

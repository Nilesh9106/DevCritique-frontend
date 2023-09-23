import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [isMailSent, setMailSent] = useState(false)

	const sendEmail = async (e) => {
		e.preventDefault();
		setLoading(true)
		if (email === '' || !email.includes('@') || !email.includes('.')) {
			toast.error("Invalid Email")
			setLoading(false)
			return
		}
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/forgot-password/${email}`)
		if (200 === response.status) {
			toast.success("Email Sent Successfully")
			setMailSent(true)
			setLoading(false)
		}
		else {
			toast.error(response.data.message)
			setLoading(false)
		}
	}

	return (
		<>
			<Helmet>
				<title>Devcritique | Forgot Password</title>
			</Helmet>
			{loading && <Loading className={'dark:bg-neutral-900/30 bg-neutral-100/30 h-[100vh] fixed top-0 backdrop-blur-[1px]'} text={"Loading"} />}
			{!loading && isMailSent &&   
				<div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'> 
					<p className="text-center text-xl my-2">Check your email for the reset link</p> 
				</div>
			}
			{!loading &&
				<div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
					<h1 className="text-center text-4xl my-2">Forgot Password</h1>
					<form className="flex flex-col  justify-center" onSubmit={(e) => sendEmail(e)}>

						<input required type="text" onChange={(e) => { setEmail(e.target.value) }}
							placeholder="Email" name="email" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />
						<button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >Submit</button>
					</form>
				</div>
			}
		</>
	)
}

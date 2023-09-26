import axios from "axios";
import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
	const [loading, setLoading] = useState(false)
	const [password, setPassword] = useState('')
	const [isValidString, setValidString] = useState(false)
	const [confirmPassword, setConfirmPassword] = useState('')
	const navigate = useNavigate();
	const { uniqueString } = useParams();

	const savePassword = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords does not match")
			return;
		}
		try {
			await toast.promise(axios.post(`${import.meta.env.VITE_API_URL}/api/reset-password`, { password, uniqueString }), {
				pending: 'Resetting Password',
				success: 'Password Reset Successfully',
			});

			navigate('/login')

		} catch (error) {
			toast.error(error.response.data.message)
		}

	}
	const checkValidString = useCallback(async () => {
		setLoading(true)
		try {
			await axios.get(`${import.meta.env.VITE_API_URL}/api/is-valid-link/${uniqueString}`)
			setValidString(true)
		} catch (error) {
			setValidString(false)
			if (error.response) {
				toast.error(error.response.data.message)
			}
		}
		setLoading(false)
	}, [])
	useEffect(() => {
		checkValidString()
	}, [])

	return (
		<>
			<Helmet>
				<title>Devcritique | Reset Password</title>
			</Helmet>
			{loading && <Loading className={'dark:bg-neutral-900/30 bg-neutral-100/30 h-[100vh] fixed top-0 backdrop-blur-[1px]'} text={"Loading"} />}

			{!loading && isValidString &&
				<div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
					<h1 className="text-center text-4xl my-2">Reset Password</h1>
					<form className="flex flex-col  justify-center" onSubmit={(e) => savePassword(e)}>

						<input required type="password" onChange={(e) => { setPassword(e.target.value) }}
							placeholder="New Password" name="password" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />
						<input required type="password" placeholder="confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }}
							name="confirmpassword" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />
						<button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >Submit</button>
					</form>
				</div>
			}
		</>
	)
}

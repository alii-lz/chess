import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            // Placeholder auth flow
            await new Promise((r) => setTimeout(r, 600));
            navigate("/");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen bg-black text-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700'>
                <h1 className='text-2xl font-semibold text-white text-center'>Welcome back</h1>
                <p className='text-gray-400 text-center mt-1'>Sign in to continue</p>

                <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email' className='block text-sm text-gray-300'>Email</label>
                        <input
                            id='email'
                            type='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-2 w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                            placeholder='you@example.com'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block text-sm text-gray-300'>Password</label>
                        <input
                            id='password'
                            type='password'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-2 w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                            placeholder='••••••••'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? "Signing in…" : "Sign in"}
                    </button>
                </form>

                <p className='text-center text-sm text-gray-400 mt-4'>
                    New here? <Link to='/signup' className='text-white underline underline-offset-4'>Create an account</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;



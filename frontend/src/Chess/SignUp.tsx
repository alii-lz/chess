import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setIsSubmitting(true);
        try {
            // Placeholder signup flow
            await new Promise((r) => setTimeout(r, 800));
            navigate("/login");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='min-h-screen bg-black text-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700'>
                <h1 className='text-2xl font-semibold text-white text-center'>Create account</h1>
                <p className='text-gray-400 text-center mt-1'>Join the game</p>

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

                    <div>
                        <label htmlFor='confirm' className='block text-sm text-gray-300'>Confirm password</label>
                        <input
                            id='confirm'
                            type='password'
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='mt-2 w-full p-3 rounded-lg bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
                            placeholder='••••••••'
                        />
                    </div>

                    {error && (
                        <div className='text-red-400 text-sm'>{error}</div>
                    )}

                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isSubmitting ? "Creating account…" : "Create account"}
                    </button>
                </form>

                <p className='text-center text-sm text-gray-400 mt-4'>
                    Already have an account? <Link to='/login' className='text-white underline underline-offset-4'>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;



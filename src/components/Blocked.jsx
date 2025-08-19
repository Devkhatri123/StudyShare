import Navbar from "./Navbar";

export default function Blocked() {
    return (
        <>
        <Navbar/>
        <main className="grid h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-400">403</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Your Account is Blocked</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, Your account is blocked, Contact Admin</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#" className="text-sm font-semibold text-white">Contact support <span aria-hidden="true">&rarr;</span> khatridev318@gmail.com</a>
                </div>
            </div>
        </main>
        </>
    )
}
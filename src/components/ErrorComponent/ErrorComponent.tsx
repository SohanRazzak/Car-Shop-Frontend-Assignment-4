const ErrorComponent = () => {
    return (
        <div className="h-screen w-full grid place-items-center text-3xl">
        <div className="flex flex-col items-center justify-center space-y-8">
        <span className="loading loading-bars loading-xl"></span>
        <p>Sorry! Something Went Wrong.</p>
        </div>
    </div>
    );
};

export default ErrorComponent;
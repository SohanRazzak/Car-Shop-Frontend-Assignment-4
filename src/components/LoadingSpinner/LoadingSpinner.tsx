const LoadingSpinner = () => {
    return (
        <div className="h-[calc(100vh-120px)] w-full grid place-items-center text-3xl">
        <span className="loading loading-bars loading-xl"></span>
    </div>
    );
};

export default LoadingSpinner;
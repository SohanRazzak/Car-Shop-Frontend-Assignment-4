import RefreshButton from "../RefreshButton/RefreshButton";

const ErrorComponent = ({ refetch = null }: { refetch: undefined | null | (() => void) }) => {
    return (
        <div className="h-[calc(100vh-120px)] w-full grid place-items-center text-3xl">
            <div className="flex flex-col items-center justify-center space-y-8">
                <span className="loading loading-bars loading-xl"></span>
                <p className="text-center px-4">Sorry! Something Went Wrong.</p>
                {refetch && <RefreshButton title="Try Refreshing!" refetch={refetch} />}
            </div>
        </div>
    );
};

export default ErrorComponent;

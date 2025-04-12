type Props = { title: string; refetch: (() => void) | null | undefined};

const RefreshButton = ({ title, refetch = null}: Props) => {
    return (
        <button
            className="btn btn-neutral uppercase"
            onClick={() => {
                if (refetch) refetch();
            }}
        >
            {title}
        </button>
    );
};

export default RefreshButton;

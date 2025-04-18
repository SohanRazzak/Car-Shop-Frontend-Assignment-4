import { Link } from "react-router";

type Props<T> = {
    title: string;
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    viewAllLink: string;
    maxItems?: number;
};

const RecentActivityCard = <T,>({
    title,
    items,
    renderItem,
    viewAllLink,
    maxItems = 5,
}: Props<T>) => {
    const displayedItems = items.slice(0, maxItems);

    return (
        <div className="card bg-base-100 shadow">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="space-y-4">
                    {displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-base-200 rounded transition-colors"
                            >
                                {renderItem(item)}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">
                            No items found
                        </div>
                    )}
                </div>
                
                    <div className="card-actions justify-end mt-auto">
                        <Link
                            to={viewAllLink}
                            className="btn btn-sm btn-accent text-white uppercase"
                        >
                            View All
                        </Link>
                    </div>
            </div>
        </div>
    );
};

export default RecentActivityCard;

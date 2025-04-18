import { Link } from "react-router";

interface Props {
    title: string;
    value: string | number;
    link?: string;
}

const InfoCard = ({ title, value, link }: Props) => {
    const content = (
        <div className="card bg-base-100 shadow hover:shadow-lg transition-shadow h-full">
            <div className="card-body">
                <h2 className="card-title text-lg">{title}</h2>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{value}</span>
                    {link && <span className="badge badge-accent text-white">View</span>}
                </div>
            </div>
        </div>
    );

    return link ? <Link to={link}>{content}</Link> : content;
};

export default InfoCard;

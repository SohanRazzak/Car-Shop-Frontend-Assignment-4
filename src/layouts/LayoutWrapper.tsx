import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const LayoutWrapper = ({children}: Props) => {
    return (
        <div className="max-w-7xl mx-auto px-2">
            {
                children
            }
        </div>
    );
};

export default LayoutWrapper;
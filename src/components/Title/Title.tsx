type Props = {
    title: string
}

const Title = ({title}: Props) => {
    return (
        <title>
            {'MotorHive - ' + title}
        </title>
    );
};

export default Title;
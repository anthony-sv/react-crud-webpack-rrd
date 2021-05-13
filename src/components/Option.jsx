const Option = ({ image, foot }) => {
    return (
        <>
            <img src={image} alt={foot} />
            <p>{foot}</p>
        </>
    );
};

export default Option;

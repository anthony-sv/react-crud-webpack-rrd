const Option = ({ image, foot }) => {
    return (
        <>
            <div style={{display: "block"}}>
                <img src={image} alt={foot} />
                <p>{foot}</p>
            </div>
        </>
    );
};

export default Option;

const loadImage = (el) => {
    if (el.previewImg) {
        return (
            <img className="all-spots-images" src={`${el.previewImg}`} alt={`${el.name}`} />
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }
}

export default loadImage

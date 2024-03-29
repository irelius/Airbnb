const loadImage = (el) => {
    if (el.previewImg) {
        return (
            <img className="spot-image" src={`${el.previewImg}`} alt={`${el.name}`} />
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

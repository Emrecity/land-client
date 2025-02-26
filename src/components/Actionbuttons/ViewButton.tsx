type buttonProps = {
    handleClick: () => void,
    title?: string
}
const ViewButton = ({ handleClick, title }: buttonProps) => {
    return (
        <button className="text-green-400 hover:text-green-600 w-auto btn rounded-md" onClick={handleClick} title={title ?? "view"}>
            <div className="group relative">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
	                className="w-6 h-6" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                <path fill="none" stroke="currentColor" stroke-width="4" stroke-miterlimit="10" d="M1,32c0,0,11,15,31,15s31-15,31-15S52,17,32,17
	S1,32,1,32z"/>
                <circle fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" cx="32" cy="32" r="7"/>
            </svg>
            </div>
        </button>
    )
}

export default ViewButton
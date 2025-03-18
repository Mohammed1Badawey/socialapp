import loadingSVG from "../../../src/assets/loading1.svg"
const Loading = () => {
  return (
    <div className="flex justify-center w-full animate-spin">
        <img src={loadingSVG} alt="loadingSVG"
        width={24}
        height={24}
        
        />
    </div>
  )
}

export default Loading
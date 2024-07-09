import { useSelector } from "react-redux";
import { selectLoadingState } from "../../app/features/loadingSlice";

export default function LoadingBar() {
    const loading = useSelector(selectLoadingState);

    return (
        <div
            className="fixed-top top-0 vw-100"
            style={{ height: "2px", background: loading ? "#a19d9d" : "transparent" }}
        >
            {loading && (
                <div id="loading-bar" className="h-100 w-25 bg-primary"></div>
            )}
        </div>
    );
}

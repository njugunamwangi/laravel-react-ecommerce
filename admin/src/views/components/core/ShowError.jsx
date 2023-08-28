import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function ShowError() {
    const {error} = useStateContext()

    return (
        <>
            {
                error.show && (
                    <div className="w-[300px] py-2 px-3 text-white rounded bg-red-500 fixed right-2 bottom-2 z-50 animate-fade-in-down">
                        {error.message}
                    </div>
                )
            }
        </>
    )
}

import { useEffect, useState } from "react";
const useInternetConnection = () => {

    // No Internet Scenario
    const [internetState, setInternetState] = useState("");

    useEffect(() => {
        function handleInternetConnection(e) {
            if (e.type === "online") {
                // Remove overlay if internet is back before time is up
                setInternetState("");
            } else {
                setInternetState(e.type);
            }
        }

        window.addEventListener("online", handleInternetConnection);
        window.addEventListener("offline", handleInternetConnection);

        return () => {
            window.removeEventListener("online", handleInternetConnection);
            window.removeEventListener("offline", handleInternetConnection);
        };
    }, []);

    return {
        internetState
    }

}

export { useInternetConnection }
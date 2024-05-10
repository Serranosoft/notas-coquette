import { router } from "expo-router";
import useBackHandler from "../components/use-back-handler";
import HeaderSettings from "./header-settings";

export default function HeaderSettingsContainer({ forceHome }) {

    useBackHandler(() => {
        if (forceHome) {
            router.push("/");
            return true;
        } else {
            router.back();
            return true;
        }
    });

    return (
        <HeaderSettings {...{ forceHome }}/>
    )
}
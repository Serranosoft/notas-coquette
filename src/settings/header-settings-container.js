import { router } from "expo-router";
import useBackHandler from "../components/use-back-handler";
import HeaderSettings from "./header-settings";

export default function HeaderSettingsContainer({ forceHome }) {

    useBackHandler(() => {
        router.back();
        return true;
    });

    return (
        <HeaderSettings {...{ forceHome }}/>
    )
}
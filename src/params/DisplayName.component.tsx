import React from "react";
import { View, Text } from "react-native";
import {AuthContainer, UsersContainer} from "../Provider.component";


export function DisplayNameComponent() {

    /**
     * Get current user from the container
     * @type {UsersContainer}
     */
    const authContainer = AuthContainer.useContainer();
    const user = authContainer.authenticatedUser;


    return (
        <View>
            <Text>Votre nom d'affichage actuel : {user?.name}</Text>
        </View>
    )
}



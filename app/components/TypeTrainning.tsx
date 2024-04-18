import { useState } from "react";
import { View } from "react-native";

export const TypeTrainning = () =>{
    interface Type {
        ab:string;
        abc: string;
        abcd:string;
        abcde:string;
        abcdef:string;
    }

    const [type, setType] = useState<Type>()

    return (
        <View>
            
        </View>
    );
}
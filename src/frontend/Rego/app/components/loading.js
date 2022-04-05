import * as React from 'react';
import {
	View,
	Animated,
	Text
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function Loading(props) {
	const anim = React.useRef(new Animated.Value(1));
	React.useEffect(() => {
		// makes the sequence loop
		Animated.loop(
			// runs given animations in a sequence
			Animated.sequence([
				// increase size
				Animated.timing(anim.current, {
					toValue: 3,
					duration: 2000,
					useNativeDriver: true,
				}),
				// decrease size
				Animated.timing(anim.current, {
					toValue: 1,
					duration: 2000,
					useNativeDriver: true,
				}),
			]),
		).start();
	}, []);

	return (
		<View
			style={{
				// backgroundColor: '#fff',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}>
			<Animated.View
				style={{transform: [{scale: anim.current}], alignItems: 'center'}}>
				<Ionicons name="book" size={70} color={'#ff0092'} />
				{props.waitText ? (
					<Text
						style={{
							fontSize: 15,
							fontFamily: props.app.fonts.bold,
							color: '#fff',
						}}>
						{props.waitText}
					</Text>
				) : null}
			</Animated.View>
		</View>
	);
}

export default Loading;


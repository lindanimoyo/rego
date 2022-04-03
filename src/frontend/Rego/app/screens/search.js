import * as React from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function Search(props) {
	return(
		<>
			<View
				style={{
					backgroundColor: '#fff',
					flex:1
				}}
			>

			</View>
		</>
	)
}


const mapStateToProps = state => {
	const {app} = state;
	return {app}
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)


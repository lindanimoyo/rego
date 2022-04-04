import * as React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	useWindowDimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function CustomTabBar(props){
	const {state} = props.navigation;
	const {width, height} = useWindowDimensions();
	function getIcon(key){
		const {state} = props.navigation;
		const activeTabIndex = state.index;
		if (key ===  'publications'){
			if (state.routes[activeTabIndex].key === 'publications'){
				return {'name':'home',
					'size' : 25,
					'color': props.app.colors.background,
					'label': 'Home',
					'active': true
				}
			}
			else {
				return {'name':'home-outline',
					'size' : 25,
					'color': props.app.colors.statusBar,
					'label': 'Home',
					'active': false
				}
			}
		}
		else if (key === 'search'){
			if (state.routes[activeTabIndex].key === 'search'){
				return {'name':'search',
					'size' : 25,
					'color': props.app.colors.background,
					'label': 'Search',
					'active': true
				}
			}
			else {
				return {'name':'search',
					'size' : 25,
					'color': props.app.colors.statusBar,
					'label': 'Search',
					'active': false
				}
			}
		}
		else if (key === 'account'){
			if (state.routes[activeTabIndex].key === 'account'){
				return {'name':'person',
					'size' : 25,
					'color': props.app.colors.background,
					'label': 'Account',
					'active': true
				}
			}
			else {
				return {'name':'person-outline',
					'size' : 25,
					'color': props.app.colors.statusBar,
					'label': 'Account',
					'active': false
				}
			}
		}
	}
	return(
		<View style={{
			position: 'absolute',
			bottom: 0,
			right: 0,
			left: 0
		}}>
			<View style={{
				alignSelf: 'center',
				width: '80%',
				bottom: height * 0.03,
				flexDirection: 'row',
				justifyContent: 'space-evenly',
				minHeight: 60,
				height: height * 0.1,
				backgroundColor: '#ffffff',
				borderRadius: height * 0.1,
				elevation: 10
			}}>
				{
					state.routes.map(elements => (
						<TouchableOpacity
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'row',
								borderRadius: 50,
								margin: 10,
								borderWidth:getIcon(elements.key).active ? 0 : 0,
								borderColor: null,
								elevation: getIcon(elements.key).active ?
									5: null,
								backgroundColor:getIcon(elements.key).active ?
									props.app.colors.statusBar : null
							}}
							key={elements.key}
							onPress={() => Actions[elements.key]()}
						>
							<Ionicons
								size={getIcon(elements.key).size}
								color={getIcon(elements.key).color}
								name={getIcon(elements.key).name}
								style={{ margin: 7}}
							/>
							{
								getIcon(elements.key).active ?
									<Text style={{
										color: getIcon(elements.key).color,
										margin: 5,
										marginRight: 15,
										// fontWeight: 'bold',
										fontSize: 18,
										fontFamily: props.app.fonts.bold
									}}>
										{getIcon(elements.key).label}
									</Text>
									: null
							}
						</TouchableOpacity>
					))
				}
			</View>
		</View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar)

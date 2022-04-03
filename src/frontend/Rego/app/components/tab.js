import * as React from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function CustomTabBar(props){
	const {state} = props.navigation;
	function getIcon(key){
		const {state} = props.navigation;
		const activeTabIndex = state.index;
		if (key ===  'publications'){
			if (state.routes[activeTabIndex].key === 'publications'){
				return {'name':'book',
					'size' : 25,
					'color': props.app.colors.background,
					'label': 'Publications',
					'active': true
				}
			}
			else {
				return {'name':'book-outline',
					'size' : 25,
					'color': props.app.colors.statusBar,
					'label': 'Publications',
					'active': false
				}
			}
		}
		else if (key === 'search'){
			if (state.routes[activeTabIndex].key === 'search'){
				return {'name':'search',
					'size' : 28,
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
				margin: 20,
				marginLeft: 40,
				marginRight: 40,
				flexDirection: 'row',
				justifyContent: 'space-evenly',
				height: 60,
				backgroundColor: '#ffffff',
				borderRadius: 30,
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
								margin: 6,
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
								style={{ margin: 5}}
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

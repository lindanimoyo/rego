import * as React from 'react';
import {
	View,
	TouchableOpacity,
	Text
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";

function CustomTabBar(props){
	const {state} = props.navigation;
	function getIcon(key){
		const {state} = props.navigation;
		const activeTabIndex = state.index;
		if (key ===  'publications'){
			if (state.routes[activeTabIndex].key === 'publications'){
				return {'name':'home',
					'size' : 25,
					'color': props.app.colors.background,
					'label': 'publications',
					'active': true
				}
			}
			else {
				return {'name':'home-outline',
					'size' : 25,
					'color': props.app.colors.statusBar,
					'label': 'publications',
					'active': false
				}
			}
		}
		else if (key === 'search'){
			if (state.routes[activeTabIndex].key === 'search'){
				return {'name':'search',
					'size' : 28,
					'color': props.app.colors.background,
					'label': 'search',
					'active': true
				}
			}
			else {
				return {'name':'search',
					'size' : 25,
					'color': props.app.colors.statusBar,
					'label': 'search',
					'active': false
				}
			}
		}
		else if (key === 'account'){
			if (state.routes[activeTabIndex].key === 'account'){
				return {'name':'account',
					'size' : 32,
					'color': props.app.colors.background,
					'label': 'account',
					'active': true
				}
			}
			else {
				return {'name':'account',
					'size' : 32,
					'color': props.app.colors.statusBar,
					'label': 'account',
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
										fontWeight: 'bold',
										fontSize: 17
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

export default CustomTabBar;

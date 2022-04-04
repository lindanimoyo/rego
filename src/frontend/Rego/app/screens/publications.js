import * as React from 'react';
import {
	View,
	Pressable,
	Text,
	FlatList,
	StatusBar,
	useWindowDimensions
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

function PubCard(props){
	return(
		<>
			<Pressable
				style={{
					minHeight: props.height * 1/2,
					backgroundColor: '#fff',
					margin: 5,
					marginTop: 15,
					// marginBottom: 0,
					borderRadius: 20,
					padding: 10,
					borderStyle: 'solid',
					elevation: 10,
					justifyContent: 'space-evenly',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
					>
					<Ionicons name={'book-outline'} size={35} color={'#f00'} style={{ flex: 0.15, margin: 10}}/>
					<Text
						// numberOfLines={5}
						style={{
							fontFamily: props.app.fonts.bold,
							fontSize: 20,
							color: props.app.colors.text,
							flex: 1,
							marginTop: 10,
						}}
					>
						REGO: A Cross-platform Mobile Application for Reading Research Papers on the Go
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center'}}>
					<Text
						numberOfLines={2}
						style={{
							fontFamily: props.app.fonts.light,
							fontSize: 17,
							color: '#888',
							marginTop: 20,
							// textAlign: 'right',
							flex: 1
						}}
					>
						Mudaki Wilson, Dele-Alimi Temiloluwa, Julius Mwakosya
					</Text>
					<Ionicons name={'people'} size={35} color={'#f00'} style={{ flex: 0.15, margin: 10}}/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={{
							minHeight: 50,
							height: props.height * 0.08,
							backgroundColor: '#fff',
							width: '30%',
							justifyContent: 'center',
							// alignSelf: 'flex-end',
							alignItems: 'center',
							padding: 0,
							borderRadius: props.height * 0.1,
							marginTop: 30,
							marginBottom: 10,
							margin: 10,
							borderWidth: 2,
							borderColor: '#ff0092'
							// elevation: 10,
						}}
					>
						<Pressable
							android_ripple={{borderless: true, color: '#ff0092'}}
							style={{
								//
							}}
						>
							<Ionicons
								name={'heart'}
								size={40}
								color={'#ff0092'}
							/>
						</Pressable>
					</View>
					<View
						style={{
							minHeight: 50,
							height: props.height * 0.08,
							backgroundColor: '#5f5',
							width: '50%',
							elevation: 5,
							justifyContent: 'center',
							alignSelf: 'flex-end',
							padding: 0,
							borderRadius: props.height * 0.1,
							marginTop: 30,
							marginBottom: 10,
							margin: 10,
						}}
					>
						<Pressable
							android_ripple={{borderless: true}}
							style={{
								//
							}}
						>
							<Text
								style={{
									alignSelf: 'center',
									justifyContent: 'center',
									alignItems: 'center',
									fontFamily: props.app.fonts.bold,
									fontSize: 20,
									color: '#000'
							}}>
								Abstract
							</Text>
						</Pressable>
					</View>
				</View>
			</Pressable>
		</>
	)
}

function Publications(props) {
	const {width, height} = useWindowDimensions();
	StatusBar.setBackgroundColor('#004')
	function _renderItem(item){
		return(
			<>
				<PubCard {...props} width={width} height={height}/>
			</>
		)
	}
	function _headerComponent(){
		return(
			<>
				<View
					style={{
						flexDirection: 'row',
						alignItems: "center",
						justifyContent: 'center'
					}}
				>
					<Text
						style={{
							fontFamily: props.app.fonts.bold,
							fontSize: 25,
							color: '#fff',
							margin: 20,
							marginBottom: 50,
							marginTop: 50,
							textAlign: 'center'
						}}
					>
						Editor's choice
					</Text>
				</View>
			</>
		)
	}

	function _footerComponent(){
		return(
			<>
				<View style={{ margin: height * 0.1}}/>
			</>
		)
	}
	return(
		<>
			<View
				style={{
					backgroundColor: '#004',
					flex:1
				}}
			>
				<FlatList
					data={[1,2,3,4,5,6]}
					renderItem={_renderItem}
					ListHeaderComponent={_headerComponent}
					ListFooterComponent={_footerComponent}
				/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Publications)
export {PubCard}

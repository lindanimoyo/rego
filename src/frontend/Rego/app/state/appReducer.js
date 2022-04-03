const INITIAL_STATE = {
	colors: {
		button: '#ff0',
		background: '#fff',
		statusBar: '#000',
		text: '#000'
	},
	fonts: {
		light: 'Comfortaa-Light',
		medium: 'Comfortaa-Medium',
		regular: 'Comfortaa-Regular',
		semiBold: 'Comfortaa-SemiBold',
		bold: 'Comfortaa-Bold',
	},
}

export const appReducer = (state = INITIAL_STATE, action) => {
	switch (action.type){
		default:
			return state;
	}
}

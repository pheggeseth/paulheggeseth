/** @type {import('postcss-load-config').Config} */
export default {
	plugins: {
		/** @type {import('autoprefixer').Options} */
		autoprefixer: {
			/* This prevents a React hydration mismatch error in the "Code" component, 
			as that component internally renders a <style> element 
			whose content includes a ::selection pseudo selector.
			That selector gets prefixed by Waku during server render using autoprefixer, 
			which adds the ::-moz-selection selector.
			Upon client hydration, this is compared to the base ::selection selector, which results in a mismatch.
			See https://github.com/code-hike/bright/issues/39 for more details.
			*/
			add: false,
		},
	},
};

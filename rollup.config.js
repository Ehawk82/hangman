export default {
	input: 'index.js',
	output: {
		file: 'bundle.js',
		format: 'iife',
		sourcemap: true,
		global: "word-list"
	}
};
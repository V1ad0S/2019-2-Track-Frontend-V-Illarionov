// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
	extends: [
		'@wemake-services/stylelint-config-scss',
		'stylelint-config-css-modules',
		'stylelint-a11y/recommended',
	],
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],

	rules: {
		'scss/media-feature-value-dollar-variable': 'never',
		// ignore special `var-` css variables for `:export`
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^var-/'],
			},
		],

		// custom plugins to work with
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignore: ['flexbox'],
			},
		],

		indentation: 'tab',

		'plugin/stylelint-no-indistinguishable-colors': false,
		'plugin/no-low-performance-animation-properties': null,

		// a11y
		'a11y/content-property-no-static-value': true,
		'a11y/media-prefers-reduced-motion': null,
	},
};

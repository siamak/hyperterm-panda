// Constants
const backgroundColor = '#292A2B';
const foregroundColor = '#E6E6E6';
const darkerBackground = 'rgba(0, 0, 0, 0.2)';
const borderColor = '#333';

// Colors
const RED = '#FF2C6D';
const GREEN = '#19f9d8';
const ORANGE = '#FFB86C';
const LIGHT_ORANGE = '#ffcc95';
const BLUE = '#45A9F9';
const LIGHT_BLUE = '#6FC1FF';
const PINK = '#FF75B5';
const LIGHT_PINK = '#FF9AC1';
const CYAN = '#6FC1FF';
const PURPLE = '#B084EB';
const LIGHT_GRAY = foregroundColor;
const MEDIUM_GRAY = '#676B79';
const WHITE = '#FFFFFF';

const colors = {
    black: backgroundColor,
    red: RED,
    green: GREEN,
    yellow: ORANGE,
    blue: BLUE,
    magenta: PINK,
    cyan: CYAN,
	orange: PURPLE,
    white: LIGHT_GRAY,
    lightRed: RED,
    lightGreen: GREEN,
    lightYellow: LIGHT_ORANGE,
    lightBlue: LIGHT_BLUE,
    lightMagenta: LIGHT_PINK,
    lightCyan: CYAN,
    lightWhite: WHITE
};

// Apply theme
exports.decorateConfig = (config) => (
    Object.assign({}, config, {
        backgroundColor,
        foregroundColor,
        borderColor: borderColor,
        cursorColor: foregroundColor,
        colors,
        css: `
      ${config.css || ''}
	  .terms_term x-row{
		  height: 24px;
	  }
      /* Highlight active tab by making rest of nav darker */
      .tabs_list {
        background-color: ${darkerBackground} !important;
      }
      /* Set tab colors */
      .tab_tab {
        color: ${foregroundColor} !important;
        background-color: ${darkerBackground} !important;
        border: none !important;
        border-right: 1px solid transparent !important;
        border-left: 1px solid transparent !important;
      }
      /* Hide bottom border if tab is active, make bg lighter */
      .tab_active {
        background-color: ${backgroundColor} !important;
        height: calc(100% + 1px);
        border-left: 1px solid ${borderColor} !important;
        border-right: 1px solid ${borderColor} !important;
      }
      .tab_tab:last-child {
        border-right: 1px solid transparent !important;
      }
      /* Hide hardcoded black bottom border */
      .tab_active:before {
        border-bottom: none !important;
      }
      .tab_text {
        border-color: transparent !important;
      }
    `
    })
);

// Development middleware for HMR
exports.middleware = () => (next) => (action) => {
    /* eslint-disable no-param-reassign, default-case */
    switch (action.type) {
        case 'CONFIG_LOAD':
        case 'CONFIG_RELOAD':
            action.config.foregroundColor = foregroundColor;
            action.config.backgroundColor = backgroundColor;
            action.config.cursorColor = foregroundColor;
            action.config.colors = colors;
    }
    next(action);
};

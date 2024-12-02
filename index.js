// index.js

// Initialize extension settings
if (!window.extension_settings) {
    window.extension_settings = {};
}

const MODULE_NAME = 'chat-stylist';

// Register extension
window['extensions'] = window['extensions'] || {};
window['extensions'][MODULE_NAME] = {
    init: init,
    name: MODULE_NAME,
};

function init() {
    // Create the activation button
    // Updated button HTML in init function
const settingsHtml = `
    <div class="chat-stylist-settings">
        <div class="inline-drawer">
            <div class="inline-drawer-toggle inline-drawer-header">
                <b>Chat Stylist / 聊天样式编辑器</b>
                <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
            </div>
            <div class="inline-drawer-content">
                <div class="chat-stylist-button menu_button" id="chat-stylist-button">
                    <div class="button_content">
                        <i class="fa-solid fa-palette"></i>
                        <span class="button_text">
                            <span class="button_text_en">Style Editor</span>
                            <span class="button_text_zh">样式编辑器</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

    $('#extensions_settings2').append(settingsHtml);

    // Create the floating panel (initially hidden)
    const panelHtml = `
        <div id="chat-stylist-panel" style="display: none;">
            <!-- Panel content remains the same -->
        </div>
    `;

    $('body').append(panelHtml);

    // Setup event listeners
    $('#chat-stylist-button').on('click', function() {
        $('#chat-stylist-panel').toggle();
    });

    // Rest of the initialization code
}

// Call init when the document is ready
$(document).ready(function() {
    init();
});

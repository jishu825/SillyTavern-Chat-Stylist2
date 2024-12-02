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
    const settingsHtml = `
        <div class="chat-stylist-settings">
            <div class="inline-drawer">
                <div class="inline-drawer-toggle inline-drawer-header">
                    <b>Chat Stylist</b>
                    <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                </div>
                <div class="inline-drawer-content">
                    <div class="chat-stylist-button menu_button" id="chat-stylist-button">
                        <i class="fa-solid fa-palette"></i>
                        Open Style Editor
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

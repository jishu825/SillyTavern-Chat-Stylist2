// First, ensure the extension settings object exists
if (!window.extension_settings) {
    window.extension_settings = {};
}

const MODULE_NAME = 'chat-stylist';

// Create extension settings if they don't exist
if (!window.extension_settings[MODULE_NAME]) {
    window.extension_settings[MODULE_NAME] = {};
}

class ChatStylist {
    constructor() {
        this.settings = window.extension_settings[MODULE_NAME];
    }

    init() {
        const extensionHtml = `
            <div id="chat-stylist-settings" class="extension-settings">
                <div class="inline-drawer">
                    <div class="inline-drawer-toggle inline-drawer-header">
                        <b>Chat Stylist / 聊天样式编辑器</b>
                        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down"></div>
                    </div>
                    <div class="inline-drawer-content">
                        <div id="chat-stylist-button" class="menu_button">
                            <div class="button_content">
                                <i class="fa-solid fa-palette"></i>
                                <span>Style Editor / 样式编辑器</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#extensions_settings2').append(extensionHtml);
        
        $('#chat-stylist-button').on('click', () => {
            console.log('Style editor button clicked');
        });
    }
}

// Create and register the extension
const chatStylist = new ChatStylist();
window.extensions = window.extensions || {};
window.extensions[MODULE_NAME] = chatStylist;

// Initialize when document is ready
jQuery(() => {
    chatStylist.init();
});

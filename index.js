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
                        <b class="title">Chat Stylist / 聊天样式编辑器</b>
                        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down"></div>
                    </div>
                    <div class="inline-drawer-content">
                        <div class="chat-stylist-control">
                            <div id="chat-stylist-button" class="menu_button">
                                <i class="fa-solid fa-palette"></i>
                                <span class="button-label">Style Editor / 样式编辑器</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#extensions_settings2').append(extensionHtml);
        this.initStyles();
        this.initEventListeners();
    }

    initStyles() {
        // Add custom CSS for the button layout
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .chat-stylist-control {
                padding: 5px 0;
            }

            #chat-stylist-button {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 16px;
                width: 100%;
                border-radius: 5px;
                transition: background-color 0.2s ease;
            }

            #chat-stylist-button:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            #chat-stylist-button i {
                font-size: 16px;
                width: 20px;
                text-align: center;
            }

            #chat-stylist-button .button-label {
                font-size: 14px;
                white-space: nowrap;
            }

            .inline-drawer-header .title {
                display: flex;
                align-items: center;
                gap: 5px;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    initEventListeners() {
        $('#chat-stylist-button').on('click', () => {
            this.toggleStyleEditor();
        });
    }

    toggleStyleEditor() {
        // Here we'll implement the panel toggle functionality
        console.log('Style editor button clicked - panel implementation pending');
        // We'll add the panel creation and toggle logic in the next step
    }
}

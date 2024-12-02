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

// Add to index.js
function init() {
    // Previous button HTML code remains the same

    // Panel functionality
    class StyleEditor {
        constructor() {
            this.currentCharacter = null;
            this.panel = null;
            this.initialize();
        }

        initialize() {
            this.createPanel();
            this.setupEventListeners();
            this.loadCharacterList();
        }

        createPanel() {
            const panelHtml = `
                <div id="chat-stylist-panel" class="chat-stylist-panel" style="display: none;">
                    <div class="panel-header">
                        <div class="header-title">
                            <span class="title-en">Style Editor</span>
                            <span class="title-separator">|</span>
                            <span class="title-zh">样式编辑器</span>
                        </div>
                        <div class="header-controls">
                            <button class="minimize-btn" title="Minimize">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <button class="close-btn" title="Close">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </div>
                    <div class="panel-content">
                        <div class="character-selection">
                            <label>
                                <span class="label-en">Select Character</span>
                                <span class="label-zh">选择角色</span>
                            </label>
                            <select id="character-select"></select>
                        </div>
                        <div class="style-controls">
                            <!-- Style control elements will be added here -->
                        </div>
                    </div>
                </div>
            `;

            $('body').append(panelHtml);
            this.panel = $('#chat-stylist-panel');
            this.makeDrawable(this.panel[0], '.panel-header');
        }

        setupEventListeners() {
            $('#chat-stylist-button').on('click', () => this.togglePanel());
            this.panel.find('.close-btn').on('click', () => this.hidePanel());
            this.panel.find('.minimize-btn').on('click', () => this.toggleMinimize());
            $('#character-select').on('change', (e) => this.onCharacterSelect(e));
        }

        togglePanel() {
            this.panel.toggle();
            if (this.panel.is(':visible')) {
                this.loadCharacterList();
            }
        }

        hidePanel() {
            this.panel.hide();
        }

        toggleMinimize() {
            const content = this.panel.find('.panel-content');
            const icon = this.panel.find('.minimize-btn i');
            
            content.toggle();
            icon.toggleClass('fa-minus fa-plus');
        }

        loadCharacterList() {
            const select = $('#character-select');
            select.empty();
            
            const defaultOption = $('<option>', {
                value: '',
                text: '选择角色 / Select Character'
            });
            select.append(defaultOption);

            // Get all messages and extract unique characters
            const characters = new Set();
            $('.mes').each((i, el) => {
                const name = $(el).find('.name_text').text().trim();
                const isUser = $(el).attr('is_user') === 'true';
                const type = isUser ? 'User' : 'AI';
                
                if (name && name !== '${characterName}') {
                    characters.add(`${name} (${type})`);
                }
            });

            // Add characters to select
            characters.forEach(char => {
                const option = $('<option>', {
                    value: char,
                    text: char
                });
                select.append(option);
            });
        }

        onCharacterSelect(event) {
            this.currentCharacter = event.target.value;
            if (this.currentCharacter) {
                this.loadCharacterStyles();
            }
        }

        loadCharacterStyles() {
            // Load and apply character-specific styles
            // This will be implemented in the next step
        }

        makeDrawable(element, handle) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const handleElement = element.querySelector(handle);
            
            handleElement.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                element.style.top = `${element.offsetTop - pos2}px`;
                element.style.left = `${element.offsetLeft - pos1}px`;
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }

    // Initialize the style editor
    const styleEditor = new StyleEditor();
}

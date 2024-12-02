// Initialize required objects
if (!window.extension_settings) {
    window.extension_settings = {};
}

const MODULE_NAME = 'chat-stylist';

// Initialize module settings
if (!window.extension_settings[MODULE_NAME]) {
    window.extension_settings[MODULE_NAME] = {
        styles: {},
        defaultStyle: {
            background: {
                color: 'rgba(254, 222, 169, 0.5)',
                gradient: null
            },
            text: {
                main: 'rgba(208, 206, 196, 1)',
                italics: 'rgba(183, 160, 255, 1)',
                quote: 'rgba(224, 159, 254, 1)'
            },
            effects: {
                quoteGlow: {
                    enabled: false,
                    color: 'rgba(224, 159, 254, 0.8)',
                    intensity: 5
                }
            },
            padding: {
                top: 10,
                right: 15,
                bottom: 10,
                left: 15
            }
        }
    };
}

class ChatStylist {
    constructor() {
        this.settings = window.extension_settings[MODULE_NAME];
        this.currentCharacter = null;
        this.panel = null;
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

        this.initStyles();
        $('#extensions_settings2').append(extensionHtml);
        this.createEditorPanel();
        this.initEventListeners();
    }

    initStyles() {
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

            .style-editor-panel {
                position: fixed;
                top: 50px;
                right: 20px;
                width: 320px;
                background: #2d2d2d;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
                z-index: 10000;
                display: none;
            }

            .panel-header {
                background: #1a1a1a;
                padding: 12px 15px;
                border-radius: 10px 10px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
            }

            .panel-content {
                padding: 15px;
            }

            .control-group {
                margin-bottom: 15px;
            }

            .control-group label {
                display: block;
                margin-bottom: 5px;
                color: #fff;
            }

            .color-picker-wrapper {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(styleSheet);
    }

    createEditorPanel() {
        const panelHtml = `
            <div id="style-editor-panel" class="style-editor-panel">
                <div class="panel-header">
                    <div class="header-title">Style Editor / 样式编辑器</div>
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
                    <div class="control-group">
                        <label>Select Character / 选择角色</label>
                        <select id="character-select" class="form-control">
                            <option value="">Choose a character...</option>
                        </select>
                    </div>
                    <div class="style-controls" style="display: none;">
                        <div class="control-group">
                            <label>Background Color / 背景颜色</label>
                            <div class="color-picker-wrapper">
                                <toolcool-color-picker id="background-color" color="rgba(254, 222, 169, 0.5)"></toolcool-color-picker>
                            </div>
                        </div>
                        <div class="control-group">
                            <label>Main Text / 主要文本</label>
                            <div class="color-picker-wrapper">
                                <toolcool-color-picker id="main-text-color" color="rgba(208, 206, 196, 1)"></toolcool-color-picker>
                            </div>
                        </div>
                        <div class="control-group">
                            <label>Quote Text / 引用文本</label>
                            <div class="color-picker-wrapper">
                                <toolcool-color-picker id="quote-text-color" color="rgba(224, 159, 254, 1)"></toolcool-color-picker>
                            </div>
                        </div>
                        <div class="control-group">
                            <label>
                                <input type="checkbox" id="quote-glow-enabled">
                                Enable Quote Glow / 启用引用荧光
                            </label>
                            <div id="quote-glow-controls" style="display: none;">
                                <div class="color-picker-wrapper">
                                    <toolcool-color-picker id="quote-glow-color" color="rgba(224, 159, 254, 0.8)"></toolcool-color-picker>
                                </div>
                                <input type="range" id="quote-glow-intensity" min="0" max="20" value="5">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('body').append(panelHtml);
        this.panel = $('#style-editor-panel');
        this.makeDraggable(this.panel[0], '.panel-header');
    }

    initEventListeners() {
        $('#chat-stylist-button').on('click', () => this.togglePanel());
        
        this.panel.find('.close-btn').on('click', () => this.hidePanel());
        this.panel.find('.minimize-btn').on('click', () => this.toggleMinimize());
        
        $('#character-select').on('change', (e) => this.onCharacterSelect(e));
        $('#quote-glow-enabled').on('change', (e) => this.toggleQuoteGlow(e));
        
        // Color picker change events
        ['background-color', 'main-text-color', 'quote-text-color', 'quote-glow-color'].forEach(id => {
            $(`#${id}`).on('change', (e) => this.onColorChange(e));
        });
        
        $('#quote-glow-intensity').on('input', (e) => this.onGlowIntensityChange(e));
    }

    togglePanel() {
        this.panel.toggle();
        if (this.panel.is(':visible')) {
            this.refreshCharacterList();
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

    refreshCharacterList() {
        const select = $('#character-select');
        select.empty().append('<option value="">Choose a character...</option>');

        const characters = new Set();
        $('.mes').each((i, el) => {
            const name = $(el).find('.name_text').text().trim();
            const isUser = $(el).attr('is_user') === 'true';
            if (name && name !== '${characterName}') {
                characters.add({
                    name: name,
                    type: isUser ? 'User' : 'AI',
                    id: `${isUser ? 'user' : 'char'}_${name}`
                });
            }
        });

        characters.forEach(char => {
            select.append(`<option value="${char.id}">${char.name} (${char.type})</option>`);
        });
    }

    makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const handleElem = element.querySelector(handle);
        
        handleElem.onmousedown = dragMouseDown;

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

    onCharacterSelect(event) {
        this.currentCharacter = event.target.value;
        this.panel.find('.style-controls').toggle(!!this.currentCharacter);
        if (this.currentCharacter) {
            this.loadCharacterStyle();
        }
    }

    toggleQuoteGlow(event) {
        const enabled = event.target.checked;
        $('#quote-glow-controls').toggle(enabled);
        this.applyStyles();
    }

    onColorChange(event) {
        this.applyStyles();
    }

    onGlowIntensityChange(event) {
        this.applyStyles();
    }

    loadCharacterStyle() {
        const style = this.settings.styles[this.currentCharacter] || this.settings.defaultStyle;
        // Load style values into controls
        $('#background-color').attr('color', style.background.color);
        $('#main-text-color').attr('color', style.text.main);
        $('#quote-text-color').attr('color', style.text.quote);
        $('#quote-glow-enabled').prop('checked', style.effects.quoteGlow.enabled);
        $('#quote-glow-color').attr('color', style.effects.quoteGlow.color);
        $('#quote-glow-intensity').val(style.effects.quoteGlow.intensity);
        $('#quote-glow-controls').toggle(style.effects.quoteGlow.enabled);
        
        this.applyStyles();
    }

    applyStyles() {
        if (!this.currentCharacter) return;

        const style = {
            background: {
                color: $('#background-color').attr('color'),
                gradient: null
            },
            text: {
                main: $('#main-text-color').attr('color'),
                quote: $('#quote-text-color').attr('color')
            },
            effects: {
                quoteGlow: {
                    enabled: $('#quote-glow-enabled').is(':checked'),
                    color: $('#quote-glow-color').attr('color'),
                    intensity: $('#quote-glow-intensity').val()
                }
            }
        };

        this.settings.styles[this.currentCharacter] = style;
        this.updateMessageStyles(this.currentCharacter, style);
        this.saveSettings();
    }

    updateMessageStyles(characterId, style) {
        $(`.mes[data-author="${characterId}"]`).each((i, message) => {
            const mesBlock = $(message).find('.mes_block');
            const mesText = $(message).find('.mes_text');
            const nameText = $(message).find('.name_text');
            const quotes = $(message).find('q');

            mesBlock.css('background-color', style.background.color);
            mesText.css('color', style.text.main);
            nameText.css('color', style.text.main);
            
            quotes.css('color', style.text.quote);
            if (style.effects.quoteGlow.enabled) {
                quotes.css({
                    'text-shadow': `0 0 ${style.effects.quoteGlow.intensity}px ${style.effects.quoteGlow.color}`,
                    'filter': `drop-shadow(0 0 ${style.effects.quoteGlow.intensity/2}px ${style.effects.quoteGlow.color})`
                });
            } else {
                quotes.css({
                    'text-shadow': 'none',
                    'filter': 'none'
                });
            }
        });
    }

    saveSettings() {
        window.extension_settings[MODULE_NAME] = this.settings;
        if (window.saveSettingsDebounced) {
            window.saveSettingsDebounced();
        }
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

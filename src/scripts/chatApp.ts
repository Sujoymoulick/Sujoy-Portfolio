import {
  getInitialChats,
  generateAIAnswer,
  AVAILABLE_MODELS,
  type ChatSession,
  type ChatMessage,
} from './chatEngine';
import { portfolioData } from '../data/portfolioData';

// Storage Keys
const STORAGE_CHATS_KEY = 'sujoy_portfolio_chats_v4';
const STORAGE_CURRENT_CHAT_ID = 'sujoy_portfolio_active_chat_v4';
const STORAGE_THEME_KEY = 'sujoy_portfolio_theme_v3';

export class ChatApp {
  private chats: ChatSession[] = [];
  private activeChatId: string = '';
  private currentModel: string = 'sujoy-gpt-4o';
  private deepReasoning: boolean = false;
  private webSearch: boolean = false;
  private isGenerating: boolean = false;
  private recognition: any = null;
  private isListening: boolean = false;

  // DOM references
  private sidebarEl!: HTMLElement;
  private sidebarBackdropEl!: HTMLElement;
  private historyListEl!: HTMLElement;
  private messagesContainerEl!: HTMLElement;
  private welcomeHeroEl!: HTMLElement;
  private chatScrollAreaEl!: HTMLElement;
  private textareaEl!: HTMLTextAreaElement;
  private sendBtnEl!: HTMLButtonElement;
  private modelBtnEl!: HTMLButtonElement;
  private modelDropdownEl!: HTMLElement;
  private attachMenuEl!: HTMLElement;
  private settingsModalEl!: HTMLElement;
  private shareModalEl!: HTMLElement;
  private resumeModalEl!: HTMLElement;
  private toastContainerEl!: HTMLElement;

  constructor() {
    this.init();
  }

  private init() {
    this.loadState();
    this.bindDOM();
    this.setupSpeechRecognition();
    this.setupEventListeners();
    this.applyTheme(localStorage.getItem(STORAGE_THEME_KEY) || 'dark');
    this.render();
  }

  private loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_CHATS_KEY);
      if (stored) {
        this.chats = JSON.parse(stored);
      } else {
        this.chats = getInitialChats();
        this.saveState();
      }
    } catch (e) {
      this.chats = getInitialChats();
    }

    const savedActiveId = localStorage.getItem(STORAGE_CURRENT_CHAT_ID);
    if (savedActiveId && this.chats.some((c) => c.id === savedActiveId)) {
      this.activeChatId = savedActiveId;
    } else if (this.chats.length > 0) {
      this.activeChatId = this.chats[0].id;
    }
  }

  private saveState() {
    try {
      localStorage.setItem(STORAGE_CHATS_KEY, JSON.stringify(this.chats));
      localStorage.setItem(STORAGE_CURRENT_CHAT_ID, this.activeChatId);
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }

  private bindDOM() {
    this.sidebarEl = document.getElementById('sidebar') as HTMLElement;
    this.sidebarBackdropEl = document.getElementById('sidebarBackdrop') as HTMLElement;
    this.historyListEl = document.getElementById('sidebarHistory') as HTMLElement;
    this.messagesContainerEl = document.getElementById('messagesContainer') as HTMLElement;
    this.welcomeHeroEl = document.getElementById('welcomeHero') as HTMLElement;
    this.chatScrollAreaEl = document.getElementById('chatScrollArea') as HTMLElement;
    this.textareaEl = document.getElementById('chatInput') as HTMLTextAreaElement;
    this.sendBtnEl = document.getElementById('sendActionBtn') as HTMLButtonElement;
    this.modelBtnEl = document.getElementById('modelSelectBtn') as HTMLButtonElement;
    this.modelDropdownEl = document.getElementById('modelDropdownMenu') as HTMLElement;
    this.attachMenuEl = document.getElementById('attachMenu') as HTMLElement;
    this.settingsModalEl = document.getElementById('settingsModal') as HTMLElement;
    this.shareModalEl = document.getElementById('shareModal') as HTMLElement;
    this.resumeModalEl = document.getElementById('resumeModal') as HTMLElement;
    this.toastContainerEl = document.getElementById('toastContainer') as HTMLElement;
  }

  private setupSpeechRecognition() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateMicButton();
        this.showToast('Listening... Speak now');
      };

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        this.textareaEl.value = transcript;
        this.adjustTextareaHeight();
        this.updateSendButtonState();
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        this.updateMicButton();
        this.showToast('Microphone error or permission denied');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicButton();
      };
    }
  }

  private updateMicButton() {
    const micBtn = document.getElementById('micBtn');
    if (micBtn) {
      if (this.isListening) {
        micBtn.classList.add('active');
        micBtn.style.color = '#ef4444';
      } else {
        micBtn.classList.remove('active');
        micBtn.style.color = '';
      }
    }
  }

  private setupEventListeners() {
    // New Chat
    document.getElementById('newChatBtn')?.addEventListener('click', () => this.createNewChat());
    document.getElementById('headerNewChatBtn')?.addEventListener('click', () => this.createNewChat());

    // Sidebar Toggle
    document.getElementById('toggleSidebarBtn')?.addEventListener('click', () => this.toggleSidebar());
    document.getElementById('mobileMenuBtn')?.addEventListener('click', () => this.toggleSidebar(true));
    this.sidebarBackdropEl?.addEventListener('click', () => this.toggleSidebar(false));

    // Input Textarea
    this.textareaEl.addEventListener('input', () => {
      this.adjustTextareaHeight();
      this.updateSendButtonState();
    });

    this.textareaEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSubmit();
      }
    });

    // Send Button
    this.sendBtnEl.addEventListener('click', () => {
      if (this.isGenerating) {
        this.stopGeneration();
      } else {
        this.handleSubmit();
      }
    });

    // Model Selector
    this.modelBtnEl?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.modelDropdownEl.classList.toggle('show');
    });

    document.querySelectorAll('.model-option-card').forEach((el) => {
      el.addEventListener('click', () => {
        const modelId = el.getAttribute('data-model-id') || 'sujoy-gpt-4o';
        this.selectModel(modelId);
        this.modelDropdownEl.classList.remove('show');
      });
    });

    // Attach menu (+)
    document.getElementById('attachBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.attachMenuEl.classList.toggle('show');
    });

    document.querySelectorAll('.attach-menu-item').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.getAttribute('data-action');
        this.handleAttachAction(action);
        this.attachMenuEl.classList.remove('show');
      });
    });

    // Reason & Search Pills
    document.getElementById('deepReasonBtn')?.addEventListener('click', () => {
      this.deepReasoning = !this.deepReasoning;
      document.getElementById('deepReasonBtn')?.classList.toggle('active', this.deepReasoning);
      this.showToast(this.deepReasoning ? 'Deep Reasoning enabled' : 'Deep Reasoning disabled');
    });

    document.getElementById('webSearchBtn')?.addEventListener('click', () => {
      this.webSearch = !this.webSearch;
      document.getElementById('webSearchBtn')?.classList.toggle('active', this.webSearch);
      this.showToast(this.webSearch ? 'Resume Live Search enabled' : 'Live Search disabled');
    });

    // Mic Button
    document.getElementById('micBtn')?.addEventListener('click', () => {
      if (!this.recognition) {
        this.showToast('Speech recognition not supported in this browser');
        return;
      }
      if (this.isListening) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    });

    // Search chats
    document.getElementById('sidebarSearchInput')?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();
      this.filterChats(query);
    });

    // Prompt Cards in Hero
    document.querySelectorAll('.prompt-card').forEach((card) => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        if (prompt) {
          this.sendMessage(prompt);
        }
      });
    });

    // Modals
    document.getElementById('settingsBtn')?.addEventListener('click', () => {
      this.settingsModalEl.classList.add('show');
    });
    document.getElementById('userProfileBtn')?.addEventListener('click', () => {
      this.settingsModalEl.classList.add('show');
    });
    document.getElementById('closeSettingsBtn')?.addEventListener('click', () => {
      this.settingsModalEl.classList.remove('show');
    });

    document.getElementById('shareBtn')?.addEventListener('click', () => {
      this.shareModalEl.classList.add('show');
    });
    document.getElementById('closeShareBtn')?.addEventListener('click', () => {
      this.shareModalEl.classList.remove('show');
    });

    document.getElementById('closeResumeBtn')?.addEventListener('click', () => {
      this.resumeModalEl.classList.remove('show');
    });

    // Share Actions
    document.getElementById('copyShareLinkBtn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      this.showToast('Portfolio link copied');
    });

    document.getElementById('exportMarkdownBtn')?.addEventListener('click', () => {
      this.exportCurrentChat();
    });

    // Theme Selector
    document.getElementById('themeSelect')?.addEventListener('change', (e) => {
      const theme = (e.target as HTMLSelectElement).value;
      this.applyTheme(theme);
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!this.modelDropdownEl.contains(target) && !this.modelBtnEl.contains(target)) {
        this.modelDropdownEl.classList.remove('show');
      }
      if (!this.attachMenuEl.contains(target) && !document.getElementById('attachBtn')?.contains(target)) {
        this.attachMenuEl.classList.remove('show');
      }
    });
  }

  private applyTheme(theme: string) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_THEME_KEY, theme);
    const themeSelect = document.getElementById('themeSelect') as HTMLSelectElement;
    if (themeSelect) themeSelect.value = theme;
  }

  private toggleSidebar(forceOpen?: boolean) {
    const isOpen = this.sidebarEl.classList.contains('open');
    const willOpen = forceOpen !== undefined ? forceOpen : !isOpen;

    if (window.innerWidth <= 768) {
      if (willOpen) {
        this.sidebarEl.classList.add('open');
        this.sidebarBackdropEl.classList.add('show');
      } else {
        this.sidebarEl.classList.remove('open');
        this.sidebarBackdropEl.classList.remove('show');
      }
    } else {
      this.sidebarEl.classList.toggle('collapsed');
    }
  }

  private selectModel(modelId: string) {
    this.currentModel = modelId;
    const model = AVAILABLE_MODELS.find((m) => m.id === modelId);
    if (model) {
      const nameEl = document.getElementById('currentModelName');
      const badgeEl = document.getElementById('currentModelBadge');
      if (nameEl) nameEl.textContent = model.name;
      if (badgeEl) badgeEl.textContent = model.badge;
      this.deepReasoning = model.deepReasoning;
      document.getElementById('deepReasonBtn')?.classList.toggle('active', this.deepReasoning);
      this.showToast(`Switched to ${model.name}`);
    }
    document.querySelectorAll('.model-option-card').forEach((card) => {
      card.classList.toggle('active', card.getAttribute('data-model-id') === modelId);
    });
  }

  private adjustTextareaHeight() {
    this.textareaEl.style.height = 'auto';
    this.textareaEl.style.height = `${Math.min(this.textareaEl.scrollHeight, 180)}px`;
  }

  private updateSendButtonState() {
    const hasText = this.textareaEl.value.trim().length > 0;
    this.sendBtnEl.disabled = !hasText && !this.isGenerating;
  }

  private createNewChat() {
    const newSession: ChatSession = {
      id: `chat-${Date.now()}`,
      title: 'New conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
      model: this.currentModel,
    };
    this.chats.unshift(newSession);
    this.activeChatId = newSession.id;
    this.saveState();
    this.render();
    if (window.innerWidth <= 768) {
      this.toggleSidebar(false);
    }
    this.textareaEl.focus();
  }

  private switchChat(chatId: string) {
    this.activeChatId = chatId;
    this.saveState();
    this.render();
    if (window.innerWidth <= 768) {
      this.toggleSidebar(false);
    }
  }

  private deleteChat(chatId: string, e: Event) {
    e.stopPropagation();
    this.chats = this.chats.filter((c) => c.id !== chatId);
    if (this.chats.length === 0) {
      this.chats = getInitialChats();
      this.activeChatId = this.chats[0].id;
    } else if (this.activeChatId === chatId) {
      this.activeChatId = this.chats[0].id;
    }
    this.saveState();
    this.render();
    this.showToast('Conversation deleted');
  }

  private filterChats(query: string) {
    const items = this.historyListEl.querySelectorAll('.chat-history-item');
    items.forEach((item) => {
      const title = item.querySelector('.history-title-wrap span')?.textContent?.toLowerCase() || '';
      (item as HTMLElement).style.display = title.includes(query) ? 'flex' : 'none';
    });
  }

  private handleAttachAction(action: string | null) {
    if (!action) return;
    switch (action) {
      case 'projects':
        this.sendMessage('Showcase Sujoy\'s featured projects including FreePDFLY, FCForge, and SendVirtualGift');
        break;
      case 'experience':
        this.sendMessage('Tell me about Sujoy\'s work experience at The Speech Society and CodeAlpha');
        break;
      case 'resume':
        this.sendMessage('Can I view or request Sujoy\'s full resume?');
        break;
      case 'live-tools':
        this.sendMessage('What live browser extensions, developer tools, and web utilities has Sujoy built?');
        break;
      case 'blogs':
        this.sendMessage('Show me Sujoy\'s technical blog articles and engineering notes on AI Agents and MCP.');
        break;
      case 'certifications':
        this.sendMessage('What are Sujoy\'s 10 verified professional certifications across AI, Cloud, and Software Engineering?');
        break;
      case 'github':
        this.sendMessage('What are Sujoy\'s GitHub repositories, open-source codebases, and technical projects?');
        break;
      case 'contact':
        this.sendMessage('How can I contact Sujoy directly by email or phone?');
        break;
    }
  }

  private handleSubmit() {
    const text = this.textareaEl.value.trim();
    if (!text || this.isGenerating) return;
    this.textareaEl.value = '';
    this.adjustTextareaHeight();
    this.updateSendButtonState();
    this.sendMessage(text);
  }

  public sendMessage(userText: string) {
    let currentSession = this.chats.find((c) => c.id === this.activeChatId);
    if (!currentSession) {
      this.createNewChat();
      currentSession = this.chats[0];
    }

    if (currentSession.messages.length === 0) {
      currentSession.title = userText.slice(0, 32) + (userText.length > 32 ? '...' : '');
    }

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    };
    currentSession.messages.push(userMsg);
    currentSession.updatedAt = Date.now();
    this.saveState();
    this.render();
    this.scrollToBottom();

    this.generateResponseStream(currentSession, userText);
  }

  private generateResponseStream(session: ChatSession, userPrompt: string) {
    this.isGenerating = true;
    this.updateSendButtonIcon(true);

    const aiResult = generateAIAnswer(userPrompt, {
      model: this.currentModel,
      deepReasoning: this.deepReasoning,
      webSearch: this.webSearch,
      lastContextTopic: session.contextTopic,
    });

    if (aiResult.matchedTopic) {
      session.contextTopic = aiResult.matchedTopic;
    }

    const assistantMsg: ChatMessage = {
      id: `msg-${Date.now()}-a`,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      thinking: aiResult.thinking,
      thinkingTime: aiResult.thinkingTime,
      suggestions: aiResult.suggestions,
      isStreaming: true,
    };

    session.messages.push(assistantMsg);
    this.renderMessages(session);
    this.scrollToBottom();

    const fullContent = aiResult.content;
    let charIndex = 0;
    const streamSpeed = 16;
    const chunkSize = 3;

    const interval = setInterval(() => {
      if (!this.isGenerating) {
        clearInterval(interval);
        assistantMsg.isStreaming = false;
        this.saveState();
        this.renderMessages(session);
        return;
      }

      charIndex += chunkSize;
      if (charIndex >= fullContent.length) {
        assistantMsg.content = fullContent;
        assistantMsg.isStreaming = false;
        clearInterval(interval);
        this.isGenerating = false;
        this.updateSendButtonIcon(false);
        this.saveState();
        this.renderMessages(session);
        this.scrollToBottom();
      } else {
        assistantMsg.content = fullContent.slice(0, charIndex);
        this.updateStreamingMessageDOM(assistantMsg.id, assistantMsg.content);
        this.scrollToBottom();
      }
    }, streamSpeed);
  }

  private stopGeneration() {
    this.isGenerating = false;
    this.updateSendButtonIcon(false);
    this.showToast('Generation stopped');
  }

  private updateSendButtonIcon(generating: boolean) {
    if (generating) {
      this.sendBtnEl.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
        </svg>`;
      this.sendBtnEl.classList.add('generating');
      this.sendBtnEl.disabled = false;
      this.sendBtnEl.title = 'Stop generating';
    } else {
      this.sendBtnEl.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>`;
      this.sendBtnEl.classList.remove('generating');
      this.updateSendButtonState();
      this.sendBtnEl.title = 'Send message';
    }
  }

  private render() {
    this.renderSidebar();
    const currentSession = this.chats.find((c) => c.id === this.activeChatId);
    if (currentSession) {
      this.renderMessages(currentSession);
    }
  }

  private renderSidebar() {
    if (!this.historyListEl) return;
    this.historyListEl.innerHTML = `
      <div class="history-section-title">Conversations</div>
    `;

    this.chats.forEach((chat) => {
      const item = document.createElement('div');
      item.className = `chat-history-item ${chat.id === this.activeChatId ? 'active' : ''}`;
      item.innerHTML = `
        <div class="history-title-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>${this.escapeHtml(chat.title)}</span>
        </div>
        <div class="history-item-actions">
          <button class="history-action-btn delete-chat-btn" title="Delete chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      item.addEventListener('click', () => this.switchChat(chat.id));
      item.querySelector('.delete-chat-btn')?.addEventListener('click', (e) => this.deleteChat(chat.id, e));
      this.historyListEl.appendChild(item);
    });
  }

  private renderMessages(session: ChatSession) {
    if (session.messages.length === 0) {
      this.welcomeHeroEl.style.display = 'flex';
      this.messagesContainerEl.style.display = 'none';
      this.messagesContainerEl.innerHTML = '';
      return;
    }

    this.welcomeHeroEl.style.display = 'none';
    this.messagesContainerEl.style.display = 'flex';
    this.messagesContainerEl.innerHTML = '';

    session.messages.forEach((msg) => {
      const row = document.createElement('div');
      row.className = `message-row ${msg.role}`;
      row.id = `msg-row-${msg.id}`;

      if (msg.role === 'user') {
        row.innerHTML = `
          <div class="message-content-wrap">
            <div class="user-bubble">${this.escapeHtml(msg.content)}</div>
          </div>
          <div class="message-avatar user">You</div>
        `;
      } else {
        const thinkingHtml = msg.thinking
          ? `<div class="thinking-accordion">
              <div class="thinking-summary" onclick="this.nextElementSibling.classList.toggle('show')">
                <span>Thought for ${msg.thinkingTime || 2}s</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="thinking-content">${this.escapeHtml(msg.thinking)}</div>
            </div>`
          : '';

        const chipsHtml =
          msg.suggestions && msg.suggestions.length > 0 && !msg.isStreaming
            ? `<div class="followup-chips">
                ${msg.suggestions
                  .map(
                    (s) =>
                      `<button class="followup-chip" data-prompt="${this.escapeHtml(s)}">${this.escapeHtml(s)}</button>`
                  )
                  .join('')}
              </div>`
            : '';

        row.innerHTML = `
          <div class="message-avatar assistant">
            <img src="/sujoy-profile-square.jpg" alt="Sujoy Moulick" class="assistant-avatar-img" />
          </div>
          <div class="message-content-wrap">
            ${thinkingHtml}
            <div class="assistant-body" id="body-${msg.id}">
              ${this.parseMarkdown(msg.content)}
              ${msg.isStreaming ? '<span class="streaming-cursor"></span>' : ''}
            </div>
            ${chipsHtml}
            ${
              !msg.isStreaming
                ? `<div class="message-actions-bar">
                    <button class="action-icon-btn copy-msg-btn" title="Copy response" data-content="${encodeURIComponent(
                      msg.content
                    )}">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                    <button class="action-icon-btn thumbs-up-btn" title="Good response">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    </button>
                    <button class="action-icon-btn regen-btn" title="Regenerate response">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                      </svg>
                    </button>
                  </div>`
                : ''
            }
          </div>
        `;
      }

      this.messagesContainerEl.appendChild(row);
    });

    this.bindMessageDynamicEvents();
  }

  private updateStreamingMessageDOM(msgId: string, content: string) {
    const bodyEl = document.getElementById(`body-${msgId}`);
    if (bodyEl) {
      bodyEl.innerHTML = `${this.parseMarkdown(content)}<span class="streaming-cursor"></span>`;
      this.bindCodeCopyButtons(bodyEl);
    }
  }

  private bindMessageDynamicEvents() {
    this.messagesContainerEl.querySelectorAll('.followup-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt) this.sendMessage(prompt);
      });
    });

    // Copy Response Button
    this.messagesContainerEl.querySelectorAll('.copy-msg-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = decodeURIComponent(btn.getAttribute('data-content') || '');
        const targetBtn = btn as HTMLElement;
        const originalSvg = targetBtn.innerHTML;

        const handleSuccess = () => {
          targetBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10a37f" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;
          targetBtn.style.color = '#10a37f';
          this.showToast('Response copied to clipboard');
          setTimeout(() => {
            targetBtn.innerHTML = originalSvg;
            targetBtn.style.color = '';
          }, 2000);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(handleSuccess).catch(() => {
            this.fallbackCopyText(text, handleSuccess);
          });
        } else {
          this.fallbackCopyText(text, handleSuccess);
        }
      });
    });

    // Thumbs-up / Like Button
    this.messagesContainerEl.querySelectorAll('.thumbs-up-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetBtn = btn as HTMLElement;
        const isLiked = targetBtn.classList.toggle('active');

        if (isLiked) {
          targetBtn.style.color = '#10a37f';
          targetBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#10a37f" stroke="#10a37f" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          `;
          targetBtn.setAttribute('title', 'Liked');
          this.showToast('Feedback received');
        } else {
          targetBtn.style.color = '';
          targetBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          `;
          targetBtn.setAttribute('title', 'Good response');
          this.showToast('Feedback removed');
        }
      });
    });

    // Regenerate / Reload Button
    this.messagesContainerEl.querySelectorAll('.regen-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isGenerating) return;
        const currentSession = this.chats.find((c) => c.id === this.activeChatId);
        if (!currentSession || currentSession.messages.length === 0) return;

        // Locate the latest user prompt
        let lastUserIndex = -1;
        for (let i = currentSession.messages.length - 1; i >= 0; i--) {
          if (currentSession.messages[i].role === 'user') {
            lastUserIndex = i;
            break;
          }
        }

        if (lastUserIndex !== -1) {
          const userPrompt = currentSession.messages[lastUserIndex].content;
          // Trim assistant messages after this user prompt
          currentSession.messages = currentSession.messages.slice(0, lastUserIndex + 1);
          this.saveState();
          this.render();
          this.generateResponseStream(currentSession, userPrompt);
          this.showToast('Regenerating response...');
        }
      });
    });

    this.messagesContainerEl.querySelectorAll('.preview-resume-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.resumeModalEl?.classList.add('show');
      });
    });

    this.bindCodeCopyButtons(this.messagesContainerEl);
  }

  private fallbackCopyText(text: string, onSuccess: () => void) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) onSuccess();
      else this.showToast('Unable to copy text');
    } catch (err) {
      this.showToast('Unable to copy text');
    }
    document.body.removeChild(textArea);
  }

  private bindCodeCopyButtons(container: HTMLElement) {
    container.querySelectorAll('.copy-code-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const codeWrapper = btn.closest('.code-block-wrapper');
        const codeEl = codeWrapper?.querySelector('pre code');
        if (codeEl) {
          navigator.clipboard.writeText(codeEl.textContent || '');
          btn.innerHTML = `<span>Copied</span>`;
          setTimeout(() => {
            btn.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy code</span>
            `;
          }, 2000);
        }
      });
    });
  }

  private speakText(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      this.showToast('Reading response aloud');
    } else {
      this.showToast('Text-to-speech not supported on this browser');
    }
  }

  private exportCurrentChat() {
    const current = this.chats.find((c) => c.id === this.activeChatId);
    if (!current) return;
    let md = `# ${current.title}\n\n*Exported from Sujoy Moulick Portfolio*\n\n---\n\n`;
    current.messages.forEach((m) => {
      md += `### ${m.role === 'user' ? 'You' : 'SujoyGPT'}:\n\n${m.content}\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${current.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Conversation exported as Markdown');
  }

  private scrollToBottom() {
    this.chatScrollAreaEl.scrollTop = this.chatScrollAreaEl.scrollHeight;
  }

  public showToast(message: string) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    this.toastContainerEl.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  private parseMarkdown(text: string): string {
    if (!text) return '';

    let html = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const language = lang || 'text';
      return `<div class="code-block-wrapper">
        <div class="code-block-header">
          <span>${this.escapeHtml(language)}</span>
          <button class="copy-code-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy code</span>
          </button>
        </div>
        <pre><code>${this.escapeHtml(code.trim())}</code></pre>
      </div>`;
    });

    // Tables
    html = html.replace(/((?:\|[^\n]+\|\r?\n)+)/g, (match) => {
      const lines = match.trim().split('\n');
      if (lines.length < 2) return match;
      const headers = lines[0]
        .split('|')
        .map((h) => h.trim())
        .filter(Boolean);
      const isAlignRow = lines[1].includes('---');
      const dataRows = lines.slice(isAlignRow ? 2 : 1);

      let tableHtml = '<table><thead><tr>';
      headers.forEach((h) => (tableHtml += `<th>${this.formatInline(h)}</th>`));
      tableHtml += '</tr></thead><tbody>';

      dataRows.forEach((row) => {
        const cells = row
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);
        if (cells.length > 0) {
          tableHtml += '<tr>';
          cells.forEach((c) => (tableHtml += `<td>${this.formatInline(c)}</td>`));
          tableHtml += '</tr>';
        }
      });
      tableHtml += '</tbody></table>';
      return `<div class="table-scroll-wrapper">${tableHtml}</div>`;
    });

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^---$/gim, '<hr />');
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');
    html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    html = this.formatInline(html);

    const paragraphs = html.split(/\n\n+/);
    html = paragraphs
      .map((p) => {
        const trimmed = p.trim();
        if (
          !trimmed ||
          trimmed.startsWith('<h') ||
          trimmed.startsWith('<ul') ||
          trimmed.startsWith('<table') ||
          trimmed.startsWith('<div') ||
          trimmed.startsWith('<blockquote') ||
          trimmed.startsWith('<hr')
        ) {
          return trimmed;
        }
        return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
      })
      .join('\n');

    return html;
  }

  private formatInline(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Initialize on DOM ready
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    (window as any).chatApp = new ChatApp();
  });
}

console.log("MailMind Chrome Extension content script loaded.");

// ============================================================
// GET EMAIL CONTENT FROM COMPOSE WINDOW CONTEXT
// ============================================================

function getEmailContent(composeContainer) {
    // Try to find the email/thread content near this compose window
    const selectors = [
        '.a3s.aiL',
        '.h7',
        '.gmail_quote'
    ];

    for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            // Use the most recent email content
            const content = elements[elements.length - 1];
            const text = content.innerText.trim();
            if (text) {
                return text;
            }
        }
    }

    // Fallback: search visible email content
    const allEmailContent = document.querySelectorAll('.a3s');
    if (allEmailContent.length > 0) {
        const latestEmail = allEmailContent[allEmailContent.length - 1];
        return latestEmail.innerText.trim();
    }

    return '';
}


// ============================================================
// FIND ALL ACTIVE COMPOSE / REPLY WINDOWS
// ============================================================

function findComposeWindows() {
    const possibleWindows = [
        '[role="dialog"]',
        '.M9',
        '.aoI',
        '.AD'
    ];

    const windows = [];

    for (const selector of possibleWindows) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const sendButton = element.querySelector(
                '[role="button"][data-tooltip^="Send"]'
            );

            if (sendButton && !windows.includes(element)) {
                windows.push(element);
            }
        });
    }

    return windows;
}


// ============================================================
// FIND SEND BUTTON INSIDE A COMPOSE WINDOW
// ============================================================

function findSendButton(composeWindow) {
    return composeWindow.querySelector(
        '[role="button"][data-tooltip^="Send"]'
    );
}


// ============================================================
// SHOW TEMPORARY MAILMIND TOAST MESSAGE
// ============================================================

function showMailMindToast(container, message, isError = true) {
    // Remove existing toast in container if present
    const existing = container.querySelector('.mailmind-toast');
    if (existing) {
        existing.remove();
    }

    const toast = document.createElement('div');
    toast.className = `mailmind-toast ${isError ? 'mailmind-toast-error' : ''}`;
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.remove();
        }
    }, 3500);
}


// ============================================================
// CREATE MAILMIND POPUP MENU
// ============================================================

function createMailMindPopup(composeWindow, button, wrapper) {
    const popup = document.createElement('div');
    popup.className = 'mailmind-popup';

    popup.innerHTML = `
        <div class="mailmind-header">
            <div class="mailmind-brand">
                <span class="mailmind-brand-icon">✦</span>
                <span>MailMind</span>
            </div>
            <div class="mailmind-tagline">AI-powered email assistant</div>
        </div>
        <div class="mailmind-menu">
            <div class="mailmind-item mailmind-item-active" id="mailmind-action-generate">
                <div class="mailmind-item-icon">↩</div>
                <div class="mailmind-item-content">
                    <div class="mailmind-item-title-row">
                        <span class="mailmind-item-title">Generate Reply</span>
                    </div>
                    <div class="mailmind-item-desc">Generate a contextual email response</div>
                </div>
            </div>
            <div class="mailmind-item mailmind-item-disabled">
                <div class="mailmind-item-icon">✦</div>
                <div class="mailmind-item-content">
                    <div class="mailmind-item-title-row">
                        <span class="mailmind-item-title">Summarize Email</span>
                        <span class="mailmind-badge-soon">Coming soon</span>
                    </div>
                    <div class="mailmind-item-desc">Understand the key points</div>
                </div>
            </div>
            <div class="mailmind-item mailmind-item-disabled">
                <div class="mailmind-item-icon">💬</div>
                <div class="mailmind-item-content">
                    <div class="mailmind-item-title-row">
                        <span class="mailmind-item-title">Smart Replies</span>
                        <span class="mailmind-badge-soon">Coming soon</span>
                    </div>
                    <div class="mailmind-item-desc">Get quick response options</div>
                </div>
            </div>
            <div class="mailmind-item mailmind-item-disabled">
                <div class="mailmind-item-icon">✓</div>
                <div class="mailmind-item-content">
                    <div class="mailmind-item-title-row">
                        <span class="mailmind-item-title">Action Items</span>
                        <span class="mailmind-badge-soon">Coming soon</span>
                    </div>
                    <div class="mailmind-item-desc">Find tasks and follow-ups</div>
                </div>
            </div>
            <div class="mailmind-item mailmind-item-disabled">
                <div class="mailmind-item-icon">◈</div>
                <div class="mailmind-item-content">
                    <div class="mailmind-item-title-row">
                        <span class="mailmind-item-title">Analyze Email</span>
                        <span class="mailmind-badge-soon">Coming soon</span>
                    </div>
                    <div class="mailmind-item-desc">Detect intent & priority</div>
                </div>
            </div>
        </div>
    `;

    // Handle "Generate Reply" Click
    const generateAction = popup.querySelector('#mailmind-action-generate');
    if (generateAction) {
        generateAction.addEventListener('click', (e) => {
            e.stopPropagation();
            popup.remove();
            handleGenerateReply(composeWindow, button, wrapper);
        });
    }

    return popup;
}


// ============================================================
// GENERATE REPLY API CALL & INJECTION
// ============================================================

async function handleGenerateReply(composeWindow, button, wrapper) {
    try {
        // Set button loading state
        button.innerText = '✦ Generating...';
        button.classList.add('mailmind-loading');

        // Extract email content
        const emailContent = getEmailContent(composeWindow);
        console.log('MailMind: Extracting email content...', emailContent);

        if (!emailContent) {
            showMailMindToast(wrapper, 'Unable to find email content to reply to.');
            return;
        }

        // Call Spring Boot backend
        console.log('MailMind: Sending request to Spring Boot backend...');
        const response = await fetch('http://localhost:8080/api/email/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailContent: emailContent,
                tone: 'Professional'
            })
        });

        // Error Handling
        if (!response.ok) {
            console.error('MailMind Backend error status:', response.status);
            if (response.status === 429) {
                showMailMindToast(wrapper, 'AI usage limit reached. Please try again later.');
            } else {
                showMailMindToast(wrapper, 'Unable to generate the reply. Please try again.');
            }
            return;
        }

        // Get generated reply
        const generatedReply = await response.text();
        console.log('MailMind: Reply received successfully');

        if (!generatedReply || !generatedReply.trim()) {
            showMailMindToast(wrapper, 'Unable to generate the reply. Please try again.');
            return;
        }

        // Find compose editable box
        let composeBox = composeWindow.querySelector(
            '[role="textbox"][contenteditable="true"]'
        );

        if (!composeBox) {
            composeBox = composeWindow.querySelector('[contenteditable="true"]');
        }

        if (!composeBox) {
            showMailMindToast(wrapper, 'Gmail reply box not found.');
            return;
        }

        // Insert reply into Gmail composer
        composeBox.focus();
        document.execCommand('insertText', false, generatedReply);
        console.log('MailMind: AI reply inserted into compose box.');

    } catch (error) {
        console.error('MailMind Error:', error);
        showMailMindToast(wrapper, 'Unable to generate the reply. Please try again.');
    } finally {
        // Restore button state
        button.innerText = '✦ MailMind';
        button.classList.remove('mailmind-loading');
    }
}


// ============================================================
// CREATE MAILMIND BUTTON WITH POPUP WRAPPER
// ============================================================

function createMailMindButton(composeWindow) {
    // Relative wrapper container for button and absolute popup
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.className = 'mailmind-wrapper';

    // Button element
    const button = document.createElement('div');
    button.className = 'mailmind-button';
    button.innerText = '✦ MailMind';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'MailMind AI Assistant');
    button.setAttribute('aria-label', 'MailMind AI Assistant');

    // Toggle popup on button click
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        // Check if popup already open in this wrapper
        const existingPopup = wrapper.querySelector('.mailmind-popup');
        if (existingPopup) {
            existingPopup.remove();
            return;
        }

        // Close any other open MailMind popups across the document
        document.querySelectorAll('.mailmind-popup').forEach(p => p.remove());

        // Create and append popup
        const popup = createMailMindPopup(composeWindow, button, wrapper);
        wrapper.appendChild(popup);
    });

    wrapper.appendChild(button);
    return wrapper;
}


// ============================================================
// GLOBAL LISTENER TO CLOSE POPUPS WHEN CLICKING OUTSIDE
// ============================================================

document.addEventListener('click', (e) => {
    if (!e.target.closest('.mailmind-wrapper')) {
        document.querySelectorAll('.mailmind-popup').forEach(p => p.remove());
    }
});


// ============================================================
// INJECT MAILMIND BUTTON INTO COMPOSE WINDOW
// ============================================================

function injectButtonIntoCompose(composeWindow) {
    // Prevent duplicate button in this compose window
    if (composeWindow.querySelector('.mailmind-button')) {
        return;
    }

    const sendButton = findSendButton(composeWindow);
    if (!sendButton) {
        return;
    }

    const mailMindWrapper = createMailMindButton(composeWindow);

    // Insert before Gmail's Send button
    sendButton.parentNode.insertBefore(
        mailMindWrapper,
        sendButton
    );

    console.log('MailMind button injected before Send button.');
}


// ============================================================
// CHECK ALL COMPOSE WINDOWS
// ============================================================

function checkForComposeWindows() {
    const composeWindows = findComposeWindows();
    if (composeWindows.length === 0) {
        return;
    }

    composeWindows.forEach(composeWindow => {
        injectButtonIntoCompose(composeWindow);
    });
}


// ============================================================
// MUTATION OBSERVER
// ============================================================

const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;

    for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            shouldCheck = true;
            break;
        }
    }

    if (shouldCheck) {
        setTimeout(checkForComposeWindows, 300);
    }
});


// ============================================================
// INITIALIZE OBSERVER AND INTERVALS
// ============================================================

observer.observe(document.body, {
    childList: true,
    subtree: true
});

setTimeout(checkForComposeWindows, 1000);
setInterval(checkForComposeWindows, 2000);
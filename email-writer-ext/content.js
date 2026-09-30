console.log("Email Writer Assistant content script loaded.");


// ============================================================
// GET EMAIL CONTENT
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

        const latestEmail =
            allEmailContent[allEmailContent.length - 1];

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

        const elements =
            document.querySelectorAll(selector);

        elements.forEach(element => {

            const sendButton =
                element.querySelector(
                    '[role="button"][data-tooltip^="Send"]'
                );

            if (sendButton) {

                if (!windows.includes(element)) {

                    windows.push(element);
                }
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
// CREATE AI REPLY BUTTON
// ============================================================

function createAIButton() {

    const button =
        document.createElement('div');

    button.className =
        'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';

    button.innerText =
        'AI Reply';

    button.setAttribute(
        'role',
        'button'
    );

    button.setAttribute(
        'data-tooltip',
        'Generate AI Reply'
    );

    button.setAttribute(
        'aria-label',
        'Generate AI Reply'
    );

    button.style.marginRight =
        '8px';

    button.style.cursor =
        'pointer';

    button.style.userSelect =
        'none';

    button.style.whiteSpace =
        'nowrap';

    return button;
}


// ============================================================
// INSERT AI BUTTON INTO ONE COMPOSE WINDOW
// ============================================================

function injectButtonIntoCompose(composeWindow) {

    // --------------------------------------------------------
    // Don't add duplicate button to this compose window
    // --------------------------------------------------------

    if (
        composeWindow.querySelector(
            '.ai-reply-button'
        )
    ) {

        return;
    }


    // --------------------------------------------------------
    // Find Send button
    // --------------------------------------------------------

    const sendButton =
        findSendButton(composeWindow);


    if (!sendButton) {

        return;
    }


    console.log(
        "Found Gmail Send button."
    );


    // --------------------------------------------------------
    // Create AI button
    // --------------------------------------------------------

    const button =
        createAIButton();


    // ========================================================
    // AI BUTTON CLICK
    // ========================================================

    button.addEventListener(
        'click',
        async () => {

            try {

                // ------------------------------------------------
                // Button loading state
                // ------------------------------------------------

                button.innerText =
                    'Generating...';

                button.style.pointerEvents =
                    'none';

                button.style.opacity =
                    '0.7';


                // ------------------------------------------------
                // Get email content
                // ------------------------------------------------

                const emailContent =
                    getEmailContent(
                        composeWindow
                    );


                console.log(
                    'Email content:',
                    emailContent
                );


                if (!emailContent) {

                    throw new Error(
                        'Could not find the email content.'
                    );
                }


                // ====================================================
                // CALL SPRING BOOT BACKEND
                // ====================================================

                console.log(
                    'Sending request to Spring Boot...'
                );


                const response =
                    await fetch(
                        'http://localhost:8080/api/email/generate',
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            body: JSON.stringify({

                                emailContent:
                                    emailContent,

                                tone:
                                    'professional'
                            })
                        }
                    );


                // ------------------------------------------------
                // Check backend response
                // ------------------------------------------------

                if (!response.ok) {

                    const errorText =
                        await response.text();

                    console.error(
                        'Backend error:',
                        response.status,
                        errorText
                    );

                    throw new Error(
                        `API request failed: ${response.status}`
                    );
                }


                // ------------------------------------------------
                // Get generated reply
                // ------------------------------------------------

                const generatedReply =
                    await response.text();


                console.log(
                    'Generated reply:',
                    generatedReply
                );


                if (!generatedReply.trim()) {

                    throw new Error(
                        'Gemini returned an empty reply.'
                    );
                }


                // ====================================================
                // FIND COMPOSE BOX INSIDE THIS WINDOW
                // ====================================================

                let composeBox =
                    composeWindow.querySelector(
                        '[role="textbox"][contenteditable="true"]'
                    );


                // Fallback
                if (!composeBox) {

                    composeBox =
                        composeWindow.querySelector(
                            '[contenteditable="true"]'
                        );
                }


                if (!composeBox) {

                    throw new Error(
                        'Gmail reply box not found.'
                    );
                }


                // ====================================================
                // INSERT REPLY
                // ====================================================

                composeBox.focus();


                // Use execCommand because Gmail's editor
                // reacts properly to this input method
                document.execCommand(
                    'insertText',
                    false,
                    generatedReply
                );


                console.log(
                    'AI reply inserted successfully.'
                );

            }

            catch (error) {

                console.error(
                    'AI Reply error:',
                    error
                );


                alert(
                    'AI Reply failed:\n' +
                    error.message
                );

            }

            finally {

                // ------------------------------------------------
                // Restore button
                // ------------------------------------------------

                button.innerText =
                    'AI Reply';

                button.style.pointerEvents =
                    'auto';

                button.style.opacity =
                    '1';
            }
        }
    );


    // ========================================================
    // INSERT BEFORE SEND BUTTON
    // ========================================================

    sendButton.parentNode.insertBefore(
        button,
        sendButton
    );


    console.log(
        'AI Reply button inserted before Send.'
    );
}


// ============================================================
// CHECK ALL COMPOSE WINDOWS
// ============================================================

function checkForComposeWindows() {

    const composeWindows =
        findComposeWindows();


    if (composeWindows.length === 0) {

        return;
    }


    composeWindows.forEach(
        composeWindow => {

            injectButtonIntoCompose(
                composeWindow
            );

        }
    );
}


// ============================================================
// MUTATION OBSERVER
// ============================================================

const observer =
    new MutationObserver(
        (mutations) => {

            let shouldCheck =
                false;


            for (
                const mutation of mutations
            ) {

                if (
                    mutation.type ===
                    'childList'
                ) {

                    if (
                        mutation.addedNodes.length >
                        0
                    ) {

                        shouldCheck =
                            true;

                        break;
                    }
                }
            }


            if (shouldCheck) {

                // Small delay because Gmail may
                // create the compose window in
                // multiple DOM steps.

                setTimeout(
                    checkForComposeWindows,
                    300
                );
            }
        }
    );


// ============================================================
// START OBSERVER
// ============================================================

observer.observe(
    document.body,
    {
        childList: true,
        subtree: true
    }
);


// ============================================================
// INITIAL CHECK
// ============================================================

setTimeout(
    checkForComposeWindows,
    1000
);


// ============================================================
// PERIODIC SAFETY CHECK
// ============================================================

// Gmail changes its DOM without always producing
// a mutation in the exact place we expect.
//
// This makes sure the button comes back when
// opening another reply/compose window.

setInterval(
    checkForComposeWindows,
    2000
);
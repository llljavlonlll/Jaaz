import React from "react";
import "./ChatComponent.css";
import { FormattedMessage } from "react-intl";

export default function ChatComponent() {
    return (
        <div className="chat">
            <button>
                <FormattedMessage
                    id="chat.button"
                    defaultMessage="Ask for details"
                />
            </button>
        </div>
    );
}

import React, { Component } from "react";

export default class NewPassword extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button>Update password</button>
                </form>
            </div>
        );
    }
}

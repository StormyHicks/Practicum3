package com.team2.trivia.Responses;

import com.team2.trivia.Models.User;

public class AuthorizeUserResponse {
    private boolean _isAuthorized;
    private User _user;

    public AuthorizeUserResponse(boolean isAuthorized, User user) {
        _isAuthorized = isAuthorized;
        _user = user;
    }

    public boolean getIsAuthorized() {
        return _isAuthorized;
    }

    public User getUser() {
        return _user;
    }
}

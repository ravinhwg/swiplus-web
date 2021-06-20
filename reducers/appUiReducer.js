function UiReducer(state, action) {
  switch (action.type) {
    // This action would change the focused menu item
    case "focused-menu-icon": {
      const stateCopy = JSON.parse(JSON.stringify(state));
      // action.payload values
      // home, search, notfs
      stateCopy.focusedMenuItem = action.payload;
      return stateCopy;
    }
    case "focused-mobile-search-tab": {
      const stateCopy = JSON.parse(JSON.stringify(state));
      // Payload types: users | decks
      stateCopy.selectedMobileTab = action.payload;
      return stateCopy;
    }
    case "ask-to-join-banner-visible": {
      const stateCopy = JSON.parse(JSON.stringify(state));
      // Payload types: true | false
      stateCopy.askToJoinBannerVisible = action.payload;
      return stateCopy;
    }
    case "login-user": {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.loggedIn = true;
      stateCopy.user.userId = action.payload.userId;
      stateCopy.user.accessToken = action.payload.token;
      stateCopy.user.expiresIn = action.payload.expiresIn;
      return stateCopy;
    }
    case "logout-user": {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.loggedIn = false;
      stateCopy.user = {};
      return stateCopy;
    }
    case "refresh-token": {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.loggedIn = true;
      stateCopy.user.accessToken = action.payload.token;
      stateCopy.user.expiresIn = action.payload.expiresIn;
      return stateCopy;
    }
    default:
      return undefined;
  }
}
export default UiReducer;

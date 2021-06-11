function UiReducer(state, action) {
  switch (action.type) {
    // This action would change the focused menu item
    case "focused-menu-icon":
      {
        const stateCopy = JSON.parse(JSON.stringify(state));
        // action.payload values
        // home, search, notfs
        stateCopy.focusedMenuItem = action.payload;
        return stateCopy;
      }
      break;
    case "focused-mobile-search-tab":
      {
        const stateCopy = JSON.parse(JSON.stringify(state));
        // Payload types: users | decks
        stateCopy.selectedMobileTab = action.payload;
        return stateCopy;
      }
      break;
  }
}
export default UiReducer;

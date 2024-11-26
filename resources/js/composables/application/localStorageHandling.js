const removeLocalStorageData = () => {
    Object.keys(localStorage).forEach(function(key){
        if (key !== 'user' && key !== 'appThemePanelToggled' && key !== 'mapArray') {
            console.log("removing---", key);
            localStorage.removeItem(key);
        }
    });
}

export {removeLocalStorageData}
